// "use client";

// import {
//   Bell,
//   Menu,
//   MessageSquare,
//   MessageSquarePlus,
//   Scale,
//   User,
//   X,
// } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState } from "react";

// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { Button } from "./ui/button";
// import ProfileDropDown from "./profileDropDown";
// import SearchInput from "./searchInput";
// import Notification from "./Notification";
// import ChatDropDown from "./chatDropDown";

// const MainNavbar = () => {
//   const [nav, setNav] = useState(false);
//   const { data: session } = useSession();
//   const currentRoute = usePathname();
//   const router = useRouter();

//   //@ts-ignore
//   const userType = session?.user.image.type;

//   const handleNav = () => setNav(!nav);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//       setMobileMenuOpen(false);
//     }
//   };

//   return (
//     <div className="sticky top-0 bg-background/95 md:backdrop-blur md:text-black z-50 flex justify-between items-center h-20 min-w-screen mx-auto px-4 text-white border ">

//       <div className=" lg:pl-4">
//         <Link
//           className="flex items-center gap-2"
//           href="/"
//           aria-label="EQUILEX Home"
//         >
//           <Scale className="h-6 w-6 text-[#333333]" />
//           <h1 className="text-xl md:text-2xl font-bold">
//               <span className="text-[#7B3B99]">EQUI</span><span className="text-[#2C2C2C]">LEX</span>
//           </h1>
//         </Link>
//       </div>

//       <>
//         {session ? (
//           <>
//             <div className="w-[30%]  md:flex hidden">
//               {userType == "client" ? <SearchInput /> : null}
//             </div>
//             <ul className="hidden md:flex items-center ">
//               <div className="relative p-2 hover:scale-110 duration-300 text-slate-500  ">
//                 <Notification />
//               </div>
//               <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110 ">
//                 <ChatDropDown />
//               </li>

//               <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300   text-slate-500  ">
//                 {currentRoute == "/" ? (
//                   <>
//                     {userType == "client" ? (
//                       <Link href="/client/lawyers">
//                         <h3 className="text-2xl group-hover:font-bolder hover:text-[#7B3B99] hover:scale-110">
//                           Lawyer
//                         </h3>
//                       </Link>
//                     ) : (
//                       <div className="flex gap-4">
//                         <Link href="/lawyer">
//                           <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99] hover:scale-110">
//                             MyPage
//                           </h3>
//                         </Link>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className=" flex gap-2 ">
//                     <Link href="/">
//                       <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99] duration-300 hover:scale-110">
//                         Home
//                       </h3>
//                     </Link>
//                     {userType == "lawyer" && (
//                       <div
//                         onClick={() => router.push("/lawyer/withdraw")}
//                         className="  hover:text-white rounded-full p-1  hover:opacity-100 transition-opacity "
//                       >
//                         <p className="text-gray-400  hover:text-[#7B3B99] hover:scale-110 duration-300 ">
//                           300 ETB
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </li>

//               <li className="py-4 px-2 rounded-xl m-1 duration-300 hover:scale-110">
//                 {/* <IoPersonCircleSharp className="text-[#7B3B99] w-16 h-12" /> */}
//                 <ProfileDropDown />
//               </li>
//             </ul>
//             <div onClick={handleNav} className="block md:hidden text-black">
//               {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
//             </div>
//           </>
//         ) : (
//           <>
//             <nav className="hidden md:flex items-center gap-8">
//               {[
//                 { name: "Features", id: "features" },
//                 { name: "How It Works", id: "how-it-works" },
//                 { name: "Testimonials", id: "testimonials" },
//                 { name: "FAQ", id: "faq" },
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className="text-sm font-medium relative group transition-colors hover:text-[#7B3B99]"
//                 >
//                   {item.name}
//                   <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7B3B99] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
//                 </button>
//               ))}
//             </nav>

//             <div className="flex items-center gap-4">
              
//               {/* <Link
//               href={"/signin"}
//               className="text-sm font-medium transition-colors hover:text-[#7B3B99] hidden md:block"
//               >
//                 Login
//               </Link> */}
//               <a
//                 href="/signin"
//                 className="text-sm font-medium transition-colors hover:text-[#7B3B99] hidden md:block"
//               >
//                 Login
//               </a>
//               <Button
//                 className=" rounded bg-[#7B3B99] px-8 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring  sm:w-auto cursor-pointer hidden md:block"
//                 onClick={() => router.push("/signup")}
//               >
//                 Sign Up
//               </Button>

//               {/* Mobile Menu Button */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden text-foreground cursor-pointer"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? (
//                   <X className="h-10 w-10 " />
//                 ) : (
//                   <Menu className="h-5 w-5 " />
//                 )}
//               </Button>
//             </div>

