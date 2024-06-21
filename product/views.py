from ninja import NinjaAPI, Schema
from typing import List
from .models import Product, ProductComponent

product_api = NinjaAPI(urls_namespace='product_api')

class ProductOut(Schema):
    id: int
    product: str
    type_value: str
    component_value: List[str]

@product_api.get("/{product_id}", response=ProductOut)
def get_product(request, product_id: int):
    product = Product.objects.get(id=product_id)
    product_components = ProductComponent.objects.filter(product=product)
    components_value = [f"{pc.component.label} = {pc.kilograms} kg" for pc in product_components]
    product.component_value = components_value

    return product

