import "../../App.css";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Game from "../game";
import Home from "../home";
import Login from "../login";
import Signup from "../signup";
import Settings from "../settings";
import Favourite from "../favourite";
import { ValidateToken } from "../tokenvalidator/TokenValidate";
import SidebarLayout from "../sidebarlayout";
import { useSelector, useDispatch } from "react-redux";
import UserSignOut from "../../actions/UserSignout";
// import Frontend from "./layouts/Frontend";

const AppRoutes = () => {
  // let token = window.sessionStorage.getItem("token");
  let userdata = useSelector((state) => {
    console.log("home token", state);
    return state?.userToken?.state ? state?.userToken?.state : state?.userToken;
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  console.log("token", userdata.token);

  const clearSession = async () => {
    console.log("clear sessions");
    sessionStorage.setItem("token", "");
    navigate("/login");
    dispatch(UserSignOut());
    sessionStorage.clear();
  };

  useEffect(() => {
    const load = async () => {
      if (userdata.token) {
        let isvalidtoken = await ValidateToken();
        console.log("isvalidtoken", isvalidtoken);
        if (!isvalidtoken) {
          console.log("Session Expired, Signingout");

          console.log("Token notValid");
          clearSession();
        } else {
          console.log("token valid");
        }
      }
      load();
    };

    return () => {};
  }, [userdata.token]);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {!(userdata.token === "" || ValidateToken() === false) ? (
          <Route element={<SidebarLayout />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/favourite" element={<Favourite />}></Route>
            <Route path="/game/" element={<Game />}></Route>
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
