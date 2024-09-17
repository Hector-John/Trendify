import React, { useState, useEffect } from "react";
import "./List.scss";
import axios from "axios";
import { toast } from "react-toastify";

export const List = ({url}) => {
  // const url = "http://localhost:5000";
  const [list, setList] = useState([]);

  const handleDelete = async (shoeId) => {
    const response = await axios.post(`${url}/api/shoe/remove/`, {id:shoeId});
  await fetchList();
  if(response.data.success){
    toast.success(response.data.message)
  }
  else{
    toast.error("Error")
  } 
  }
 
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/shoe/list`);
      if (response.data.success) {
        setList(response.data.shoes); 
      } else {
        toast.error("Error");
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flexCol">
      <p>List of shoes</p>
      <div className="listTable">
        <div className="tableFormat title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="tableFormat">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>handleDelete(item._id)} className="x">X</p>
            </div>
          ))
        ) : (
          <div className="error">No data available</div>
        )}
      </div>
    </div>
  );
};
