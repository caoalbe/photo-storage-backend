todo:
update media model: add image names, add file extension
update tag model: add case-insensitivity to tag names, track how often each tag is used
seperate code between tag and tag_assignment
rework /fetchmedia into propery GET endpoint with query string instead of body
use presigned url to fetch image from client


test api request: 
curl -X GET http://localhost:4000/s3Url

curl -X POST http://localhost:4000/media -H "Content-Type: application/json" -d '{ "filename": "testfilename", "tags": ["tag1", "tag2"]}'

~~
curl -X GET http://localhost:4000/media -H "Content-Type: application/json" -d '{"tags": ["tag1", "tag3"]}'
~~

curl -X POST http://localhost:4000/fetchmedia -H "Content-Type: application/json" -d '{"tags": ["tag1", "tag3"]}'