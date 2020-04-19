# API Documentation

## Authentication 
### End points
| User Auth |   URL |
|-----------|--------|
| SuperUser | {host}/api/authsuperusers|
| Admin | {host}/api/authschoolsadmins|
| Drivers | {host}/api/authdrivers|
| Parents | {host}/api/authparents|

### Requset JSON Data
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
| Admin | {host}/api/schoolsadmins|
| Drivers | {host}/api/drivers|
| Parents | {host}/api/parents|
| Buses | {host}/api/buses|
| Location | {host}/api/locations|
| Bus Routes | {host}/api/busroutes|
| Daily Attendance | {host}/api/dailyattendances|
