from django.core.exceptions import ObjectDoesNotExist
from ninja import NinjaAPI, Query, Schema, Field
from ninja.errors import HttpError
from typing import List
from pydantic.functional_validators import field_validator
from .models import Product, ProductComponent, Type, Component

product_api = NinjaAPI(urls_namespace='product_api')

class ProductOut(Schema):
    id: int
    product: str
    type_value: str 
    component_value: List[str] = None

class ProductNameOut(Schema):
    id: int
    product: str
    type_value: str

class TypeOut(Schema):
    id: int
    label: str

class ProductFilterOut(Schema):
    type_id: int

class ComponentOut(Schema):
    id: int
    component_value: str

class ProductComponentIn(Schema):
    product_id: int
    component_id: int = Field(...)
    kilograms: float = Field(...)

    @field_validator("component_id")
    def validate_component_id(cls, v):
        try:
            Component.objects.get(id=v)
            raise ValueError("el componente ya existe")
        except ObjectDoesNotExist:
            pass
        return v
    
    @field_validator("kilograms")
    def validate_kilograms(cls, v):
        if v <= 0:
            raise ValueError("los kilos tienen que ser mayor que 0")

@product_api.post("/component-product")
def add_component_product(request, data: ProductComponentIn):
    exists = ProductComponent.objects.filter(
        product_id=data.product_id,
        component_id=data.component_id
    ).exists()

    if exists:
        raise HttpError(409, "Component already exists for this product")
    
    component = ProductComponent.objects.create(
        product_id=data.product_id, 
        component_id=data.component_id, 
        kilograms=data.kilograms
    )
    component.save()
    return {"ok": True}

@product_api.get("/component", response=List[ComponentOut])
def list_component(request):
    components = Component.objects.all()

    return [{"id": component.id, "component_value": component.label} for component in components]

@product_api.get("/list", response=List[ProductNameOut])
def list(request):
    products = Product.objects.all()

    return products

@product_api.get("/types", response=List[TypeOut])
def list_types(request):
    types = Type.objects.all()
    
    return types

# List of products by type
@product_api.get("/products", response=List[ProductOut])
def list_products(request, filters: ProductFilterOut = Query(...)):
    products = Product.objects.filter(type_id=filters.type_id)
    products_list = list(products.values())
    
    products_list = []
    for product in products:
        product_components = ProductComponent.objects.filter(product=product)
        components_value = [f"({pc.component.id}){pc.component.label} = {pc.kilograms} kg" for pc in product_components]
        product.component_value = components_value
        products_list.append(product)
    
    return products_list
    
@product_api.get("/{product_id}", response=ProductOut)
def get_product(request, product_id: int):
    product = Product.objects.get(id=product_id)
    product_components = ProductComponent.objects.filter(product=product)
    components_value = [f"{pc.component.label} = {pc.kilograms} kg" for pc in product_components]
    product.component_value = components_value

    return product

@product_api.delete("/{product_id}/{component_label}")
def delete_product_component(request, product_id: int, component_label: str):
    product = Product.objects.get(id=product_id)
    product_component = ProductComponent.objects.filter(product=product, component__label=component_label).first()

    product_component.delete()
    
    return {"ok": f"Componente '{component_label}' eliminado del producto '{product.product}'"}