//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//               <div
//                 id="mobile-menu"
//                 className="fixed inset-0 top-20 z-40 bg-white border-t md:hidden"
//               >
//                 <nav className="flex flex-col p-4 space-y-4">
//                   {[
//                     { name: "Features", id: "features" },
//                     { name: "How It Works", id: "how-it-works" },
//                     { name: "Testimonials", id: "testimonials" },
//                     { name: "FAQ", id: "faq" },
//                   ].map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => scrollToSection(item.id)}
//                       className="flex justify-start p-3 rounded-lg hover:bg-[#333333]/10 text-lg font-medium w-full text-left text-foreground  cursor-pointer"
//                     >
//                       {item.name}
//                     </button>
//                   ))}
//                   <Link
//                     href="/signin"
//                     className="flex items-center p-3 rounded-lg hover:bg-[#333333]/10 text-lg text-foreground font-medium "
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Button
//                     className="mt-2 w-full bg-[#7B3B99] hover:bg-[#444444]  cursor-pointer"
//                     onClick={() => {
//                       router.push("/signup");
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     Sign Up
//                   </Button>
//                 </nav>
//               </div>
//             )}
//           </>
//         )}
//       </>
//       <ul
//         className={
//           nav
//             ? "backdrop-blur z-50 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#7B3B99]  ease-in-out duration-500"
//             : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
//         }
//       >
//         <h1 className="w-full text-3xl font-bold text-white m-4">EQUILEX</h1>

//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <Link href={"/chat"}>Chat</Link>
//         </li>

//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           {userType == "client" ? (
//             <Link href="/client/lawyers">Lawyers</Link>
//           ) : (
//             <Link href="/lawyer">My Page</Link>
//           )}
//         </li>

//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <Link
//             href={userType === "client" ? "/client/profile" : "/lawyer/profile"}
//           >
//             Profile
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default MainNavbar;











// "use client"

// import { Menu, Scale, X } from "lucide-react"
// import { useSession } from "next-auth/react"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import { useState } from "react"

// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
// import { Button } from "./ui/button"
// import ProfileDropDown from "./profileDropDown"
// import SearchInput from "./searchInput"
// import Notification from "./Notification"
// import ChatDropDown from "./chatDropDown"
// import { Account } from "@/server/user-management/Account"
// import { useQuery } from "@tanstack/react-query"
// import { getLawyerById } from "@/app/admin/api/lawyers"

// const MainNavbar = () => {
//   const [nav, setNav] = useState(false)
//   const { data: session } = useSession()
//   const currentRoute = usePathname()
//   const router = useRouter()
//   const path = usePathname();
//     const [showCase, setShowCase] = useState(false);


//     const toggleShowCase = () => setShowCase((prev) => !prev);


//   //@ts-ignore
//   const userType = session?.user.image.type
//   const lawyer_id = session?.user?.image?.id;


//   const {data:lawyerData, isLoading: lawyerLoading, error: lawyerError}  = useQuery({
//     queryKey: ["lawyer"],
//     queryFn: () => getLawyerById(lawyer_id)
//   })

//   const handleNav = () => setNav(!nav)

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//       setMobileMenuOpen(false)
//     }
//   }

//   const handleLogOut = async() => {
//     await Account.logout()
//   }

//   return (
//     <div className="sticky top-0 bg-background/95 md:backdrop-blur md:text-black z-50 flex justify-between items-center h-20 min-w-screen mx-auto px-4 text-white border ">
//       <div className=" lg:pl-4">
//         <Link className="flex items-center gap-2" href="/" aria-label="EQUILEX Home">
//           <Scale className="h-6 w-6 text-[#333333]" />
//           <h1 className="text-xl md:text-2xl font-bold">
//             <span className="text-[#7B3B99]">EQUI</span>
//             <span className="text-[#2C2C2C]">LEX</span>
//           </h1>
//         </Link>
//       </div>

//       <>
//         {session ? (
//           <>
//             <div className="w-[30%]  md:flex hidden">{userType == "client" ? <SearchInput /> : null}</div>
//             <ul className="hidden md:flex items-center ">
//               <div className="relative p-2 hover:scale-110 duration-300 text-slate-500  ">
//                 <Notification />
//               </div>
//               <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110 ">
//                 <ChatDropDown />
//               </li>

