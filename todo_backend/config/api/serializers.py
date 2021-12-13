from tasks.models import Task
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','author','title','desc','created','done')
        model = Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','username')
        model = User