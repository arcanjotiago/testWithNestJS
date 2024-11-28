## Description
This repository was created to implement test of integration using NestJS with Jest.

Here we have a user login module with follow description:
-The user has specific endpoint to do login with email and password. After login, the user receives a valid token for 24hrs.
-For each endpint, except the login, the user shoud be send the valid access token in Header.

## Endpoints
### method-description / endpoint  
-GET Status: /status  
-POST Create user: /user/create  
-POST Login: /auth  
-GET All users: /user  
-GET User by id: /user/:id  
-DEL Delete User: /user/:id  
-PUT Update User: /user/:id  

*Except to the route /user/create, add the header "tokenAuthorization" with you token authorization for access the endpoints above.

## Installation
```terminal
$ npm install
$ npm run migration:run This command will create the auth and user tables in your database. Remember to configure the .env file with the necessary parameters.
```

## Running the app or testing
```terminal
# development
$ npm run start:dev

# Testing
$ npm run test
```
