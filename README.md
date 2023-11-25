# users-management

# how to run the application locally

1.first clone this application
2. install node module
3.devDependencies
command : npm install 
how to naviget this application 
go to the module follow  the route file 

#HTTP Methods:

GET: Retrieve a list of users or details of a specific user.
POST: Create a new user with the provided data.
PUT/PATCH: Update details of an existing user.
DELETE: Delete a user from the system.
Request Examples:

GET:
Retrieve all users: GET http://localhost:5000/api/users
Retrieve a specific user: GET http://localhost:5000/api/users/{userId}
POST:
Create a new user: POST http://localhost:5000/api/users
Request body: JSON object with user details.
PUT/PATCH:
Update user details: PUT http://localhost:5000/api/users/{userId}
Request body: JSON object with updated user details.
DELETE:
Delete a user: DELETE http://localhost:5000/api/users/{userId}


