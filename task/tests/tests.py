from django.test import TestCase
from ..models import Task

class TaskModelsTest(TestCase):

    def test_task_creation(self):
        task = Task.objects.create(
            task = "Sacar ternera del congelador",
            completed = False
        )
        
        self.assertEqual(task.task, "Sacar ternera del congelador")
        self.assertEqual(task.completed, False)