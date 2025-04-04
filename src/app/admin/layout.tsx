'use client'

import React, { useState } from "react";
import AdminNavbar from "./components/adminNavbar";
import AdminSidebar from "./components/adminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    const [ isVisible, SetIsVisible ] = useState(false)

    const toggleSidebar  = () => SetIsVisible(!isVisible)

  return (
    <div className=" relative ">
      <AdminNavbar  toggleSidebar = { toggleSidebar }/>
      <AdminSidebar  isVisible = {isVisible} />
      <div className="relative max-w-screen-2xl flex min-h-screen  flex-col bg-background">
        {children}
      </div>

      
    </div>
  );
};

export default AdminLayout;
