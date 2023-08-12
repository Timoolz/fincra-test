# fincra-test

This project is designed to be a simple customer support ticketing system.

---

## Requirements

For development, you will only need Node.js and a node global package manager, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find
  git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and
  the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.17.0

    $ npm --version
    8.15.0

If you need to update `npm`, you can make it using `npm`!After running the following command, just open again the
command line.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/Timoolz/fincra-test.git
    $ cd fincra-test
    $ yarn 

## Configure app

Open `fincra-test/.env` then edit it with your settings. You will need:

- MONGO_URI;
  Mongo db connection string e.g mongodb://0.0.0.0:27017/fincra_support

- PORT;
  Port for app to run on e.g 2020(any port of your choice)

- JWT_KEY;
  Key for signing Jwt access tokens e.g fincra(any string of your choice)

## Running the project

Run the following commands

    $ yarn build
    $ yarn start:dev


## Running the Unit Tests

Run the following commands

    $ yarn test

## REST API DOCUMENTATION

Once the application is up and running, you can call the endpoints.
The REST API to fincra support is described below.

### Health

#### Request

`GET /health/`

    curl --location 'localhost:1234/health/' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    {
      "status": "OK"
    }

### Login

#### Request

`POST /auth/login/`

    curl --location 'localhost:1234/auth/login' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --data-raw \
      '{
        "email": "agent1@fincra.com",
        "password": "password"
      }'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    {
      "id": "64d43f324c903f28bba47d99",
      "name": "Agent1",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQzZjMyNGM5MDNmMjhiYmE0N2Q5OSIsImVtYWlsIjoiYWdlbnQxQGZpbmNyYS5jb20iLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE2OTE4NzQzMjB9.MjswB9bWw5wdmuEX1SDWhLXxYvJJdLuK-mAWWX_jFOQ",
      "email": "agent1@fincra.com",
      "userType": "AGENT"
    }

### Signup

#### Request

`POST /auth/signup/`

    curl --location 'localhost:1234/auth/signup' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --data-raw ' \
    {
      "name": "olamide",
      "email": "olamide@test.com",
      "password": "password"
    }'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    {
      "id": "64d7f4afab12d08c30e28f05",
      "name": "olamide",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDdmNGFmYWIxMmQwOGMzMGUyOGYwNSIsImVtYWlsIjoib2xhbWlkZUB0ZXN0LmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjkxODc0NDc5fQ.ZceTTMJtkWvIB4XSJsH9jyDMmAnCUuhcrjjBEZiyfXQ",
      "email": "olamide@test.com",
      "userType": "USER"
    }

### Create Ticket

This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- USER
#### Request



`POST /ticket/`

    curl --location 'localhost:1234/ticket' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDM1MWI0OTM2OTcxZWNiMDBjNjYwZSIsImVtYWlsIjoibGFsZXllb2xhMUBncnIubGEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MTYzMTUxMX0.EEaeYHDn7YgoI6geXYBNxApakGyNpaHWT8sUyQrmXqw' \
    --data ' \
    {
      "title": "titleeoyaa",
      "description": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
    }'

#### Response

    HTTP Status: 201 Created
    Content-Type: application/json
    

    Response Body
    {
      "title": "titleeoyaa",
      "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
      "status": "CREATED",
      "startedDate": "2023-08-10T13:14:26.642Z",
      "creatorId": "64d351b4936971ecb00c660e",
      "_id": "64d4e2ef3dbdff12e8c801e0",
      "comments": [],
      "createdAt": "2023-08-10T13:15:27.904Z",
      "updatedAt": "2023-08-10T13:15:27.904Z",
      "__v": 0
    }

### Get All User Tickets
This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- USER

#### Request

`GET /ticket/`

    curl --location 'localhost:1234/ticket' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDM1MWI0OTM2OTcxZWNiMDBjNjYwZSIsImVtYWlsIjoibGFsZXllb2xhMUBncnIubGEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MTYzMTUxMX0.EEaeYHDn7YgoI6geXYBNxApakGyNpaHWT8sUyQrmXqw'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    [
      {
          "_id": "64d4e2df3dbdff12e8c801da",
          "title": "titlee",
          "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
          "status": "CREATED",
          "startedDate": "2023-08-10T13:14:26.642Z",
          "creatorId": "64d351b4936971ecb00c660e",
          "comments": [],
          "createdAt": "2023-08-10T13:15:11.926Z",
          "updatedAt": "2023-08-10T13:15:11.926Z",
          "__v": 0
      },
      {
          "_id": "64d4e2e63dbdff12e8c801dc",
          "title": "titlee",
          "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
          "status": "CREATED",
          "startedDate": "2023-08-10T13:14:26.642Z",
          "creatorId": "64d351b4936971ecb00c660e",
          "comments": [],
          "createdAt": "2023-08-10T13:15:18.672Z",
          "updatedAt": "2023-08-10T13:15:18.672Z",
          "__v": 0
      }
    ]

