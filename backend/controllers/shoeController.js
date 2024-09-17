import shoeModel from "../models/shoeModel.js";
import fs from "fs";

// ADD SHOES
const addShoe = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const shoe = new shoeModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await shoe.save();
    res.json({ success: true, message: "Shoe added" });
  } catch (error) {
    console.error("Error adding shoe:", error); 
    res.status(500).json({ success: false, message: "Error adding shoe", error: error.message }); 
  }
};


// ALL SHOES LIST
const listShoe = async(req,res) =>{
try {
    const shoes = await shoeModel.find({});
    res.json({success:true, shoes:shoes});
} catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:"Error getting shoes", error:error.message});
}
}

// REMOVE SHOE FROM LISTING
const removeShoe = async(req, res) =>{
try {
    const shoe = await shoeModel.findById(req.body.id);
    if (!shoe || !shoe.image) {
      return res.json({ success: false, message: "Shoe not found or image not available" });
    }
    fs.unlink(`uploads/${shoe.image}`, () => {})

    await shoeModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Shoe removed" });

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing shoe", error: error.message });
}
}

export { addShoe , listShoe, removeShoe};
