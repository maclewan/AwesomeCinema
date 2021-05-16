# Setup
## Simply way
* Install requirements.txt
* Hope for the best
## Better way
* Install Anaconda
* Create env using [env](environment.yml) file. 
  Little [help](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file)
    here...
## Fill db
* Send get request to `localhost:8000/cinema/fill/` for one time
# Run

Run postgres app with `sudo docker-compose up`

Run django with `python manage.py runserver`

# Endpoints

## Auth

* register `/auth/register/` 

```json
{
    "username" : "Jan_nowak",
    "password1" : "authauth",
    "password2" : "authauth",
    "email" : "nowak@jan.com"
}
```




* login `/auth/login/`

```json
{
    "username" : "Jan_nowak",
    "password" : "authauth",
    "email" : "nowak@jan.com"
}
```


* example hello world `/cinema/hello`

Token authentication example. 
Provide header 
```json
"Authorization": "Token <token returned by login>"
```

## Movies and genres

* all movies `/cinema/movies/`

* movies by name `/cinema/movies/?name={movie_name}`

* Movie by id `/cinema/movies/{id}`

* all genres `/cinema/genres/`

* movies by genre `/cinema/genres/{genre_name}`

  
