### For running postgres

- build docker image
```
docker build -t database .
```

- run container
```
docker run -p 0.0.0.0:5432:5432/tcp
```

will create `messenger` database