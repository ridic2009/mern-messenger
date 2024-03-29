import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Register from "./modules/Register";
import Login from "./modules/Login";

import Inbox from "./pages/Inbox";
import VerifyAccount from "./modules/VerifyAccount";


axios.defaults.headers.common["token"] = window.localStorage.getItem("token");

export default function App() {

  const token = window.localStorage.getItem('token')

  useEffect(()=>{},[token])

  return (
    <BrowserRouter>
      {token ? (
        <Routes>
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/verify" element={<VerifyAccount />} />
          <Route path={"/login"} element={<Navigate replace to={"/inbox"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/verify" element={<VerifyAccount />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
