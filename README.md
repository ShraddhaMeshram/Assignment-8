# Assignment-8
Node, Mongo, and Express (No need for UI; you can run the APIs on Postman). Use bcrypt for password security.

Create a user who takes three parameters full name, email, and password. Enforce a strong password rule and add validation for email and full name.
API Endpoint:

POST: /user/create – User creation with a meaningful message if the user email or password is invalid)

Update the user details (full name and password only). Email should not get updated at any point. A proper error message should be thrown if a user is not in the database.
API Endpoint:

PUT: /user/edit – Add validations for full name and password

Delete the user by taking the user's email as input
API Endpoint:

DELETE: /user/delete

Get all the user's full name, email addresses, and passwords stored in the database
API Endpoint:

GET: /user/getAll
