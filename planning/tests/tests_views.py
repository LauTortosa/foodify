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

class getRegisteredPlanningTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.state_registered = State.objects.get(label="Registrado")
        self.product = Product.objects.get(product="Boloñesa")
        
        self.planning1 = Planning.objects.create(date="2024-07-16", load=2, tracebility=120, state=self.state_registered, product=self.product)
        self.planning2 = Planning.objects.create(date="2024-08-16", load=3, tracebility=121, state=self.state_registered, product=self.product)
        
        self.state_other, _ = State.objects.get_or_create(label="Other")
        self.planning3 = Planning.objects.create(date="2024-09-16", load=4, tracebility=122, state=self.state_other, product=self.product)
    
    def test_get_planning_registered(self):
        url = "/planning/api/planning/registered"  

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        response_data = response.json()

        self.assertEqual(len(response_data), 2)

        expected_ids = {self.planning1.id, self.planning2.id}
        response_ids = {planning["id"] for planning in response_data}
        self.assertEqual(expected_ids, response_ids)