### Comment on a ticket

This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- USER
- ADMIN
- AGENT
#### Request



`POST /ticket/comment/`

    curl --location 'localhost:1234/ticket/comment' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDM1MWI0OTM2OTcxZWNiMDBjNjYwZSIsImVtYWlsIjoibGFsZXllb2xhMUBncnIubGEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MTYzMTUxMX0.EEaeYHDn7YgoI6geXYBNxApakGyNpaHWT8sUyQrmXqw' \
    --data ' \
    {
      "ticketId": "64d4edad3a5f9360f83f7b20",
      "content": "titttutuututututpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
    }'

#### Response

    HTTP Status: 200 Ok
    Content-Type: application/json
    

    Response Body
    {
      "_id": "64d4edad3a5f9360f83f7b20",
      "title": "settteettete",
      "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
      "status": "CREATED",
      "creatorId": "64d351b4936971ecb00c660e",
      "comments": [
          {
              "content": "titttutuututututpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
              "userId": "64d351b4936971ecb00c660e",
              "_id": "64d4ee0d3a5f9360f83f7b25"
          }
      ],
      "createdAt": "2023-08-10T14:01:17.752Z",
      "updatedAt": "2023-08-10T14:02:53.069Z",
      "__v": 0
    }

### Get a Ticket by id
This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- USER
- ADMIN
- AGENT
#### Request

`GET /ticket/id/:id`

    curl --location 'localhost:1234/ticket/id/64d4e2df3dbdff12e8c801da' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDM1MWI0OTM2OTcxZWNiMDBjNjYwZSIsImVtYWlsIjoibGFsZXllb2xhMUBncnIubGEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MTYzMTUxMX0.EEaeYHDn7YgoI6geXYBNxApakGyNpaHWT8sUyQrmXqw'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    {
      "_id": "64d4e2df3dbdff12e8c801da",
      "title": "titlee",
      "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
      "status": "CREATED",
      "startedDate": "2023-08-10T13:14:26.642Z",
      "creatorId": "64d351b4936971ecb00c660e",
      "comments": [
          {
              "content": "oooososoosososs",
              "userId": "64d43f324c903f28bba47d99",
              "_id": "64d4f000efe8445076b5e303"
          },
          {
              "content": "oooososoosososs",
              "userId": "64d43f324c903f28bba47d99",
              "_id": "64d4f002efe8445076b5e307"
          },
          {
              "content": "oooososoosososs",
              "userId": "64d43f324c903f28bba47d99",
              "_id": "64d4f006efe8445076b5e30d"
          },
          {
              "content": "oooososoosososs",
              "userId": "64d351b4936971ecb00c660e",
              "_id": "64d4f00cefe8445076b5e315"
          }
      ],
      "createdAt": "2023-08-10T13:15:11.926Z",
      "updatedAt": "2023-08-10T14:11:24.240Z",
      "__v": 0
    }


### Process a ticket
This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.

- AGENT
#### Request

`POST /ticket/process/:id`
    
    curl --location --request POST 'localhost:1234/ticket/process/64d4e2e63dbdff12e8c801dc' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQzZjMyNGM5MDNmMjhiYmE0N2Q5OSIsImVtYWlsIjoiYWdlbnQxQGZpbmNyYS5jb20iLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE2OTE2NzY2MTl9.HV152vv7pyk4SG8pMzRg9hO7fpnRVoRuvUo10soeBY0'
#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    {
      "successful": true,
      "message": "Processing ticket"
    }

### Close a ticket
This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- ADMIN
- AGENT
#### Request

