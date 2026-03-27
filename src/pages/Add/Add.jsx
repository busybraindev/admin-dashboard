import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [im, sim] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onc = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const sb = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", im);
    console.log(formData);

    const response = await axios.post(`${url}/api/food/add`, formData);
    console.log(response.data.sucess);

    if (response.data.sucess) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      sim(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={sb}>
        <div className="add-img-up flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={im ? URL.createObjectURL(im) : assets.upload_area}></img>
          </label>
          <input
            onChange={(e) => sim(e.target.files[0])}
            name="image"
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="apn">
          <p>Product name</p>
          <input
            onChange={onc}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="apd flex-col">
          <p>Product description</p>
          <textarea
            onChange={onc}
            value={data.description}
            name="description"
            rows={6}
            placeholder="write content here"
            required
          ></textarea>
        </div>
        <div className="acp">
          <div className="ac flex-col">
            <p>Product category</p>
            <select name="category" onChange={onc} value={data.category}>
              <option value={"Salad"}>Salad</option>
              <option value={"Rolls"}>Rolls</option>
              <option value={"Deserts"}>Deserts</option>
              <option value={"Sandwich"}>Sandwich</option>
              <option value={"Cake"}>Cake</option>
              <option value={"Pure Veg"}>Pure Veg</option>
              <option value={"Pasta"}>Pasta</option>
              <option value={"Noodles"}>Noodles</option>
            </select>
          </div>
          <div className="apc flex-col">
            <p>Product price</p>
            <input
              onChange={onc}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="ab">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
