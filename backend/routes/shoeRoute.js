import express from "express"
import { addShoe, listShoe, removeShoe } from "../controllers/shoeController.js"
import multer from "multer"

const shoeRouter = express.Router();

// IMAGE STORAGE
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

// IMAGE UPLOAD LOGIC

const upload = multer({ storage: storage })


shoeRouter.post("/add", upload.single("image"), addShoe)

shoeRouter.get("/list", listShoe)

shoeRouter.post ("/remove", removeShoe)




export default shoeRouter;