//               <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300   text-slate-500  ">
//                 {currentRoute == "/" ? (
//                   <>
//                     {userType == "client" ? (
//                       <Link href="/client/lawyers">
//                         <h3 className="text-2xl group-hover:font-bolder hover:text-[#7B3B99] duration-300 hover:scale-110">
//                           View Lawyers
//                         </h3>
//                       </Link>
//                     ) : (
//                       <div className="flex gap-4">
//                         <Link href="/lawyer">
//                           <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99] hover:scale-110">
//                             MyPage
//                           </h3>
//                         </Link>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <div className=" flex gap-2 ">
//                     <Link href="/">
//                       <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99] duration-300 hover:scale-110">
//                         Home
//                       </h3>
//                     </Link>
//                     {userType == "lawyer" && (
//                       <div
//                         onClick={() => router.push("/lawyer/withdraw")}
//                         className="  hover:text-white rounded-full p-1  hover:opacity-100 transition-opacity "
//                       >
//                         <p className="text-gray-400  hover:text-[#7B3B99] hover:scale-110 duration-300 ">{lawyerData?.balance} ETB</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </li>

//               <li className="py-4 px-2 rounded-xl m-1 duration-300 hover:scale-110">
//                 {/* <IoPersonCircleSharp className="text-[#7B3B99] w-16 h-12" /> */}
//                 <ProfileDropDown />
//               </li>
//             </ul>
//             <div onClick={handleNav} className="block md:hidden text-black">
//               {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
//             </div>
//           </>
//         ) : (
//           <>
//             <nav className="hidden md:flex items-center gap-8">
//               {[
//                 { name: "Features", id: "features" },
//                 { name: "How It Works", id: "how-it-works" },
//                 { name: "Testimonials", id: "testimonials" },
//                 { name: "FAQ", id: "faq" },
//               ].map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className="text-sm font-medium relative group transition-colors hover:text-[#7B3B99]"
//                 >
//                   {item.name}
//                   <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7B3B99] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
//                 </button>
//               ))}
//             </nav>

//             <div className="flex items-center gap-4">
//               {/* <Link
//               href={"/signin"}
//               className="text-sm font-medium transition-colors hover:text-[#7B3B99] hidden md:block"
//               >
//                 Login
//               </Link> */}
//               <Link
//                 href="/signin"
//                 className="text-sm font-medium transition-colors hover:text-[#7B3B99] hidden md:block"
//               >
//                 Login
//               </Link>
//               <Button
//                 className=" rounded bg-[#7B3B99] px-8 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring sm:w-auto cursor-pointer hidden md:block"
//                 onClick={() => {
//                   router.push("/signup")
//                 }}
//               >
//                 Sign Up
//               </Button>

//               {/* Mobile Menu Button */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden text-foreground cursor-pointer"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? <X className="h-10 w-10 " /> : <Menu className="h-5 w-5 " />}
//               </Button>
//             </div>

//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//               <div id="mobile-menu" className="fixed inset-0 top-20 z-40 bg-white border-t md:hidden">
//                 <nav className="flex flex-col p-4 space-y-4">
//                   {[
//                     { name: "Features", id: "features" },
//                     { name: "How It Works", id: "how-it-works" },
//                     { name: "Testimonials", id: "testimonials" },
//                     { name: "FAQ", id: "faq" },
//                   ].map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => scrollToSection(item.id)}
//                       className="flex justify-start p-3 rounded-lg hover:bg-[#333333]/10 text-lg font-medium w-full text-left text-foreground  cursor-pointer"
//                     >
//                       {item.name}
//                     </button>
//                   ))}
//                   <Link
//                     href="/signin"
//                     className="flex items-center p-3 rounded-lg hover:bg-[#333333]/10 text-lg text-foreground font-medium"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Button
//                     className="mt-2 w-full bg-[#7B3B99] hover:bg-[#444444]  cursor-pointer"
//                     onClick={() => {
//                       router.push("/signup")
//                       setMobileMenuOpen(false)
//                     }}
//                   >
//                     Sign Up
//                   </Button>
//                 </nav>
//               </div>
//             )}
//           </>
//         )}
//       </>
//       <ul
//         className={
//           nav
//             ? "backdrop-blur z-50 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#7B3B99]  ease-in-out duration-500"
//             : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
//         }
//       >
//         <h1 className="w-full text-3xl font-bold text-white m-4">EQUILEX</h1>

//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <Link href={userType === "client" ?"/client/notification": "/lawyer/notification"}>Notification</Link>
//         </li>
//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <Link href={"/chat"}>Chat</Link>
//         </li>



//         <li className="flex flex-col text-white rounded-lg group border-gray-600">
//             <div
//               className="w-full px-2 flex items-center justify-between p-2 rounded-lg hover:bg-[#00df9a] cursor-pointer"
//               onClick={toggleShowCase}
//             >
//               <div className="flex items-center gap-4">
//                 {/* <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" /> */}
//                 <span className=" p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600 whitespace-nowrap">Communicate</span>
//               </div>
//               {/* <Icon
//                 icon={showCase ? "mingcute:up-line" : "mingcute:down-line"}
//                 style={{ color: "black" }}
//               /> */}
//             </div>

