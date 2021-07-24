# Messenger

A one-to-one realtime chat app.

## Initial Setup

You can start a postgres server using the provided docker image.

- Build the image

```bash
 sudo docker build -t  messenger-db .
 ```

 - Run the container
 ```
sudo docker run -p 0.0.0.0:5432:5432/tcp messenger-db
```

A database called `messenger` will be automatically created with your pg server.

## Run the project.

### Install dependencies

In the root folder 
```
npm install
```

In the client folder
```
npm install
```

and in the server folder
```
npm install
```

### Seed the database

With postgres running, in the root folder

```
npm run seed
```

### Start the application

In the root folder
```
npm run dev
```



