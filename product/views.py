from ninja import NinjaAPI, Query, Schema
from typing import List
from .models import Product, ProductComponent, Type

product_api = NinjaAPI(urls_namespace='product_api')

class ProductOut(Schema):
    id: int
    product: str
    type_value: str
    component_value: List[str]

class TypeOut(Schema):
    id: int
    label: str

class ProductFilterOut(Schema):
    type_id: int

@product_api.get("/types", response=List[TypeOut])
def list_types(request):
    types = Type.objects.all()
    
    return types

# List of products by type
@product_api.get("/products")
def list_products(request, filters: ProductFilterOut = Query(...)):
    products = Product.objects.all()
    products = products.filter(type_id=filters.type_id)
    product_data = [{"id": product.id, "name": product.product} for product in products]
    
    return product_data

@product_api.get("/{product_id}", response=ProductOut)
def get_product(request, product_id: int):
    product = Product.objects.get(id=product_id)
    product_components = ProductComponent.objects.filter(product=product)
    components_value = [f"{pc.component.label} = {pc.kilograms} kg" for pc in product_components]
    product.component_value = components_value

    return product



