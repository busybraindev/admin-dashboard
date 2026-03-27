import React, { useEffect } from "react";
import Nav from "./components/navbar/Nav";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/Lists/List";
import Ord from "./pages/orders/Ord";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const App = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    // ✅ If coming from user app, save token
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");

    // ❌ No token → go back
    if (!token) {
      window.location.href = "http://localhost:5173";
      return;
    }

    // ✅ Verify from backend
    axios
      .get("http://localhost:4000/api/user/verify", {
        headers: { token },
      })
      .then((res) => {
        console.log(res);

        if (res.data.role !== "admin") {
          window.location.href = "http://localhost:5173";
        }
      })
      .catch(() => {
        window.location.href = "http://localhost:5173";
      });
  }, []);
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Nav></Nav>
      <hr />
      <div className="app">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/add" element={<Add url={url}></Add>}></Route>
          <Route path="/list" element={<List url={url}></List>}></Route>
          <Route path="/od" element={<Ord url={url}></Ord>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
