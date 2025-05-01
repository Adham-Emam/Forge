from rest_framework import generics, permissions, filters
from django_filters.rest_framework import (
    DjangoFilterBackend,
    FilterSet,
    CharFilter,
    NumberFilter,
)

from .models import Project, Proposal
from .serializers import ProjectSerializer, ProposalSerializer


class ProjectFilter(FilterSet):
    project_type = CharFilter(field_name="project_type", lookup_expr="iexact")
    min_offering_value = NumberFilter(field_name="offering_value", lookup_expr="gte")
    max_offering_value = NumberFilter(field_name="offering_value", lookup_expr="lte")
    min_estimated_duration = NumberFilter(
        field_name="estimated_duration", lookup_expr="gte"
    )
    max_estimated_duration = NumberFilter(
        field_name="estimated_duration", lookup_expr="lte"
    )

    class Meta:
        model = Project
        fields = [
            "project_type",
            "min_offering_value",
            "max_offering_value",
            "min_estimated_duration",
            "max_estimated_duration",
        ]


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ProjectFilter
    search_fields = ["title", "offer_title", "offer_description", "skills__name"]

    def get_queryset(self):
        queryset = Project.objects.filter(status="active", assigned_to__isnull=True)

        return queryset


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        owner_id = self.request.data.get("owner")
        serializer.save(owner_id=owner_id, status="active")


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Only allow project owners to update or delete.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(owner=self.get_object().owner)


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

        return generics._get_object_or_404(queryset, id=proposal_id)


class ProposalCreateView(generics.CreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user_id = self.request.data.get("user")
        project_id = self.kwargs.get("project_id")

        # Save the proposal with the project_id and user_id
        serializer.save(user_id=user_id, project_id=project_id, status="active")
