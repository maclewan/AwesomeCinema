# Setup
## Simply way
* Install requirements.txt
* Hope for the best
## Better way
* Install Anaconda
* Create env using [env](environment.yml) file. 
  Little [help](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file)
    here...

# Run

Run postgres app with `sudo docker-compose up`

Run django with `python manage.py runserver`

# Endpoints

## Fill db
* Send `get` request to `/cinema/fill/` endpoint one time

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

## Halls

* all halls `/cinema/halls/`
  

* hall by id `/cinema/halls/{id}`

## Screenings

* all screenings `/cinema/screenings/`

  Screenings can be filtered using following query parameters:

  * `?hall_id={hall_id}`

  * `?movie_id={movie_id}`

  * `?date=2021/05/25` (in format yyyy/MM/dd as in example)
  
  You can use any of parameters.


* screening by id `/cinema/screenings/{id}`


* screenings that start after 30 minutes ago`/cinema/screenings/now/`
