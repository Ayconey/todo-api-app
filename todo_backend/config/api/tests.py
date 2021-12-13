from django.test import TestCase
from tasks.models import Task
from django.contrib.auth import get_user_model
# Create your tests here.
User = get_user_model()

class TaskTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        test_user = User.objects.create_user(username="testuser",password='123abc')
        test_user.save()
        test_task1 = Task.objects.create(author=test_user,title='TestTask1',desc='for testing')
        test_task1.save()

    def testTaskContent(self):
        test_task = Task.objects.get(pk=1)
        author = f"{test_task.author}"
        title = f"{test_task.title}"
        desc = f"{test_task.desc}"

        self.assertEqual(author,"testuser")
        self.assertEqual(title, "TestTask1")
        self.assertEqual(desc, "for testing")