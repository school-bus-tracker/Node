# API Documentation

## Authentication 
### End points
| User Auth |   URL |
|-----------|--------|
| SuperUser | {host}/api/authsuperusers|
| Admin | {host}/api/authschooladmins|
| Drivers | {host}/api/authdrivers|
| Parents | {host}/api/authparents|

### Access Level for Entities
| Entity | Access Level |
|--------|--------------|
| SuperUser | Everything |
| SchoolAdmin | Everything except superuser | 
| Driver| parent and driver and all other GET request and dailyattendance All requests |
| Parent | parent and driver and all other GET request|

### Request JSON Data
```
{
  "EmailID": " ",
   "Password":" ",
   <Entity-confirmation>
}
```
Example
```
curl 
    --request POST 
    --url http://{host}/api/authsuperusers/ 
    --header 'cache-control: no-cache' 
    --header 'content-type: application/json' 
    --data '{"EmailID": " ",Password":" ", "isSuperUser" : true}'
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
