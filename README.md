# API Documentation

## Authentication 
### End points
| User Auth |   URL |
|-----------|--------|
| SuperUser | {root}/api/authsuperusers|
| Admin | {root}/api/authschoolsadmins|
| Drivers | {root}/api/authdrivers|
| Parents | {root}/api/authparents|

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
    --url http://{root}/api/authsuperusers/ 
    --header 'cache-control: no-cache' 
    --header 'content-type: application/json' 
    --data '{"EmailID": " ",Password":" "}'
```

## GET Endpoints

| Data |   URL |
|-----------|--------|
| SuperUser | {root}/api/superusers|
| Admin | {root}/api/schoolsadmins|
| Drivers | {root}/api/drivers|
| Parents | {root}/api/parents|
| Buses | {root}/api/buses|
| Location | {root}/api/locations|
| Bus Routes | {root}/api/busroutes|
| Daily Attendance | {root}/api/dailyattendances|