`GET /ticket/close/:id`

    curl --location --request POST 'localhost:1234/ticket/close/64d4e2e63dbdff12e8c801dc' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQzZjMyNGM5MDNmMjhiYmE0N2Q5OSIsImVtYWlsIjoiYWdlbnQxQGZpbmNyYS5jb20iLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE2OTE2NzY2MTl9.HV152vv7pyk4SG8pMzRg9hO7fpnRVoRuvUo10soeBY0'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    {
      "successful": true,
      "message": "Processing ticket"
    }


### Get All Tickets
This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- ADMIN
- AGENT
#### Request

`GET /ticket/all/`

    curl --location 'localhost:1234/ticket/all' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQzZjMyNGM5MDNmMjhiYmE0N2Q5OSIsImVtYWlsIjoiYWdlbnQxQGZpbmNyYS5jb20iLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE2OTE2NzY2MTl9.HV152vv7pyk4SG8pMzRg9hO7fpnRVoRuvUo10soeBY0'

#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    [
      {
          "_id": "64d4e2df3dbdff12e8c801da",
          "title": "titlee",
          "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
          "status": "CREATED",
          "startedDate": "2023-08-10T13:14:26.642Z",
          "creatorId": "64d351b4936971ecb00c660e",
          "comments": [
              {
                  "content": "oooososoosososs",
                  "userId": "64d43f324c903f28bba47d99",
                  "_id": "64d4f000efe8445076b5e303"
              }
          ],
          "createdAt": "2023-08-10T13:15:11.926Z",
          "updatedAt": "2023-08-10T14:11:24.240Z",
          "__v": 0
      },
      {
          "_id": "64d4e2e63dbdff12e8c801dc",
          "title": "titlee",
          "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
          "status": "COMPLETED",
          "startedDate": "2023-08-10T16:04:47.773Z",
          "creatorId": "64d351b4936971ecb00c660e",
          "comments": [],
          "createdAt": "2023-08-10T13:15:18.672Z",
          "updatedAt": "2023-08-10T18:00:33.517Z",
          "__v": 0,
          "agentId": "64d43f324c903f28bba47d99",
          "completedDate": "2023-08-10T18:00:33.516Z"
      }
    ]



### Get Recently closed Tickets
This endpoint is an authenticated endpoint. \
It requires an access token with a role with the following user types.
- ADMIN
- AGENT
#### Request

`GET /ticket/recently-closed/`

    curl --location 'localhost:1234/ticket/recently-closed' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQzZjMyNGM5MDNmMjhiYmE0N2Q5OSIsImVtYWlsIjoiYWdlbnQxQGZpbmNyYS5jb20iLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE2OTE2NzY2MTl9.HV152vv7pyk4SG8pMzRg9hO7fpnRVoRuvUo10soeBY0'
#### Response

    HTTP Status: 200 OK
    Content-Type: application/json
    

    Response Body
    [
      {
          "_id": "64d4e2e63dbdff12e8c801dc",
          "title": "titlee",
          "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
          "status": "COMPLETED",
          "startedDate": "2023-08-10T16:04:47.773Z",
          "creatorId": "64d351b4936971ecb00c660e",
          "comments": [],
          "createdAt": "2023-08-10T13:15:18.672Z",
          "updatedAt": "2023-08-10T18:00:33.517Z",
          "__v": 0,
          "agentId": "64d43f324c903f28bba47d99",
          "completedDate": "2023-08-10T18:00:33.516Z"
      },
      {
          "_id": "64d4e2e73dbdff12e8c801de",
          "title": "titlee",
          "decription": "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword",
          "status": "COMPLETED",
          "startedDate": "2023-08-10T16:05:54.267Z",
          "creatorId": "64d351b4936971ecb00c660e",
          "comments": [],
          "createdAt": "2023-08-10T13:15:19.340Z",
          "updatedAt": "2023-08-10T16:06:01.849Z",
          "__v": 0,
          "agentId": "64d43f324c903f28bba47d99",
          "completedDate": "2023-08-08T16:06:01.848Z"
      }
    ]

### Status Codes

Fincra support returns the following status codes in its API:

| Status Code | Description             |
|:------------|:------------------------|
| 200         | `OK`                    |
| 201         | `CREATED`               |
| 400         | `BAD REQUEST`           |
| 401         | `UNAUTHORIZED`          |
| 403         | `FORBIDDEN`             |
| 404         | `NOT FOUND`             |
| 409         | `CONFLICT`              |
| 500         | `INTERNAL SERVER ERROR` |


