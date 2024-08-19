[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15384892&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2


# Cinema Movies

## Models :
### User
```
username : string
email : string, unique (required) emailFormat
password : string (required) length>=6
```
### Ticket
```
MovieId : integer (required)
UserId : integer (required)
movieName : string 
price : integer (required)
title: string
status: string
price: integer
cover:string
```

### Relationship :
```
User to Ticket : One-to-Many

## Endpoints :

List of available endpoints:


- `POST /login`
- `POST /register` 
- `POST /google-login`

And routes below need authentication
  
- `GET /menu` 
- `GET /myticket` 
- `POST /payment` 
- `POST /payment `
- `POST /ticket/:id` 
- `PATCH /payment/status/:id` 
- `PATCH /payment/status/:id`
- `DELETE /myticket/:id
- `POST /chat

&nbsp;

## 1. POST /login
Description:
- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Success",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

## 2. POST /register
Description:
- Add user 

Request:

- body:

```json
{
    "username" : "string",
    "email" : "string",
    "password" : "string",
}
```

_Response (201 - Created)_

```json
{
    "message": "User has been created",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email must be unique"
}
OR
{
  "message": "Must be a valid email format"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Passwords length must be 5 or more"
}
```
&nbsp;
## 3. POST /google-login
Description:
- google login

Request:

- body:

```json
{
    "googleToken" : "string",
}
```

_Response (200 - OK)_

```json
{
    "message": "Login Google Success",
    "access_token" : "string"
}
```

_Response (401 - Unauthorize)_

```json
{
  "message": "Invalid Token"
}
```
&nbsp;
## 4. GET /getMovies
Description:
- Get Movies from tmdb Api

Request:
- headers : 
```json
{
    accept: "application/json",
    Authorization : Bearer + Api_key
}
```

_Response (200 - Ok)_

```json

{
    "dates": {
        "maximum": "2024-03-20",
        "minimum": "2024-02-07"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/tmqwu44lWNOJ8Zh1Ti0j8DsiEI2.jpg",
            "genre_ids": [
                28,
                12,
                16,
                35,
                10751
            ],
            "id": 1011985,
            "original_language": "en",
            "original_title": "The Watchers",
            "overview": "",
            "popularity": 1929.496,
            "poster_path": "/tmqwu44lWNOJ8Zh1Ti0j8DsiEI2.jpg",
            "release_date": "2024-06-12",
            "title": "The Watchers",
            "video": false,
            "vote_average": 6.864,
            "vote_count": 121
        },
        ...
    ],
    "total_pages": 186,
    "total_results": 3716
}
```

&nbsp;
## 5. POST /menu/:id
Description:
- Create ticket

Request:
- params :
```json
{
    "id": "integer (required)"
}
```
- headers : 
```json
{
  "access_token": "string"
}
```

- body : 
```json
{
    "MovieId": "integer",
    "UserId": "integer",
    "movieName": "string",
    "price": "integer",
    "cover":"string",
    "title":"string",
}
```
## 6. GET /my-ticket
Description:
- Get User Tickets

Request:
- params :
```json
{
    "id": "integer (required)"
}
```
- headers : 
```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
 {
    "MovieId": "integer",
    "UserId": "integer",
    "movieName": "string",
    "price": "integer",
    "statustatus" : "string"
 },
 ...
```
_Response (401 - Unauthorize)_

```json
 {
    "message" : "Invalid Token"
 }
```
&nbsp;

## 7. POST /payment
Description:
- Get payment detail

Request:

- 3rd Party Api = Midtrans

_Response (200 - Ok)_

```json
 {
    "message": "Order created",
    "transactionToken": "integer",
    "order_id": "integer",
 }
```

&nbsp;

## 7. POST /payment
Description:
- Get payment detail

Request:

- 3rd Party Api = Midtrans

_Response (200 - Ok)_

```json
 {
    "message": "Order created",
    "transactionToken": "integer",
    "order_id": "integer",
 }
```

&nbsp;

## 13. POST /payment/status/id
Description:
- Changing paymentStatus & Send Email Confirmation

Request:

- params : 
```json
{
    "id" : "integer"
}
```

_Response (200 - Ok)_

```json
 {
    "message": "Pemayaran Berhasil",
 }
```
_Response (400 - Bad Request)_

```json
 {
    "message": "Already Paid",
 }
```

_Response (401 - Unauthorize)_

```json
 {
    "message": "Invalid Email",
 }
```

&nbsp;

## 14. POST /ticket/delete/:id
Description:
- Delete ticket

Request:

- params : 
```json
{
    "id" : "integer"
}
```

_Response (200 - Ok)_

```json
 {
    "message": "Pembayaran Berhasil",
 }
```
_Response (400 - Bad Request)_

```json
 {
    "message": "Already Paid",
 }
 OR
 {
    "message": "Cant delete Payed Ticket",
 }
 
```

_Response (403 - forbidden)_

```json
 {
    "message": "Forbidden",
 }
```
## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Invalid email/password"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
&nbsp;


&nbsp;