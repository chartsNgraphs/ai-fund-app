## Run with docker

`docker build -t fundraising:app .`

`docker run -p 3000:3000 -p 5432:5432 --expose 5432 --dns=8.8.8.8 --dns=8.8.4.4 --add-host=host.docker.internal:host-gateway  fundraising:app`

