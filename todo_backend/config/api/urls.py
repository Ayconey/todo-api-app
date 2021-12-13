from django.urls import path,include
from .views import  TaskList,TaskDetail,UserTaskList,UserDoneTasks,UserList,UserDetail
urlpatterns = [
    path('api-auth/',include('rest_framework.urls')),
    path('tasks/',TaskList.as_view()),
    path('tasks/<int:pk>/',TaskDetail.as_view()),
    path('tasks/user/<int:user_id>/',UserTaskList.as_view()),
    path('tasks/user/<int:user_id>/done/',UserDoneTasks.as_view()),
    path('users/',UserList.as_view()),
    path('users/<int:pk>/',UserDetail.as_view()),

]