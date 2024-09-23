from rest_framework import serializers
from .models import Project, Bid
from Users.models import CustomUser


class ProjectSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')
    owner_first_name = serializers.ReadOnlyField(source='owner.first_name')
    owner_last_name = serializers.ReadOnlyField(source='owner.last_name')
    owner_title = serializers.ReadOnlyField(source='owner.user_title')
    owner_location = serializers.ReadOnlyField(source='owner.country')


    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

class BidSerializer(serializers.ModelSerializer):
    bidder_first_name = serializers.ReadOnlyField(source='user.first_name')
    bidder_last_name = serializers.ReadOnlyField(source='user.last_name')
    class Meta:
        model = Bid
        fields = '__all__'
        read_only_fields = ['id', 'created_at']