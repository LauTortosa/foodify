from datetime import date
from django.test import TestCase
from ..models import Planning, State, Product

class PlanningModelsTests(TestCase):

    def test_planning_creation(self):
        state = State.objects.create(
            value="PENDIENTE",
            label="Pendiente"
        )
        product = Product.objects.create(
            product="Boloñesa",
        )
        planning = Planning.objects.create(
            date=date(2024, 6, 15),
            load=10,
            tracebility=250,
            state=state,
            product=product
        )

        self.assertEqual(planning.date, date(2024, 6, 15))
        self.assertEqual(planning.load, 10)
        self.assertEqual(planning.tracebility, 250)
        self.assertEqual(planning.state, state)
        self.assertEqual(planning.product, product)
