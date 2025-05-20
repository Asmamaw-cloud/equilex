// 'use client'

// import React, { useState } from "react";
// import AdminNavbar from "./components/adminNavbar";
// import AdminSidebar from "./components/adminSidebar";

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {

//     const [ isVisible, SetIsVisible ] = useState(false)

//     const toggleSidebar  = () => SetIsVisible(!isVisible)

//   return (
//     <div className=" relative ">
//       <AdminNavbar  toggleSidebar = { toggleSidebar }/>
//       <AdminSidebar  isVisible = {isVisible} />
//       <div className="relative max-w-screen-2xl flex min-h-screen  flex-col bg-background">
//         {children}
//       </div>

      
//     </div>
//   );
// };

// export default AdminLayout;




// "use client"

// import type React from "react"
// import { useState } from "react"
// import AdminNavbar from "./components/adminNavbar"
// import AdminSidebar from "./components/adminSidebar"

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//   const [isVisible, setIsVisible] = useState(false)

//   const toggleSidebar = () => setIsVisible(!isVisible)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminNavbar toggleShowSideBar={toggleSidebar} isSidebarOpen={isVisible} />
//       <AdminSidebar isVisible={isVisible} />

//       <main className={`pt-16 transition-all duration-300 ${isVisible ? "lg:pl-64" : ""}`}>
//         <div className="p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">{children}</div>
//       </main>
//     </div>
//   )
// }

// export default AdminLayout






"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminNavbar from "./components/adminNavbar"
import AdminSidebar from "./components/adminSidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // 1024px is the lg breakpoint in Tailwind
    }

    // Set initial value
    checkScreenSize()

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize)

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Update isVisible when screen size changes
  useEffect(() => {
    setIsVisible(isLargeScreen)
  }, [isLargeScreen])

  const toggleSidebar = () => {
    // Only toggle if not on large screen
    if (!isLargeScreen) {
      setIsVisible(!isVisible)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar toggleShowSideBar={toggleSidebar} isSidebarOpen={isVisible} showToggle={!isLargeScreen} />
      <AdminSidebar isVisible={isVisible} />

      <main className={`pt-16 transition-all duration-300 ${isLargeScreen ? "lg:pl-64" : ""}`}>
        <div className="p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
