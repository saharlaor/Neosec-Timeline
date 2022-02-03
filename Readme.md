# Timeline
Home assignment for job application at Neosec

[Heroku public instance](https://sahar-neosec-timeline.herokuapp.com/)


## Client
React app client displaying the IDs of users
Upon clicking on an ID the app displays a timeline of the corresponding user activity

## API Endpoints

Request          |         |    |Response                      |        |
-----------------|---------|----|------------------------------|--------|
Route            |Method   |Body|Success                       |Errors  |
-----------------|---------|----|------------------------------|--------|
`/api/users`     |`GET`    |{}  |[id0, id1, id2, ...]          |500, 404|
`/api/users/:id` |`GET`    |{}  |{ id, timestamp, method, uri }|500, 404|
`/api/events/:id`|`DELETE` |{}  |{ id }                        |500, 404|


## Build process

Run the full-build npm script, Then the server script

`npm run full-build`

`npm run server`

This will start the server on port 8000 on your local machine

In order to run this repo on port 3000, add a .env file with `PORT=3000`

## Other Deployment Options

`npm run dev` - Run server and client separately in dev configuration

`npm run server` - Run only the server, will serve on / the last build client
