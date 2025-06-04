from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Project, Proposal
from .serializers import ProjectSerializer, ProposalSerializer

User = get_user_model()


class ProjectPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = ProjectPagination

    def get_queryset(self):
        queryset = Project.objects.filter(status="active", assigned_to=None)
        request = self.request
        params = request.query_params

        # 1. Search filter (across multiple fields)
        search = params.get("search", "").lower()
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
                | Q(request_title__icontains=search)
                | Q(request_description__icontains=search)
                | Q(offer_title__icontains=search)
                | Q(offer_description__icontains=search)
                | Q(skills__icontains=search)
            )

        # 2. Type filter (e.g., project_type=exchange or traditional)
        project_type = params.getlist("project_type")  # can accept multiple values
        if project_type:
            queryset = queryset.filter(project_type__in=project_type)

        # 3. Budget filter (request_value between min and max)
        try:
            budget_min = int(params.get("min_budget", 0))
            budget_max = int(params.get("max_budget", 5000))
            queryset = queryset.filter(
                request_value__gte=budget_min, request_value__lte=budget_max
            )
        except ValueError:
            pass  # Ignore bad budget input

        # 4. Category filter
        category = params.get("category")
        if category:
            queryset = queryset.filter(category=category.capitalize())

        ordering = params.get("ordering")
        if ordering == "low_to_high":
            queryset = queryset.order_by("request_value")
        elif ordering == "high_to_low":
            queryset = queryset.order_by("-request_value")
        else:
            queryset = queryset.order_by("-created_at")

        return queryset


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, status="active")


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Only allow project owners to update or delete.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]


class ProjectUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        project = self.get_object()
        assigned_user_id = self.request.data.get("assign_to")

        update_kwargs = {"owner": project.owner}

        if assigned_user_id:
            assigned_user = get_object_or_404(User, id=assigned_user_id)

            if project.status != "active":
                raise ValidationError("You can only assign a project that is active.")
            if project.assigned_to and project.assigned_to != assigned_user:
                raise ValidationError(
                    "You can not assign a project that is already assigned to another user."
                )
            if project.owner == assigned_user:
                raise ValidationError("You can not assign a project to its owner.")

            update_kwargs["assigned_to"] = assigned_user
            update_kwargs["status"] = "in_progress"

        serializer.save(**update_kwargs)

    def perform_destroy(self, instance):
        if instance.status == "in_progress":
            raise ValidationError("You can not delete a project if it's in progress.")
        instance.delete()


class ProposalListView(generics.ListAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        project_id = self.kwargs.get("project_id")
        return Proposal.objects.filter(project_id=project_id)


class ProposalDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        project_id = self.kwargs.get("project_id")
        return Proposal.objects.filter(project_id=project_id)

    def get_object(self):
        queryset = self.get_queryset()
        proposal_id = self.kwargs.get("proposal_id")

        return generics.get_object_or_404(queryset, id=proposal_id)


class ProposalCreateView(generics.CreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        project_id = self.kwargs.get("project_id")
        project = generics.get_object_or_404(Project, id=project_id)

        if project.owner == user:
            raise ValidationError("You cannot apply to your own project.")

        if Proposal.objects.filter(user=user, project=project).exists():
            raise ValidationError("You have already applied to this project.")

        serializer.save(user=user, project=project, status="active")
