import "../../App.css";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Game from "../game";
import Home from "../home";
import Login from "../login";
import Signup from "../signup";
import Settings from "../settings";
import Favourite from "../favourite";
// import { ValidateToken } from "../tokenvalidator/TokenValidate";
import SidebarLayout from "../sidebarlayout";
import { useSelector, useDispatch } from "react-redux";
import UserSignOut from "../../actions/UserSignout";
// import Frontend from "./layouts/Frontend";
import axios from "axios";
const AppRoutes = () => {
  // let token = window.sessionStorage.getItem("token");
  let userdata = useSelector((state) => {
    console.log("home token", state);
    return state?.userToken?.state ? state?.userToken?.state : state?.userToken;
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  console.log("token", userdata.token);
  let token = sessionStorage.getItem("token");
  // const clearSession = async () => {
  //   console.log("clear sessions");
  //   sessionStorage.setItem("token", "");

  //   dispatch(UserSignOut());
  // };

  const ValidateToken = async () => {
    if (token) {
      let isvalidtoken = await axios({
        method: "get",
        url: "https://booboo-login.kryptofam.com/users/token_validity",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("isvalidtoken", isvalidtoken);
      if (isvalidtoken?.data?.data?.is_valid) {
        console.log("token valid");
        return true;
      } else {
        console.log("Session Expired, Signingout");

        console.log("Token notValid");
        dispatch(UserSignOut());
        navigate("/login");
        return false;
      }
    }
  };

  useEffect(() => {
    ValidateToken();
    return () => {};
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<Login />}></Route>
        {!(
          userdata.token === "" ||
          userdata.token === undefined ||
          ValidateToken() === false
        ) ? (
          <Route element={<SidebarLayout />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/favourite" element={<Favourite />}></Route>
            <Route path="/game/" element={<Game />}></Route>
          </Route>
        ) : (
          <Route path="/login" element={<Login />}></Route>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
