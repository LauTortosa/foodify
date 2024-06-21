from datetime import date, timedelta
from django.test import TestCase, Client
from ..models import Planning, State, Product
from django.utils.dateparse import parse_date

class CreatePlanningTests(TestCase):
    def test_create_planning(self):
        self.client = Client()
        self.product, _ = Product.objects.get_or_create(product="Boloñesa")

        create_data = {
            "date": "2024-07-16",
            "load": 2,
            "tracebility": 120,
            "product": self.product.product
        }

        url = "/planning/api/"

        response = self.client.post(url, create_data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"ok": True})
        
        planning = Planning.objects.get()
        self.assertEqual(planning.date, parse_date(create_data['date']))
        self.assertEqual(planning.load, create_data['load'])
        self.assertEqual(planning.tracebility, create_data['tracebility'])
        self.assertEqual(planning.product.product, create_data['product'])

class GetRegisteredPlanningTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.state_registered = State.objects.get(label="Registrado")
        self.product = Product.objects.get(product="Boloñesa")
        
        self.planning1 = Planning.objects.create(date="2024-07-16", load=2, tracebility=120, state=self.state_registered, product=self.product)
        self.planning2 = Planning.objects.create(date="2024-08-16", load=3, tracebility=121, state=self.state_registered, product=self.product)
        
        self.state_other, _ = State.objects.get_or_create(label="Other")
        self.planning3 = Planning.objects.create(date="2024-09-16", load=4, tracebility=122, state=self.state_other, product=self.product)
    
    def test_get_planning_registered(self):
        url = "/planning/api/registered"  

        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        response_data = response.json()

        self.assertEqual(len(response_data), 2)

        expected_ids = {self.planning1.id, self.planning2.id}
        response_ids = {planning["id"] for planning in response_data}
        self.assertEqual(expected_ids, response_ids)

class UpdatePlanningTest(TestCase):
    def setUp(self):
        self.client = Client()

        State.objects.all().delete()
        Product.objects.all().delete()

        self.state_pending = State.objects.create(label="Pendiente")
        self.state_registered = State.objects.create(label="Registrado")
        self.product_carbonara = Product.objects.create(product="Carbonara")
        self.product_bolonesa = Product.objects.create(product="Boloñesa")

        self.planning = Planning.objects.create(
            date=date.today(),
            load=5,
            tracebility=123,
            state=self.state_pending,
            product=self.product_carbonara
        )

    def test_update_planning(self):
        update_data = {
            "date": str(date.today() + timedelta(days=1)), 
            "load": 10,
            "tracebility": 456,
            "state_value": "Registrado",  
            "product": "Boloñesa"  
        }

        url = f"/planning/api/{self.planning.id}"

        response = self.client.put(url, update_data, content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Verificar los datos actualizados en la respuesta 
        response_data = response.json()
        self.assertEqual(response_data['id'], self.planning.id)
        self.assertEqual(response_data['date'], update_data['date'])
        self.assertEqual(response_data['load'], update_data['load'])
        self.assertEqual(response_data['tracebility'], update_data['tracebility'])
        self.assertEqual(response_data['state_value'], update_data['state_value'])
        self.assertEqual(response_data['product'], update_data['product'])

        # Obtener la planificación actualizada 
        updated_planning = Planning.objects.get(id=self.planning.id)

        # Verificar los datos actualizados en la base de datos
        self.assertEqual(updated_planning.date, date.today() + timedelta(days=1))
        self.assertEqual(updated_planning.load, 10)
        self.assertEqual(updated_planning.tracebility, 456)
        self.assertEqual(updated_planning.state.label, "Registrado")
        self.assertEqual(updated_planning.product.product, "Boloñesa")

class DeletePlanningTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.state = State.objects.get(label="Pendiente")
        self.product = Product.objects.get(product="Boloñesa")

        self.planning = Planning.objects.create(date="2024-07-16", load=2, tracebility=120, state=self.state, product=self.product)

    def test_delete_planning(self):
        self.assertTrue(Planning.objects.filter(id=self.planning.id).exists())

        url = f"/planning/api/{self.planning.id}"

        response = self.client.delete(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"ok": True})

        self.assertFalse(Planning.objects.filter(id=self.planning.id).exists())