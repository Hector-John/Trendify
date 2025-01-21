# Documentation for Trendify

## orderController.js
### Overview
This file contains the logic for placing an order, including interaction with the Stripe API.

### placeOrder Function
- **Parameters**: 
  - `req`: The request object containing order details.
  - `res`: The response object used to send back the result.
- **Response Structure**:
  - On success: Returns a JSON object with `success: true` and `session_url`.
  - On error: Returns a JSON object with `success: false` and an error message.

## orderModel.js
### Overview
This file defines the schema for the order model using Mongoose.

### Fields
- `userId`: String, required. The ID of the user placing the order.
- `items`: Array, required. The list of items in the order.
- `amount`: Number, required. The total amount for the order.
- `address`: Object, required. The delivery address for the order.
- `status`: String, default "Processing". The current status of the order.
- `date`: Date, default to the current date. The date the order was created.
- `payment`: Boolean, default false. Indicates whether the order has been paid.

## Context.jsx
### Overview
This file defines a React context provider that manages the state related to the shopping cart and the list of shoes.

### State Variables
- `cartItems`: Object. Stores items in the cart.
- `token`: String. Stores the authentication token.
- `shoes_list`: Array. Stores the list of shoes fetched from the backend.

### Functions
- `addToCart(itemId)`: Adds an item to the cart.
- `removeFromCart(itemId)`: Removes an item from the cart.
- `getTotalCartAmount()`: Calculates the total amount of items in the cart.
- `fetchShoes()`: Fetches the list of shoes from the backend.

## Orders.jsx
### Overview
This component provides a form for creating orders.

### State Variables
- `userId`: String. Stores the user ID.
- `items`: String. Stores the items in JSON format.
- `amount`: Number. Stores the total amount.
- `address`: String. Stores the address in JSON format.
- `message`: String. Stores success or error messages.

### handleSubmit Function
- **Parameters**: 
  - `e`: The event object from the form submission.
- **Functionality**: Submits the order details to the backend API and updates the message state based on the response.
