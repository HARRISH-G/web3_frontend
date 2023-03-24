import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import home from "../images/home.png";
import star from "../images/star.png";
import settings from "../images/settings.png";
import logout from "../images/logout.png";
import profile from "../images/profile.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserSignOut from "../actions/UserSignout";

const Sidebar = () => {
  const dispatch = useDispatch();
  const mobileMenutoggle = (e) => {
    let lists = document.querySelector("ul");
    lists.classList.toggle("ul-close");

    let list = document.querySelector("button");
    list.classList.toggle("close-icon");
  };
  const showMenu = () => {
    var element = document.getElementById("show-menu");
    element.classList.toggle("hidden");
    document.getElementById("show-menu").style.display = "block";
  };
  const closeMenu = () => {
    var element = document.getElementById("show-menu");
    element.classList.toggle("hidden");

    document.getElementById("show-menu").style.display = "none";
  };

  const clearSession = async () => {
    console.log("clear sessions");
    dispatch(UserSignOut());
    sessionStorage.clear();
  };

  return (
    <div>
      {/* <div className="lg:w-32 md:w-32 sm:w-32 h-full z-40 absolute lg:fixed md:fixed sm:fixed"> */}
      {/* h-20 lg:h-full md:h-full sm:h-full */}
      {/* <div className="z-40 fixed h-full"> */}
      {/* bg-red-600 relative pt-5 pb-5 shadow-2xl*/}

      <div id="mySidenav" className="sidenav fixed">
        <div className="block text-3xl relative cursor-pointer md:hidden">
          <button
            className="flex flex-col float-left text-left left-0 -top-2 relative mx-2 md:mx-0 bar-icon"
            // float-right right-8
            onClick={(e) => mobileMenutoggle(e)}
          ></button>
        </div>

        <ul
          className=" flex flex-col
  sm:mt-20 mt-0 md:mt-20 xl:mt-20 sidenav-bg hidden fixed sm:flex md:flex xl:flex
   font-bold md:flex md:items-center 
  left-0 py-2  transition-all ease-in duration-500"
        >
          {/* absolute opacity-0 md:opacity-100 z-10 z-[1] md:z-auto */}
          {/*  sidenav-bg bg-slate-800 sm:bg-slate-800 md:bg-slate-800 lg:bg-transparent */}
          {/* relative md:static top-[-400px] */}

          <li
            className="relative mb-5"
            id="home"
          >
            <a
              onClick={(e) => mobileMenutoggle(e)}
              href="/home#games"
              className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
         grow cursor-pointer transition duration-300 ease-in-out"
            >
              <span className="text-sm  ml-2 self-center font-bold ">
                {" "}
                Home
              </span>
              <img src={home} height="25" width="25" className="" alt="" />
            </a>

            {/* <NavLink
                  to="/home"
                  id="home"
                  onClick={(e) => mobileMenutoggle(e)}
                  className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
          grow cursor-pointer transition duration-300 ease-in-out"
                >
                  <span className="text-sm ml-2 self-center font-bold ">
                    {" "}
                    Home
                  </span>{" "}
                  <img src={home} height="25" width="25" className="" alt="" />
                </NavLink> */}
          </li>

          <li
            className="relative mb-5"
            id="favourite"
          >
            <a
              onClick={(e) => mobileMenutoggle(e)}
              href="/home#favourites"
              className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
         grow cursor-pointer transition duration-300 ease-in-out"
              //  className="hover:text-2xl active:text-2xl text-xl duration-500 xl:text-gray-200
              //  md:text-gray-200 sm:text-black text-black"
            >
              <span className="text-sm  ml-2 self-center font-bold ">
                {" "}
                Favourite
              </span>
              <img src={star} height="25" width="25" className="" alt="" />
            </a>

            {/* <NavLink
                  //  onClick={homepage}
                  to="/favourite"
                  id="favourite"
                  onClick={(e) => mobileMenutoggle(e)}
                  className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
          grow cursor-pointer transition duration-300 ease-in-out"
                >
                  <span className="text-sm  ml-2 self-center font-bold ">
                    {" "}
                    Favourite
                  </span>{" "}
                  <img src={star} height="25" width="25" className="" alt="" />
                </NavLink> */}
          </li>

          {/* <li className="relative mb-5">
                <NavLink
                  to="/settings"
                  id="settings"
                  onClick={(e) => mobileMenutoggle(e)}
                  className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
          grow cursor-pointer transition duration-300 ease-in-out"
                >
                  <span className="text-sm self-center ml-2 font-bold ">
                    {" "}
                    Settings
                  </span>{" "}
                  <img
                    src={settings}
                    height="25"
                    width="25"
                    className=""
                    alt=""
                  />
                </NavLink>
              </li> */}

          <li className="relative mb-5">
            <NavLink
              id="logout"
              //  onClick={homepage}
              to="/"
              onClick={(e) => {
                mobileMenutoggle(e);
                clearSession();
              }}
              className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
          grow cursor-pointer transition duration-300 ease-in-out"
            >
              <span className="text-sm ml-2 self-center font-bold ">
                {" "}
                Logout
              </span>{" "}
              <img src={logout} height="25" width="25" className="" alt="" />
            </NavLink>
          </li>

          {/* <li className="relative mb-5">
      <a id="favourite" className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
       grow cursor-pointer transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
      <span className="text-sm self-center font-bold "> Favourite</span>
       <img src={star} height="25" width="25" className="" alt="" />
      </a>
    </li> 

    <li className="relative mb-5">
      <a id="settings" className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
       grow cursor-pointer transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
      <span className="text-sm self-center font-bold "> Settings</span> <img src={settings} height="25" width="25" className="" alt="" />
      </a>
    </li>


    <li className="bottom-0 relative mt-28">
      <a id="logout" className="py-1 justify-center flex justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded 
       grow cursor-pointer transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">
      <span className="text-sm self-center font-bold ">  Logout </span> <img src={logout} height="25" width="25" className="" alt="" />
      </a>
    </li> */}
        </ul>
        {/* </div> */}
      </div>
      {/* </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
