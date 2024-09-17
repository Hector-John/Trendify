import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// PLACING ORDER 
const placeOrder = async(req,res) =>{

    const frontendUrl = "http://localhost:5173"
try {
    const newOrder = new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})

    const lineItems = req.body.items.map((item)=>({
priceData:{
    currency:"USD",
    productData:{
        name: item.name
    },
    unitAmount:item.price 
},
quantity: item.quantity
    }))

    lineItems.push({
        priceData:{
            currency:"USD", 
            productData:{
                name: "Delivery fee"
            },
            unitAmount: 3*100
        },
        quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        lineItems:lineItems,
        mode: "payment",
        successUrl:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
        cancelUrl:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true,session_url:session.url})

} catch (error) {
    console.log(error);
    res.json ({succes:false,message:"Error"})
}
}




export {placeOrder}