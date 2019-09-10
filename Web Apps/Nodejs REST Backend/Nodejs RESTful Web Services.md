# Node.js RESTful Web Services

This is an API backend written in JavaScript and running on a Node.js server. The API's are RESTful and follow standard RESTful best practices. The backend uses the typical MVC architecture, less the view. The view would be the front-end system which would invoke these API's. The model is a MongoDB database running on an Atlas cluster. JSON Web Token (JWT) is used for user authentication.

The following routes / services are exposed:

/user:
- /signup - POST request for a user to signup for the service. Requires email and password provided in the request body (JSON format).
- /login - POST request for a user to login into the services. Requires email and password provided in the request body (JSON format). Reply message contains the user JWT token to be use in subsequent messages.
- /id - DELETE request to delete a user. Requires passing the user id as a parameter.

/products:
- / - GET request for obtaining a list of available products.
- / - POST request to add a product. Requires form data in the body containing the name, price and productImage parameters. productImage is optional.
- /id - PATCH request to update a product. Requires the product id in the route and form data in the body: name, price and optionally productImage.
- /id - DELETE request to delete a product. Requires passing the product id as a parameter.

/orders:
- / - GET request for obtaining a list of open orders.
- / - POST request to submit an order. Requires the productId and quantity in the body (JSON format.
- /id - PATCH request to update an order. Requires the order id in the route and the productId and quantity in the body (JSON format).
- /id - DELETE request to delete an order. Requires passing the order id as a parameter.