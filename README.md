# Awesome Cinema
## Spis treści
* [Technologie](#technologie)
* [Głowne informacje](#głowne-informacje)
* [Opis Aplikacji](#opis-aplikacji)

	

## Technologie
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/768px-Python.svg.png" alt="drawing" height=80px/>
<img src="https://www.djangoproject.com/m/img/logos/django-logo-negative.png" alt="drawing" height=80px/>
<img src="https://miro.medium.com/proxy/1*N5Iep1wJY1iXgMzpHxzE8w.png" alt="drawing" height=80px/>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" height=80px/> 
<img src="https://tr3.cbsistatic.com/hub/i/r/2016/10/18/831f017c-ee68-4bd6-8a5c-ab31b4d35d6d/resize/1200x/1d727d94737ac8571d079efce9a035af/dockerhero.jpg" alt="drawing" height=80px/>
<img src="https://openwhisk.apache.org/images/deployments/logo-docker-compose-text.svg" alt="drawing" height=80px/> 
<br/>
<img src="https://resources.jetbrains.com/storage/products/pycharm/img/meta/pycharm_logo_300x300.png" alt="drawing" height=80px/> 

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/GitLab_Logo.svg/1108px-GitLab_Logo.svg.png" height=80px/> 



## Głowne informacje
Projekt studencki tworzony w ramach Kursu Aplikacje Mobilne.

Tworzony przez:
* [Maciej Lewandowicz](https://github.com/sasuke5055) (Backend)
* [Piotr Szymański](https://github.com/PitiMonster) (Mobile)


## Opis Aplikacji
Celem projektu było stworzenie aplikacji mobilnej wspierającej system rezerwacji biletów na seanse dla kina. 
Część backendowa została stworzona z wykorzystniem Django, mobilna z wykorzystaniem React native.

Komunikacja aplikacji mobilej z serwerem odbywa się za pośrednictwem architektury REST. 

W trakcie trwania kursu zaimplementowane zostało:
* Tworzenie kont użytkownika i autentykacja za pomocą tokenów
* Wyświetlanie obecnie granych filmów wraz z terminamio seansów, wyszukiwaniem itp
* System sal i biletów - możliwość rezerwacji konkretnych miejsc w salii
* System powiadomień - wiadomości mailowe z biletem w postaci QR kodu po dokonaniu rezerwacji
* Weryfikacja biletów za pomocą czytnika QR i komunikacji z serwerem


### Rejstracja i logowanie:

![](Docs/SS/s1.png)

![](Docs/SS/s2.png)

### Filmy, detale, wyszukiwanie:

![](Docs/SS/s3.png)

![](Docs/SS/s4.png)

![](Docs/SS/s5.png)

### Seanse i rezerwacja biletów:

![](Docs/SS/s6.png)

![](Docs/SS/s7.png)

![](Docs/SS/s8.png)



