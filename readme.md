
## Setting up Weaviate Container with Docker

### Start Weaviate container with `docker-compose.yml`.

```
docker compose up
```

> To stop the container, run the following:

```
docker compose down
```

## Setting up data in Weaviate with Node

Go to the node folder:

```
cd node-app
```

Install packages

```
npm install
```

Run data import (this needs to run only once)

```
npm run start
```

## Run Web App

Go to the web project

```
cd wep-app
```

Install packages

```
npm install
```

Install Angular CLI:
```
npm install -g @angular/cli
```

Run the app:
```
ng serve -o
```