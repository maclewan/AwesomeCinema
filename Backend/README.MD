<<<<<<< HEAD
Helpful commands:
- sudo docker-compose run web python manage.py createsuperuser
- sudo docker-compose run web python manage.py shell
- sudo docker exec projekt_web_1 python manage.py makemigrations/migrate




run django app with `sudo docker-compose up`
=======
# Setup

Run postgres app with `sudo docker-compose up`

Run django with `python manage.py runserver`

# Endpoints

## Auth

* register `/auth/register/` 

Request body:<br/>
{<br/>
    "username" : "Jan_nowak",<br/>
    "password1" : "authauth",<br/>
    "password2" : "authauth",<br/>
    "email" : "nowak@jan.com"<br/>
}

<br/>

* login `/auth/login/`

Request body:<br/>
{<br/>
    "username" : "Jan_nowak",<br/>
    "password" : "authauth",<br/>
    "email" : "nowak@jan.com"<br/>
}

<br/>

* example hello world `/cinema/hello`

Token authentication example. 
Provide header `"Authorization": "Token <token returned by login>"`

>>>>>>> Auth
