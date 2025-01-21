import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACING ORDER 
const placeOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }));

        lineItems.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery fee"
                },
                unit_amount: 3 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems, // Corrected from lineItems to line_items
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`, // Corrected from successUrl to success_url
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`, // Corrected from cancelUrl to cancel_url
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error creating order:", error.message); // More specific error logging
        res.status(500).json({ success: false, message: error.message || "An error occurred while creating the order." });
    }
}

export { placeOrder };
