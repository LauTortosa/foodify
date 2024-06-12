from .models import Product
from .constants import * 

def populate_options(apps, schema):
    Type = apps.get_model("product", "Type")
    Component = apps.get_model("product", "Component")
    Product = apps.get_model("product", "Product")

    for option in TYPE_CHOICES:
        obj, _ = Type.objects.get_or_create(value = option[0])
        obj.label = option[1]
        obj.save()

    for option in COMPONENT_CHOICES:
        obj, _ = Component.objects.get_or_create(value = option[0])
        obj.label = option[1]
        obj.save()

    for option in PRODUCT_CHOICES:
        obj, _ = Product.objects.get_or_create(product = option[0])
        obj.product = option[1]
        obj.save()


