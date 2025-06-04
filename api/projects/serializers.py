from rest_framework import serializers

from .models import Project, Proposal

# from users.serializers import CustomUserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_owner_name(self, obj):
        return f"{obj.owner.first_name} {obj.owner.last_name}"

    def validate(self, data):
        project_type = data.get("project_type")

        if project_type != "exchange":
            return data

        for field in ["request_title", "request_description", "request_value"]:
            value = data.get(field)
            if value is None and self.instance:
                value = getattr(self.instance, field, None)

            if value is None or value == "":
                raise serializers.ValidationError(
                    {
                        field: f"Exchange projects must include {field.replace('_', ' ')}."
                    }
                )

        return data


class ProposalSerializer(serializers.ModelSerializer):
    # user = CustomUserSerializer(read_only=True)
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Proposal
        fields = "__all__"
