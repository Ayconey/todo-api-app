from django.shortcuts import render
from rest_framework import permissions,generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer, UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from tasks.permissions import IsAuthor,IsSelf,TaskPermission
from tasks.models import Task
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
User = get_user_model()

#everything about tasks
class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


#for the sake of learning
@csrf_exempt
@api_view(["PUT",])
def taskUpdate(request,pk):
    try:
        selected_task = Task.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = TaskSerializer(selected_task,data=request.data)
        resp = {}
        if serializer.is_valid():
            serializer.save()
            resp['success'] = "Yes"
            return Response(data=resp)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["POST",])
def taskCreate(request):
    this_user = User.objects.get(pk=request.data['author'])
    task_temp = Task(author=this_user,title="a",desc="a")

    if request.method == "POST":
        serializer = TaskSerializer(task_temp,data=request.data)
        resp = {}
        if serializer.is_valid():
            serializer.save()
            resp['success'] = "Yes"
            return Response(data=resp,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



#everything about user
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
