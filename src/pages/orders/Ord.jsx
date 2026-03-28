import React from "react";
import "./ord.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const Ord = ({ url }) => {
  const delOrder = async (orderId) => {
    try {
      // Call backend to delete order
      await axios.post(
        url + "/api/order/dt", // make sure your backend route exists
        { orderId },
      );

      // Remove it from state locally
      sod((prev) => prev.filter((order) => order._id !== orderId));
      console.log("Order deleted:", orderId);
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };
  const [od, sod] = useState([]);
  const fd = async () => {
    const rs = await axios.get(url + "/api/order/list");
    console.log(rs.data.success);

    if (rs.data.success) {
      sod(rs.data.data);
      console.log(od);
    } else {
      toast.error("Error");
    }
    // console.log(rs.data.data);
  };
  const statushand = async (event, orderId) => {
    const rs = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (rs.data.success) {
      await fd();
    }
  };
  useEffect(() => {
    fd();
  }, []);
  console.log(od);

  return (
    <div className="od add">
      <h3>Order Page</h3>
      <div className="odl">
        {od.map((sg, index) => {
          return (
            <div key={index} className="ot">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="otf">
                  {sg.items.map((item, i) => {
                    if (i === sg.items.length - 1) {
                      return item.name + "x" + item.quantity;
                    } else {
                      return item.name + "x" + item.quantity + ",";
                    }
                  })}
                </p>
                <p className="itemn">
                  {sg.address.firstName + " " + sg.address.lastName}
                </p>
                <div className="ita">
                  <p>{sg.address.street + ","}</p>
                  <p>
                    {sg.address.city +
                      " ," +
                      sg.address.state +
                      "," +
                      sg.address.country +
                      "," +
                      sg.address.zipcode}{" "}
                  </p>
                </div>
                <p className="odp">{sg.address.phone}</p>
              </div>
              <p>Items:{sg.items.length}</p>
              <p>${sg.amount}</p>
              <select
                onChange={(event) => statushand(event, sg._id)}
                value={sg.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button onClick={() => delOrder(sg._id)}>Delete Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ord;
