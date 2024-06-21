from django.test import TestCase, Client
from ..models import Product, Type, Component, ProductComponent

class GetProductIdTest(TestCase):
    def setUp(self):
        self.client = Client()
        
        self.type = Type.objects.create(value="SALSA", label="Salsa")
        self.product = Product.objects.create(product="Carbonara", type=self.type)
        self.component = Component.objects.create(label="Cebolla")
        self.product_component = ProductComponent.objects.create(product=self.product, component=self.component, kilograms=10.00)


    def test_get_product(self):
        url = f"/product/api/{self.product.id}"
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        
        response_data = response.json()
        
        self.assertEqual(response_data['id'], self.product.id)
        self.assertEqual(response_data['product'], self.product.product)
        self.assertEqual(response_data['type_value'], self.product.type.label)
        self.assertIn("Cebolla = 10.00 kg", response_data['component_value'])
