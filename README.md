# Description
This repository was created to implement test of integration using NestJS with Jest.

Here we have a user and auth module. The auth module has a endpoint that allow user to perform login with email and password. After login, the user receives a valid token for `24hrs`.

> Except to the route /user/create, add the header `tokenAuthorization` with you token authorization for access the endpoints bellow.

# Endpoints
-`GET`  /status   
-`POST` /auth  
-`GET`  /user   
-`GET`  /user/:id  
-`POST` /user/create  
-`PUT`  /user/:id  
-`DEL`  /user/:id  

## Requisition examples
`POST` /auth
```
curl --location 'http://localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user01@example.com",
    "password": "0000000"
}'
```

`POST` /user/create  
```
curl --location 'http://localhost:3000/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "user01",
    "email": "user01@example.com",
    "password": "0000000",
    "role":"administrator"
}'
```

`PUT` /user/:id 
```
curl --location --request PUT 'http://localhost:3000/user/null' \
--header 'tokenAuthorization: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "user01",
    "email": "user01@example.com",
    "password": "0000000",
    "role":"administrator"
}'
```

# Installation
> Before your install modules and dependencies and run the migration, you must setup the `.env` file and `.env.staging` file. Those files will setup your connection with the database. For our tests you must have a database installed and configured.

```
$ npm install
$ npm run migration:run
```
*The command migration:run will create the auth and user tables in your database. Remember to configure the .env file with the necessary parameters.* 

# Running the app or testing
## Development
```
$ npm run start:dev
```

## Testing
```
$ npm run test:watch
```
