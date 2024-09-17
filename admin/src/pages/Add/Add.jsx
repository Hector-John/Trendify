import React, { useState } from "react";
import "./Add.scss";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  // const url = "http://localhost:5000";
  const [image, setImage] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "Nike",
  });

  const handleonChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails((details) => ({ ...details, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formDetails = new FormData();

    formDetails.append("name", details.name);
    formDetails.append("description", details.description);
    formDetails.append("price", Number(details.price));
    formDetails.append("category", details.category);
    formDetails.append("image", image);

    try {
      const response = await axios.post(`${url}/api/shoe/add`, formDetails);
      if (response.data.success) {
        setDetails({
          name: "",
          description: "",
          price: "",
          category: "Nike",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding shoe", error);
    }
  };

  return (
    <div className="add">
      <form className="flexCol" onSubmit={submitHandler}>
        <div className="imgUpload flexCol">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="shoeName flexCol">
          <p>Shoe name</p>
          <input
            onChange={handleonChange}
            value={details.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="shoeDescription flexCol">
          <p>Shoe description</p>
          <textarea
            onChange={handleonChange}
            value={details.description}
            name="description"
            rows="6"
            placeholder="Write a description"
            required
          ></textarea>
        </div>

        <div className="addCategoryPrice">
          <div className="category flexCol">
            <p>Shoe category</p>
            <select
              name="category"
              onChange={handleonChange}
              value={details.category}
            >
              <option value="Nike">Nike</option>
              <option value="Timberland">Timberland</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="Converse">Converse</option>
              <option value="New Balance">New Balance</option>
              <option value="Vans">Vans</option>
              <option value="Formal">Formal</option>
            </select>
          </div>
          <div className="price flexCol">
            <p>Shoe Price</p>
            <input
              onChange={handleonChange}
              value={details.price}
              type="number"
              name="price"
              placeholder="$15"
            />
          </div>
        </div>
        <button type="submit" className="addButton">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
