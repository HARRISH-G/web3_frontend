import React, { useState } from "react";
import axios from "axios";
import logo from "../images/login-logo.png";
import bbgamelogin from "../../src/images/bbgamelogin.png";

import logologin from "../../src/images/logo-login.png";

import { useNavigate } from "react-router-dom";
import bblogo from "../images/bbfulllogo.png";
import validator from "validator";

const Signup = () => {
  const [details, setdetails] = useState({});
  const [errMsg, seterrMsg] = useState("");
  const [pswrules, setpswrules] = useState({});
  const [minchar, setMinchar] = useState(false);
  const [specialchar, setSpecialchar] = useState(false);
  const [smallalpha, setsmallPha] = useState(false);
  const [capiatlalpha, setCapitalAlpha] = useState(false);
  const [number, setnumber] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false);
  const [showpass, setshowpass] = useState(false);

  const BaseURL = "https://booboo-login.kryptofam.com/";
  let navigate = useNavigate();
  const handleChange = (evt) => {
    const value = evt.target.value;
    setdetails({
      ...details,
      [evt.target.name]: value,
    });
  };

  const Submit = async () => {
    console.log("rules", pswrules);
    console.log("details", details);
    if (
      !(
        details.userName ||
        details.email ||
        details.password ||
        details.gender ||
        details.phoneNo
      )
    ) {
      seterrMsg("field required");
    } else {
      if (details.password === details.confirmPassword) {
        try {
          let data = {
            username: details.userName,
            email: details.email,
            password: details.password,
            gender: details.gender,
            phone: details.phoneNo,
          };
          await axios
            .post(BaseURL + "/users/register", data)
            .then((respnse) => {
              console.log(respnse);
              if (respnse.data.code === "success") {
                console.log(respnse.data.message);
                navigate("/login");
              } else {
                seterrMsg(respnse.data.message);
                console.log(respnse.data.message);
              }
            });
        } catch (error) {
          console.log(error?.response?.data?.message);
          seterrMsg(error?.response?.data?.message);
        }
      } else if (details === null || details === undefined || details === "") {
        seterrMsg("empty fields");
      } else {
        console.log("password not matching");
        seterrMsg("password not matching");
      }
    }
  };

  const gotosign = () => {
    // console.log()
    navigate("/login");
  };

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      seterrMsg();
      // setmail(email);
      setdetails({
        ...details,
        [e.target.name]: email,
      });
    } else if (
      email.length === " " ||
      email.length === null ||
      email.length === 0
    ) {
      seterrMsg("");
    } else {
      seterrMsg("Enter valid Email!");
    }
  };

  const getPassword = (e) => {
    let psw = e.target.value;

    // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const capitalAlpha = new RegExp("^(?=.*[A-Z])(?=.{0,})");
    // const smallAlpha = new RegExp("^(?=.*[a-z])(?=.{0,})");
    const numbers = new RegExp("^(?=.*[0-9])(?=.{0,})");

    const specialChar = new RegExp("^(?=.*[!.@#$%^&*])(?=.{0,})");
    if (!(psw.lenght === 0 || psw === null || psw === " ")) {
      // check length
      if (psw.length > 6) {
        setMinchar(true);
      } else {
        setMinchar(false);
      }
      // check special char
      if (specialChar.test(psw)) {
        setSpecialchar(true);
      } else {
        setSpecialchar(false);
      }

      // check capital alphabits
      if (capitalAlpha.test(psw)) {
        setCapitalAlpha(true);
      } else {
        setCapitalAlpha(false);
      }

      // check numbers
      if (numbers.test(psw)) {
        setnumber(true);
      } else {
        setnumber(false);
      }
      setdetails({
        ...details,
        [e.target.name]: psw,
      });
    }
  };

  const validateContact = (e) => {
    let number = e.target.value;
    var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (regex.test(number) && number.lenght >= 10 && number.lenght <= 12) {
      seterrMsg("");
      setdetails({
        ...details,
        [e.target.name]: number,
      });
    } else {
      seterrMsg(" Invalid phone number");
    }
  };

  return (
    <div className="fix-height relative">
      {/* sm:py-8 md:py-8 py-8 lg:py-8 xl:py-10 */}
      <img
        src={logologin}
        // height="400"
        // width="400"
        align="right"
        className="mx-auto logo-height signup-background "
        alt=""
      />
      <div className="container mx-auto login-align login-page">
        <div className="w-full flex flex-col xl: flex-row md:flex-col sm:flex-col justify-between">
          <div className="xl:flex-row flex md:flex-col sm:flex-col flex-col lg:w-2/5 sm:w-4/5 md:w-4/5 p-6 md:p-8 mx-auto sm:mx-auto md:mx-auto lg:mx-0 ">
            <div className="flex flex-col">
              <div className=" self-center xl:px-20 md:px-10 sm:px-2 px-2">
                <img
                  src={bblogo}
                  height="200"
                  width="200"
                  className="mx-auto login-logo-icon"
                  alt=""
                />{" "}
              </div>

              <div className="text-1xl text-red-500  mt-2 font-bold self-center mb-5">
                WELCOME TO WEBGL GAMES
              </div>
              <div>
                <span className="after:content-[''] after:ml-0.5 text-justify text-red-700 red text-xs font-medium text-red text-left">
                  {errMsg}
                </span>
              </div>
              <label className="block w-full mb-5 mt-5 self-center">
                <input
                  type="text"
                  name="userName"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="mt-1 w-full px-3 py-3 bg-transparent border-red-500 border-b-2 
                                     font-semibold focus:outline-none text-md placeholder-slate-500"
                  //    focus:border-red-500 focus:ring-red-500 block signup-input-width
                  placeholder="Username"
                />
              </label>

              <label className="block w-full mb-5 self-center">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => validateEmail(e)}
                  className="mt-1 w-full px-3 py-3 bg-transparent border-red-500 border-b-2 
                                    placeholder-slate-500 font-semibold focus:outline-none text-md"
                  placeholder="Email"
                />
              </label>

              <label className="block w-full mb-5 self-center">
                <input
                  type={showpass ? "text" : "password"}
                  required
                  name="password"
                  onChange={(e) => getPassword(e)}
                  className="mt-1 w-full px-3 py-3 bg-transparent border-red-500 border-b-2 
                                    placeholder-slate-500 font-semibold focus:outline-none text-md"
                  placeholder="Password"
                />
                {showpass ? (
                  <i
                    className="fa fa-eye float-right relative -mt-6 mr-2 z-10 cursor-pointer"
                    onClick={(e) => setshowpass(false)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye-slash float-right relative -mt-6 z-10 mr-2 cursor-pointer"
                    onClick={(e) => setshowpass(true)}
                  ></i>
                )}

                {/* <div className="box arrow-left"> */}
                <div className="text-left text-xs flex float-left">
                  <span className={minchar ? "text-green-500" : "text-red-500"}>
                    should have minimum 8 characters,
                    <span
                      className={
                        specialchar ? "text-green-500" : "text-red-500"
                      }
                    >
                      1 special character,
                    </span>
                    <span
                      className={
                        capiatlalpha ? "text-green-500" : "text-red-500"
                      }
                    >
                      1 capital letter,
                    </span>
                    {/* <span
                      className={smallalpha ? "text-green-500" : "text-red-500"}
                    >
                      1 special character,
                    </span> */}
                    <span
                      className={number ? "text-green-500" : "text-red-500"}
                    >
                      1 number.
                    </span>
                  </span>
                </div>
                {/* <div>
    <i className="fa fa-eye float-right -mt-6 mr-2 cursor-pointer"></i>           
                <i className="fa fa-eye-slash float-right -mt-6 mr-2 cursor-pointer"></i>
                </div> */}
              </label>
              <label className="block w-full mb-5 self-center">
                <input
                  type={showconfirm ? "text" : "password"}
                  name="confirmPassword"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="mt-1 w-full px-3 py-3 bg-transparent border-red-500 border-b-2 
                                    placeholder-slate-500 font-semibold focus:outline-none text-md"
                  placeholder="Confirm Password"
                />
                {showconfirm ? (
                  <i
                    className="fa fa-eye float-right relative -mt-6 mr-2 z-10  cursor-pointer"
                    onClick={(e) => setshowconfirm(false)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye-slash float-right relative -mt-6 z-10 mr-2 cursor-pointer"
                    onClick={(e) => setshowconfirm(true)}
                  ></i>
                )}
              </label>

              <label className="block w-full mb-5 self-center">
                <input
                  type="phone"
                  name="phoneNo"
                  onChange={(e) => {
                    validateContact(e);
                  }}
                  className="mt-1 w-full px-3 py-3 bg-transparent border-red-500 border-b-2 
                                    placeholder-slate-500 font-semibold focus:outline-none text-md"
                  placeholder="Phone No"
                />
              </label>

              <div className="flex flex-row">
                <label for="male" className="flex m-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="M"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  Male
                </label>

                <label for="female" className="flex m-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="F"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  Female
                </label>
              </div>

              <div className="mb-2 w-full mt-5 self-center lg:self-center">
                <button
                  type="button"
                  onClick={Submit}
                  className="text-white w-full rounded-lg bg-red-500 text-xl font-bold signup-input-width py-2"
                >
                  Signup
                </button>
              </div>
              <div className="text-xs font-normal">
                Already have an Account?
                <span
                  className="text-xs font-normal hover:border-b-2 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                  onClick={gotosign}
                >
                  &#8194;Sign In
                </span>
              </div>
            </div>
          </div>

          {/* <div
            className="signup-background flex self-center "
            //    style={{backgroundImage: `url(${gamelogin})`}}
          >
            <img
              src={bbgamelogin}
              height="400"
              width="400"
              className="mx-auto"
              alt=""
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
