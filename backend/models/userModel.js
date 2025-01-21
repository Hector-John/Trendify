import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    address: { type: addressSchema, default: {} } 
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('User', userSchema);

export default userModel;
