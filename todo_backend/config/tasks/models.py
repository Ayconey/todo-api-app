from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()
class Task(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    desc = models.TextField(max_length=200)
    created = models.DateTimeField(auto_now=True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title