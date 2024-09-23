from django.contrib.auth import authenticate, login, logout
from ninja import NinjaAPI
from pydantic import BaseModel

users_api = NinjaAPI(urls_namespace='users_api')

class LoginSchema(BaseModel):
    username: str
    password: str

class LogoutSchema(BaseModel):
    pass

@users_api.post('login')
def login_user(request, data: LoginSchema):
    user = authenticate(request, username=data.username, password=data.password)
    if user is not None:
        login(request=request, user=user)
        return {"success": True}
    else:
        return {"success": False}

@users_api.post('logout')
def logout_user(request):
    logout(request)
    return {"success": True}
