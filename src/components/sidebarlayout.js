import React from "react";
import { Outlet } from 'react-router-dom';
import Footer from "./footer";
import Sidebar from "./sidebar";

const SidebarLayout = () => {
return (

<div className="" id="page-container">
<Sidebar />
<div className="z-0">
<Outlet />
</div>
<Footer/>
</div>

);
};
    
export default SidebarLayout;