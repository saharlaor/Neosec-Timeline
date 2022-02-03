# Timeline
Home assignment for job application at Neosec


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