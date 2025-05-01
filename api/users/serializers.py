from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Skill, UserEducation, UserWorkExperience
from .token import CustomAccessToken


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Generate custom access token with extra claims
        access = CustomAccessToken.for_user(self.user)
        refresh = self.get_token(self.user)  # this is still default refresh token

        data["refresh"] = str(refresh)
        data["access"] = str(access)
        data["user"] = {
            "id": self.user.id,
            "email": self.user.email,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
        }

        return data


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name"]


class UserEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEducation
        fields = [
            "id",
            "institution",
            "degree",
            "field_of_study",
            "start_year",
            "end_year",
            "description",
        ]


class UserWorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorkExperience
        fields = [
            "id",
            "company",
            "position",
            "start_date",
            "end_date",
            "currently_working",
            "description",
        ]


class CustomUserSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, required=False)
    educations = UserEducationSerializer(many=True, required=False)
    experiences = UserWorkExperienceSerializer(many=True, required=False)

    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
        }
        read_only_fields = ["id", "email"]

    def create(self, validated_data):
        # Handle nested skills creation
        skills_data = validated_data.pop("skills", [])
        educations_data = validated_data.pop("educations", [])
        experiences_data = validated_data.pop("experiences", [])

        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()

        # Add skills
        for skill_data in skills_data:
            skill, _ = Skill.objects.get_or_create(name=skill_data["name"])
            user.skills.add(skill)

        # Create educations
        for education_data in educations_data:
            UserEducation.objects.create(user=user, **education_data)

        # Create experiences
        for experience_data in experiences_data:
            UserWorkExperience.objects.create(user=user, **experience_data)

        return user

    def update(self, instance, validated_data):
        # Handle skills update
        if "skills" in validated_data:
            skills_data = validated_data.pop("skills")
            instance.skills.clear()
            for skill_data in skills_data:
                skill, _ = Skill.objects.get_or_create(name=skill_data["name"])
                instance.skills.add(skill)

        # Update regular fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if "password" in validated_data:
            instance.set_password(validated_data["password"])

        instance.save()
        return instance


class CustomUserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "first_name",
            "last_name",
            "password",
            "password2",
        ]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = CustomUser.objects.create_user(**validated_data)
        return user
