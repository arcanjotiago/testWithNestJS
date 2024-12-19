# Description
This repository was created to implement test of integration using NestJS with Jest.

Here we have a user login module that have a endpoint to perform login with email and password. After login, the user receives a valid token for `24hrs`.

# Endpoints
-`GET`  /status       *aplication status*  
-`POST` /user/create  
-`POST` /auth         *login*  
-`GET`  /user         *list all users*  
-`GET`  /user/:id  
-`DEL`  /user/:id  
-`PUT`  /user/:id  

> Except to the route /user/create, add the header `tokenAuthorization` with you token authorization for access the endpoints above.

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
