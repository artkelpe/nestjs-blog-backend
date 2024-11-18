# Simple API for a blog website

This project contains example of dockerized backend for a blog webpage 

## Completed requirements
* Authentication for admin via password
* Admin can CRUD articles
* Guests can create comments to articles
* Guests can vote up/down for comments

## Additional notes & Context assumptions
* TypeORM's setting _synchronise_ is set to _true_ here in order to simply create needed schema on app start; still 
initial schema and migrations are better for prod environment
* Authentication for admin is implemented via session-based authentication without creating User entity and 
corresponding table in DB; admins password hash is stored in env file
* There are implemented tests for posts.service, posts.controller; I have skipped writing 
tests for Comments and Votes modules just to save time as they are rather obvious and same
* There is only one env file with variables, however there should be separate env files for 
testing and production environments
* I have used REST principles, but not 100% academical pure REST principles. I have tried to build up API and responses
for real project where for example user can suddenly click on '+1' and then try to remove his vote while 
API will return only final rating value instead of whole entity (see votes.service.ts:processVote() and votes.controller.ts for details); 
if it was API for integration/another external service, then it can be architectured in a little different way
* There can be added logger, probably with log rotation
* There can be added custom error objects & texts for results; right now in POSTs/PATCHes there is returned entity, in DELETEs 
operation result is returned

## Project setup
We use docker compose here, so all you need to do is
1. Create your own .env file from template and edit it if you need
```bash
$ cp .env.example .env
```
2. Build containers via docker-compose
```bash
$ docker-compose build
```
3. Run containers via docker-compose
```bash
$ docker-compose up
```
4. App should be running on localhost:3000
5. API schema in Swagger format can be found on /api URL

## Run tests
To run tests execute inside _app_ container command
```bash
$ npm run test
```

