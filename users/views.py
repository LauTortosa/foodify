from django.contrib.auth import authenticate, login
from ninja import NinjaAPI
from pydantic import BaseModel

users_api = NinjaAPI(urls_namespace='users_api')

class LoginSchema(BaseModel):
    username: str
    password: str

@users_api.post('login')
def login_user(request, data: LoginSchema):
    user = authenticate(request, username=data.username, password=data.password)
    if user is not None:
        login(request=request, user=user)
        return {"success": True}
    else:
        return {"success": False}