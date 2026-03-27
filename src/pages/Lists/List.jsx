import React, { useEffect, useState } from "react";
import "./lt.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [lt, slt] = useState([]);
  const fl = async () => {
    const rs = await axios.get(`${url}/api/food/list`);
    console.log(rs);

    if (rs.data.sucess) {
      slt(rs.data.data);
    } else {
      toast.error("Error");
    }
  };
  const rf = async (id) => {
    const rs = await axios.post(`${url}/api/food/remove`, { id: id });
    await fl();
    if (rs.data.success) {
      toast.success(rs.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fl();
  }, []);
  return (
    <div className="lt add flex-col">
      <p>All Foods List</p>
      <div className="ltb">
        <div className="ltbft tt">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {lt.map((item, i) => {
          return (
            <div key={i} className="ltbft">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cu" onClick={() => rf(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
