# API Documentation

## Authentication 
### End points
| User Auth |   URL |
|-----------|--------|
| SuperUser | {host}/api/authsuperusers|
| Admin | {host}/api/authschooladmins|
| Drivers | {host}/api/authdrivers|
| Parents | {host}/api/authparents|

### Request JSON Data
```
{
  "EmailID": " ",
   "Password":" "
}
```
Example
```
curl 
    --request POST 
    --url http://{host}/api/authsuperusers/ 
    --header 'cache-control: no-cache' 
    --header 'content-type: application/json' 
    --data '{"EmailID": " ",Password":" "}'
```

## GET Endpoints

| Data |   URL |
|-----------|--------|
| SuperUser | {host}/api/superusers|
| Admin | {host}/api/schooladmins|
| Drivers | {host}/api/drivers|
| Parents | {host}/api/parents|
| Buses | {host}/api/buses|
| Location | {host}/api/locations|
| Bus Routes | {host}/api/busroutes|
| Daily Attendance | {host}/api/dailyattendances|
