# Docker
Follow these steps to start the application using Docker

## Dependencies
You will need the following things properly installed on your computer.

* **[Git](https://git-scm.com/)**
* **[Docker CE](https://docs.docker.com/install/)**
* **[docker-compose](https://docs.docker.com/compose/install/)**

## Steps
* `git clone <repository-url>` this repository
* `cd open-event-frontend`

* `cp .env.example .env`
* `docker-compose up -d`

* Visit your app at [http://localhost:4200](http://localhost:4200)

## Installing open-event-server

* For installing open-event-server using docker-compose, follow these [steps](https://github.com/fossasia/open-event-server/blob/development/docs/installation/docker.md)

## Version Information
* These steps were tested successfully on _Pop!OS 20.04(LTS)_ with **Docker version 19.03.12** and **docker-compose version 1.26.2**
