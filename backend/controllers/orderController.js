import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACING ORDER 
const placeOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5173";
    try {
        // Get items from request body and calculate prices
        const items = req.body.items.map(item => ({
            ...item,
            price: item.price * 100  
        }));

        const deliveryFee = 3 * 100; 
        const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0) + deliveryFee;

        // Use userId from authMiddleware
        const userId = req.user.id;

        // Create a new order with userId from decoded token
        const newOrder = new orderModel({
            userId: userId, 
            items: items,
            amount: totalAmount,
            address: req.body.address
        });

        // Save the new order to the database
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} }); 

        // Create Stripe line items
        const lineItems = items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }));

        // Add delivery fee as a line item
        lineItems.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery fee"
                },
                unit_amount: deliveryFee
            },
            quantity: 1
        });

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontendUrl}/success?orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/fail?orderId=${newOrder._id}`,    
        });
        
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ success: false, message: error.message || "An error occurred while creating the order." });
    }
}

export { placeOrder };
