
## Docker – Setting up a Weaviate instance

In this step, we need to run Weaviate in a Docker container.

> Note that the first time you run it, Docker will download ~4.8GB `multi2vec-bind` Weaviate module, which contains the `ImageBind` model.

### Start Weaviate container with `docker-compose.yml`.

To start the Weaviate instance, run the following command, which will use the `docker-compose.yml` file.

```
docker compose up
```

> To stop the container, press `CTRL` + `c` (or the relevant kill command in your terminal).

## Node – Loading data into Weaviate

In this step, we will use the node application to populate Weaviate with data (image, audio and video).

> The image, audio and video files are located in the [web-app/src/assets/](./web-app/src/assets/) folder.

> You only need to run the import process once!

### Node Setup

1. Go to the node folder:

```
cd node-app
```

2. Install packages

```
npm install
```

### Run node app

To import the data, run the following command:

```
npm run start
```

## Angular – Search in a web app

In this step, we will run an Angular app, which allows us to search through our data.

### Angular Setup

1. Go to the web project

```
cd wep-app
```

2. Install packages

```
npm install
```

3. Install Angular CLI:

```
npm install -g @angular/cli
```

### Run the web app

Run the app with the Angular CLI, which will automatically open the app in your browser.

```
ng serve -o
```