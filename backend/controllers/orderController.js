import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACING ORDER 
const placeOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5173";
    try {
        const items = req.body.items.map(item => ({
            ...item,
            price: item.price * 100 // Convert price to cents
        }));

        const deliveryFee = 3 * 100; // Delivery fee in cents
        const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0) + deliveryFee;

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: items,
            amount: totalAmount, // Set the total amount
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const lineItems = items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price // Price in cents
            },
            quantity: item.quantity
        }));

        lineItems.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery fee"
                },
                unit_amount: deliveryFee // Delivery fee in cents
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ success: false, message: error.message || "An error occurred while creating the order." });
    }
}

export { placeOrder };