//             {showCase && (
//               <ul className="space-y-2 mt-2 pl-4">
//                 <li className={path.startsWith("/chat") ? "bg-[#7B3B99] rounded-xl text-white" : ""}>
//                   <Link
//                     href="/lawyer/completed"
//                     className="flex gap-3 items-center p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black"
//                   >
//                     {/* <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" /> */}
//                     Chat
//                   </Link>
//                 </li>
//                 <li className={path.startsWith("/videoCall") ? "bg-[#7B3B99] rounded-xl text-white" : ""}>
//                   <Link
//                     href="/lawyer/inProgress"
//                     className="flex gap-3 items-center p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black"
//                   >
//                     {/* <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" /> */}
//                     VideoCall
//                   </Link>
//                 </li>
//               </ul>
//             )}
//             <hr />
//           </li>



//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           {userType == "client" ? <Link href="/client/lawyers">Get Lawyers</Link> : <Link href="/lawyer">My Page</Link>}
//         </li>{
//           userType == "client" ? (
//             <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <Link href={"/client/case"}>Cases</Link>
//         </li>
//           ):
//           ""
//         }
        

//         <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <Link href={userType === "client" ? "/client/profile" : "/lawyer/profile"}>Profile</Link>
//         </li>
//         <li onClick={handleLogOut} className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
//           <span >Log Out</span>
//         </li>
//       </ul>
//     </div>
//   )
// }

// export default MainNavbar












"use client"

import { Menu, Scale, X, Bell, MessageCircle, Home, Users, Briefcase, User, LogOut } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import ProfileDropDown from "./profileDropDown"
import SearchInput from "./searchInput"
import Notification from "./Notification"
import ChatDropDown from "./chatDropDown"
import { Account } from "@/server/user-management/Account"
import { useQuery } from "@tanstack/react-query"
import { getLawyerById } from "@/app/admin/api/lawyers"

const MainNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCommunicateExpanded, setIsCommunicateExpanded] = useState(false)
  const { data: session } = useSession()
  const currentRoute = usePathname()
  const router = useRouter()
  const [isLandingMenuOpen, setIsLandingMenuOpen] = useState(false)

  // @ts-ignore
  const userType = session?.user.image.type
  const lawyer_id = session?.user?.image?.id

  const {
    data: lawyerData,
    isLoading: lawyerLoading,
    error: lawyerError,
  } = useQuery({
    queryKey: ["lawyer"],
    queryFn: () => getLawyerById(lawyer_id),
  })

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleCommunicate = () => setIsCommunicateExpanded(!isCommunicateExpanded)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsLandingMenuOpen(false)
    }
  }

  const handleLogOut = async () => {
    await Account.logout()
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Mobile menu items for authenticated users
  const authenticatedMobileMenuItems = [
    {
      icon: Bell,
      label: "Notifications",
      href: userType === "client" ? "/client/notification" : "/lawyer/notification",
    },
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/chat",
    },
    {
      icon: userType === "client" ? Users : Home,
      label: userType === "client" ? "Find Lawyers" : "My Page",
      href: userType === "client" ? "/client/lawyers" : "/lawyer",
    },
    ...(userType === "client"
      ? [
          {
            icon: Briefcase,
            label: "My Cases",
            href: "/client/case",
          },
        ]
      : []),
    {
      icon: User,
      label: "Profile",
      href: userType === "client" ? "/client/profile" : "/lawyer/profile",
    },
  ]

  // Landing page navigation items
  const landingNavItems = [
    { name: "Features", id: "features" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Testimonials", id: "testimonials" },
    { name: "FAQ", id: "faq" },
  ]

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="flex justify-between items-center h-20 max-w-7xl mx-auto px-4">
        {/* Logo */}
        <Link
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          href="/"
          aria-label="EQUILEX Home"
        >
          <Scale className="h-6 w-6 text-foreground" />
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-[#7B3B99]">EQUI</span>
            <span className="text-foreground">LEX</span>
          </h1>
        </Link>

        {session ? (
          <>
            {/* Search Bar - Desktop Only */}
            {userType === "client" && (
              <div className="hidden md:flex w-[30%]">
                <SearchInput />
              </div>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <div className="p-2 hover:scale-105 transition-transform">
                <Notification />
              </div>

              <div className="p-2 hover:scale-105 transition-transform">
                <ChatDropDown />
              </div>

              <div className="flex items-center gap-4 px-2">
                {currentRoute === "/" ? (
                  userType === "client" ? (
                    <Link
                      href="/client/lawyers"
                      className="text-sm font-medium hover:text-[#7B3B99] transition-colors hover:scale-105 transform duration-200"
                    >
                      View Lawyers
                    </Link>
                  ) : (
                    <Link
                      href="/lawyer"
                      className="text-sm font-medium hover:text-[#7B3B99] transition-colors hover:scale-105 transform duration-200"
                    >
                      My Page
                    </Link>
                  )
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/"
                      className="text-sm font-medium hover:text-[#7B3B99] transition-colors hover:scale-105 transform duration-200"
                    >
                      Home
                    </Link>
                    {userType === "lawyer" && lawyerData?.balance && (
                      <button
                        onClick={() => router.push("/lawyer/withdraw")}
                        className="text-sm text-muted-foreground hover:text-[#7B3B99] transition-colors hover:scale-105 transform duration-200"
                      >
                        {lawyerData.balance} ETB
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="p-2 hover:scale-105 transition-transform">
                <ProfileDropDown />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </>
        ) : (
          <>
            {/* Landing Page Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {landingNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium relative group transition-colors hover:text-[#7B3B99]"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7B3B99] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </button>
              ))}
            </nav>

            {/* Landing Page Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-sm font-medium transition-colors hover:text-[#7B3B99] hidden md:block"
              >
                Login
              </Link>
              <Button
                className="hidden md:block bg-[#7B3B99] hover:bg-[#6A2C85] text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>

              {/* Mobile Menu Button for Landing */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsLandingMenuOpen(!isLandingMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isLandingMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Landing Page Mobile Menu */}
            {isLandingMenuOpen && (
              <div className="fixed inset-0 top-20 z-40 bg-white border-t md:hidden">
                <nav className="flex flex-col p-6 space-y-4">
                  {landingNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex justify-start p-3 rounded-lg hover:bg-muted text-lg font-medium w-full text-left transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                  <Link
                    href="/signin"
                    className="flex items-center p-3 rounded-lg hover:bg-muted text-lg font-medium transition-colors"
                    onClick={() => setIsLandingMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Button
                    className="mt-2 w-full bg-[#7B3B99] hover:bg-[#6A2C85] text-white"
                    onClick={() => {
                      router.push("/signup")
                      setIsLandingMenuOpen(false)
                    }}
                  >
                    Sign Up
                  </Button>
                </nav>
              </div>
            )}
          </>
        )}

        {/* Authenticated User Mobile Menu */}
        {session && (
          <div
            className={cn(
              "fixed top-0 left-0 h-full w-80 bg-background border-r border-border shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Scale className="h-6 w-6 text-[#7B3B99]" />
                <h2 className="text-xl font-bold">
                  <span className="text-[#7B3B99]">EQUI</span>
                  <span className="text-foreground">LEX</span>
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={closeMobileMenu} aria-label="Close mobile menu">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu Content */}
            <nav className="flex flex-col p-6 space-y-2 bg-white  ">
              {/* Search for clients */}
              {userType === "client" && (
                <div className="mb-4">
                  <SearchInput />
                </div>
              )}

              {/* Main Navigation Items */}
              {authenticatedMobileMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-[#7B3B99] transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Communication Submenu */}
              <div className="space-y-2">
                <button
                  onClick={toggleCommunicate}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-[#7B3B99] transition-colors" />
                    <span className="font-medium">Communication</span>
                  </div>
                  <X
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isCommunicateExpanded ? "rotate-45" : "rotate-0",
                    )}
                  />
                </button>

                {isCommunicateExpanded && (
                  <div className="ml-8 space-y-1">
                    <Link
                      href="/chat"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      Chat
                    </Link>
                    <Link
                      href="/videoCall"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Video Call
                    </Link>
                  </div>
                )}
              </div>

              {/* Lawyer Balance */}
              {userType === "lawyer" && lawyerData?.balance && (
                <button
                  onClick={() => {
                    router.push("/lawyer/withdraw")
                    closeMobileMenu()
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <Scale className="h-5 w-5 text-muted-foreground group-hover:text-[#7B3B99] transition-colors" />
                  <span className="font-medium">Balance: {lawyerData.balance} ETB</span>
                </button>
              )}

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors group mt-4 border-t border-border pt-6"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </nav>
          </div>
        )}

        {/* Overlay */}
        {(isMobileMenuOpen || isLandingMenuOpen) && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsLandingMenuOpen(false)
            }}
          />
        )}
      </div>
    </header>
  )
}

export default MainNavbar
