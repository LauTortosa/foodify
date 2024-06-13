from django.test import TestCase
from .models import *

class ProductModelsTests(TestCase):

    def test_ProductComponent_creation(self):
        type = Type.objects.create(
            value="PASTA",
            label="Pasta"
        )
        product = Product.objects.create(
            product="Boloñesa",
            type=type
        )
        component = Component.objects.create(
            value="TOMATE",
            label="Tomate",
        )
        productComponent = ProductComponent.objects.create(
            product=product,
            component=component,
            kilograms=0.100
        )

        self.assertEqual(productComponent.product, product)
        self.assertEqual(productComponent.component, component)
        self.assertEqual(productComponent.kilograms, 0.100)