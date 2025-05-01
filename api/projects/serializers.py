from rest_framework import serializers

from .models import Project, Proposal
from users.serializers import CustomUserSerializer, SkillSerializer


class ProjectSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer(read_only=True)
    assigned_to = CustomUserSerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"

    def validate(self, data):
        if data["category"] == "exchange":
            if not data.get("request_title"):
                raise serializers.ValidationError(
                    "Exchange projects must include a request title."
                )
            elif not data.get("request_decription"):
                raise serializers.ValidationError(
                    "Exchange projects must include a request description."
                )
            elif not data.get("request_value"):
                raise serializers.ValidationError(
                    "Exchange projects must include a request value."
                )
        return data


class ProposalSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Proposal
        fields = "__all__"
