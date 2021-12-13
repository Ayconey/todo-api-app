from django.shortcuts import render
from rest_framework import permissions
from rest_framework import generics
from .serializers import TaskSerializer, UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from tasks.permissions import IsAuthor,IsSelf,TaskPermission
from tasks.models import Task
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
User = get_user_model()


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class UserTaskList(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthor, permissions.IsAuthenticated)  # change to admin later

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        selected_user = User.objects.get(pk=int(user_id))
        queryset = Task.objects.filter(author=selected_user,done=False).all()
        return queryset




class UserDoneTasks(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        selected_user = User.objects.get(pk=int(user_id))
        queryset = Task.objects.filter(author=selected_user, done=True).all()
        return queryset


class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsSelf, permissions.IsAuthenticated)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['pk']
        if pk == 999_999_999:
            return self.request.user
        return self.queryset.get(pk=pk)
