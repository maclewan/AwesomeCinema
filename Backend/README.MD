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

Run migrations with `python manage.py makemigrations cinema && python manage.py migrate`

Run django with `python manage.py runserver`

# Endpoints

## Fill db
* Send request to 
    
  `GET:  /cinema/fill/` endpoint one time

## Auth

* register 
  
    `POST: /auth/register/` 

```json
{
    "username" : "Jan_nowak",
    "password1" : "authauth",
    "password2" : "authauth",
    "email" : "nowak@jan.com"
}
```




* login 
  
    `POST: /auth/login/`

```json
{
    "username" : "Jan_nowak",
    "password" : "authauth",
    "email" : "nowak@jan.com"
}
```


* example hello world 
  
  `GET: /cinema/hello`

Token authentication example. 
Provide header 
```json
"Authorization": "Token <token returned by login>"
```

## Movies and genres

* all movies 
  
  `GET: /cinema/movies/`


* movies by name 
  
  `GET: /cinema/movies/?name={movie_name}`


* Movie by id 
  
  `GET: /cinema/movies/{id}`


* all genres 
  
  `GET: /cinema/genres/`


* movies by genre 
  
  `GET: /cinema/genres/{genre_name}`

## Halls

* all halls 
  
  `GET: /cinema/halls/`
  

* hall by id 
  
  `GET: /cinema/halls/{id}`

## Screenings

* all screenings 
  
  `GET: /cinema/screenings/`

  Screenings can be filtered using following query parameters:

  * `?hall_id={hall_id}`

  * `?movie_id={movie_id}`

  * `?date=2021/05/25` (in format yyyy/MM/dd as in example)
  
  You can use any of parameters.


* screening by id 
  
  `GET: /cinema/screenings/{id}`


* screenings that start after 30 minutes ago 
  
  `GET: /cinema/screenings/now/`


## Tickets

* available tickets for screening 
  
  `GET: /cinema/tickets/{screening_id}`


* set logged user owner of ticket 
  
  `POST: /cinema/tickets/buy/`

```json 
{
    "ticket_id" : 2137,
} 
```
  

* try to change ticket status as used 
  
  `POST: /cinema/tickets/use/`

```json 
{
    "ticket_id" : 2137,
    "hash": "eba24k23ak3ahbv1ibh@lsekjrbl23qr912kjb132q"
} 
```
