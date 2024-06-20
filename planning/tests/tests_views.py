from django.test import TestCase, Client
from ..models import Planning, State, Product
from django.utils.dateparse import parse_date

class create_planningTests(TestCase):
    def test_create_planning(self):
        self.client = Client()
        self.product, _ = Product.objects.get_or_create(product="Boloñesa")

        create_data = {
            "date": "2024-07-16",
            "load": 2,
            "tracebility": 120,
            "product": self.product.product
        }

        url = "/planning/api/planning"

        response = self.client.post(url, create_data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"ok": True})
        
        planning = Planning.objects.get()
        self.assertEqual(planning.date, parse_date(create_data['date']))
        self.assertEqual(planning.load, create_data['load'])
        self.assertEqual(planning.tracebility, create_data['tracebility'])
        self.assertEqual(planning.product.product, create_data['product'])


