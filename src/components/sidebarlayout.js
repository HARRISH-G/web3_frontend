import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Sidebar from "./sidebar";

const SidebarLayout = () => {
  return (
    <div className="relative height-full">
      <Sidebar />
      {/* <div className=""> */}
      {/* z-0 l */}
     
        <Outlet />
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default SidebarLayout;
