from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Badge
from .token import CustomAccessToken

from projects.serializers import ProjectSerializer
from badges.serializers import BadgeSerializer


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


class CustomUserSerializer(serializers.ModelSerializer):
    badges = BadgeSerializer(many=True, read_only=True)
    posted_projects = ProjectSerializer(many=True, read_only=True)
    assigned_projects = ProjectSerializer(many=True, read_only=True)

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
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()

        return user


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
