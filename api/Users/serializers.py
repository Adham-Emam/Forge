from rest_framework import serializers
from .models import CustomUser, Notification


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'password',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        """
        Validate that the given username is not already in use.

        Args:
            value (str): The username to validate.

        Returns:
            str: The validated username.

        Raises:
            serializers.ValidationError: If the username is already in use.
        """
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already in use.")
        return value

    def validate_email(self, value):
        """
        Validate that the given email is not already in use.

        Args:
            value (str): The email to validate.

        Returns:
            str: The validated email.

        Raises:
            serializers.ValidationError: If the email is already in use.
        """

        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

    def create(self, validated_data):
        """
        Create a new user with the given validated data.

        Args:
            validated_data (dict): The validated data to create a new user with.

        Returns:
            CustomUser: The newly created user.
        """
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields ='__all__'
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ['id', 'created_at', 'updated_at', 'username','credits','sparks', 'email']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['id', 'created_at']