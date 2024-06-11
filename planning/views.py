from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/items")
def list_items(request):
    return [{"id": 1, "name": "carbonara"}, {"id": 2, "name": "boloñesa"}]
