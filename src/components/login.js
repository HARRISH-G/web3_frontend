import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../images/login-logo.png";
import bbgamelogin from "../../src/images/bbgamelogin.png";
import gamelogin from "../../src/images/gamelogin.png";
import logobg from "../../src/images/logo-bg.png";
import logologin from "../../src/images/logo-login.png";
import booboocoin from "../../src/images/booboocoin.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGNIN } from "../actiontypes/Types";
import Signin, { UsersignIn } from "../actions/Signin";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../actions/googlelAuth";
import bblogo from "../images/bbfulllogo.png";
import UserSignOut from "../actions/UserSignout";
const Login = () => {
  const [showconfirm, setshowconfirm] = useState(false);
  const [details, setdetails] = useState({});
  const [errMsg, seterrMsg] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setdetails({
      ...details,
      [evt.target.name]: value,
    });
  };

  const Submit = async (e) => {
    if (!(details.email || details.password)) {
      seterrMsg("fields  require ");
    } else {
      try {
        let data = {
          id: details.email,
          password: details.password,
        };
        await dispatch(UsersignIn(data)).then((respnse) => {
          console.log(respnse);
          if (respnse.code === "success") {
            sessionStorage.setItem("token", respnse.data.token);
            navigate("/home");
          } else {
            seterrMsg(respnse?.response?.data?.message);
            console.log(respnse?.response?.data?.message);
          }
        });
      } catch (error) {
        console.log(error);
        seterrMsg(error?.response?.data?.message);
      }
    }
  };
  const gotosign = () => {
    // console.log()
    navigate("/signup");
  };

  const googlelogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserGoogleProfile(tokenResponse.access_token);
    },
  });

  const getUserGoogleProfile = async (accesstoken) => {
    try {
      if (accesstoken) {
        console.log(accesstoken);
        window.sessionStorage.setItem("web0auth", accesstoken);
        const data = {
          google_token: accesstoken,
        };
        await dispatch(googleAuth(data)).then((res) => {
          if (res?.code === "success") {
            seterrMsg(res?.message);

            navigate("/home");
            //  setisLoader(false);
          } else if (res?.response?.data?.code === "failed") {
            seterrMsg(res?.response?.data?.message);
            //  setisLoader(false);
          } else if (res?.code === "ERR_NETWORK") {
            seterrMsg(res?.message);
            //  setisLoader(false);
          } else {
            seterrMsg("something went wrong");
            //  setisLoader(false);
          }
        });
      }
    } catch (error) {}
    return;
  };

  useEffect(() => {
    sessionStorage.clear();
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("email", "");
    dispatch(UserSignOut());
    return () => {};
  }, []);

  return (
    <div
      className="fix-height relative"
      //  style={{backgroundImage: `url(${logologin})`,
      //   backgroundRepeat: "no-repeat",
      //   // backgroundSize: "cover"
      // }}
    >
      <img
        src={logologin}
        // height="400"
        // width="400"
        align="right"
        className="mx-auto logo-height signup-background "
        alt=""
      />
      {/* sm:py-8 md:py-8 py-8 lg:py-8 xl:py-10 */}
      <div className="container mx-auto login-align login-page">
        <div className="w-full flex flex-col xl: flex-row md:flex-col sm:flex-col justify-between">
          <div
            className="xl:flex-row flex md:flex-col sm:flex-col flex-col lg:w-2/5 sm:w-4/5 md:w-4/5 
          p-6 sm:p-8 md:p-8 mx-auto sm:mx-auto md:mx-auto lg:mx-0 "
          >
            {/* md:mx-0 md:flex-row md:w-2/5 */}
            <div className="flex flex-col">
              <div className=" self-center xl:px-20 md:px-10 sm:px-2 px-2">
                <img
                  src={bblogo}
                  height="200"
                  width="200"
                  className="login-logo-icon mx-auto"
                  alt=""
                />{" "}
              </div>
              {/* <img src={gamelogin} height="200" width="200" className="mx-auto" alt="" />  */}

              <div className="text-1xl text-red-500  mt-2 font-bold self-center mb-5">
                WELCOME TO WEB3 GAMES
              </div>
              <div>
                <span className="after:content-[''] after:ml-0.5 text-justify text-red-700 red text-xs font-medium text-red text-left">
                  {errMsg}
                </span>
              </div>
              <label className="block w-full mb-5 mt-5 self-center">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="mt-1 w-full px-3 p-1 py-4 bg-transparent border-red-500 border-b-2 
                                     font-semibold focus:outline-none text-md placeholder-black"
                  //    focus:border-red-500 focus:ring-red-500 block signup-input-width
                  placeholder="Username"
                />{" "}
              </label>

              <label className="block w-full mb-5 self-center">
                <input
                  type={showconfirm ? "text" : "password"}
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="mt-1 w-full px-3 p-1 py-4 bg-transparent border-red-500 border-b-2 
                                    placeholder-black font-semibold focus:outline-none text-md"
                  placeholder="Password"
                />
                {showconfirm ? (
                  <i
                    className="fa fa-eye float-right relative -mt-6 mr-2 z-10 cursor-pointer"
                    onClick={(e) => setshowconfirm(false)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye-slash float-right relative -mt-6 z-10 mr-2 cursor-pointer"
                    onClick={(e) => setshowconfirm(true)}
                  ></i>
                )}
              </label>
              <div className="text-md flex text-right justify-end self-end font-semibold float-right">
                Forgot Password?
              </div>
              <div className="text-xs font-normal text-left">
                Don't have account ?
                <span
                  className="text-xs font-normal hover:border-b-2 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                  onClick={gotosign}
                >
                  &#8194;Sign Up
                </span>
              </div>
              <div className="mb-5 w-full mt-4 self-center lg:self-center">
                <button
                  type="button"
                  onClick={Submit}
                  className="text-white w-full rounded-lg bg-red-500 text-xl font-bold signup-input-width py-2"
                >
                  {" "}
                  LOGIN
                </button>{" "}
              </div>

              {/* <button
                type="button"
                className="text-red-500 border-2 border-red-500 self-center text-center justify-center flex flex-row w-full rounded-lg bg-transparent text-xl font-bold signup-input-width py-2"
              >
                <img
                  src={booboocoin}
                  height="30"
                  width="30"
                  className="mr-2 self-center"
                  alt=""
                />{" "}
                <span className="flex self-center">Login with BooBoo</span>
              </button> */}

              <div className="text-red-500 border-2 border-red-500 self-center text-center justify-center flex flex-row w-full rounded-lg bg-transparent text-xl font-bold signup-input-width py-2">
                <button
                  type="button"
                  className="login-with-google-btn"
                  onClick={googlelogin}
                >
                  Sign in with Google
                </button>
                {/* <GoogleLogin
                  onSuccess={getUserGoogleProfile}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
