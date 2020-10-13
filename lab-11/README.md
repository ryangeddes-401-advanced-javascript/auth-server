# LAB - 11

# Deployment Test

## Author: Ryan Geddes
- tests report
- front-end

## Setup
**.env requirements**
MONGODB_URI=mongodb://localhost:27017/auth-server

PORT=3000

SECRET=sauce

## Running the app
npm index

Index is the entry point.


## Endpoint:
**/signup**

### Method:
POST

### Accepts 
In body, as raw JSON:
```
{ "username": "INPUT",
  "password": "INPUT"}
```

## Returns Object
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ5YW4yIiwiaWF0IjoxNjAyNjI5MzcyfQ.Y24-4OK3nuOrMCzhky6MqfqBYp3YUdBrURj21Kl1msQ",
  "user": {
    "_id": "5f862efbea36985fa9529d65",
    "username": "INPUT",
    "password": "INPUT HASH",
    "__v": 0
  }
}
```

## Endpoint:
**/signin**

### Method:
POST

### Accepts:
From BASIC AUTH form data:

username: INPUT
password: INPUT


## Returns Object:

```{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJ5YW4yIiwiaWF0IjoxNjAyNjI5MzcyfQ.Y24-4OK3nuOrMCzhky6MqfqBYp3YUdBrURj21Kl1msQ",
  "user": {
    "_id": "5f862efbea36985fa9529d65",
    "username": "INPUT",
    "password": "INPUT HASH",
    "__v": 0
  }
}
```

## Tests

Unit Tests: npm run test
Lint Tests: npm run lint

## UML
### Sign Up Route
![isgnup](./SignupUML.jpg)
### Sign In Route
![signin](./SigninUML.jpg)
