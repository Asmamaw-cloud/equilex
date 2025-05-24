// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import { FaBriefcase } from "react-icons/fa";
// import { Icon } from "@iconify/react";


// const LawyerSidebar = () => {
//   const path = usePathname();

//   const [showCase, setShowCase] = useState(false);

//   const toggleShowCase = () => {
//     setShowCase((prev) => !prev);
//   };

//   return (
//     <div className="fixed  left-0  w-56 p-2 h-screen  z-10   bg-white border-r border-gray-200   transition-transform -translate-x-full  lg:translate-x-0 ">
//       <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
//         <ul className="space-y-2 font-medium mt-10">
//           <li
//           className={
//             path.endsWith("/lawyer")
//               ? "bg-[#7B3B99] rounded-xl text-white"
//               : ""
//           }
//           >
//             <Link 
//             href="/lawyer"
//             className="flex items-center  text-gray-600  gap-4  p-2 rounded-lg hover:bg-[#f0f0f0]  hover:text-black group"
//             >
//               <svg
//                 className={
//                   path.endsWith("/admin")
//                     ? "text-white w-5 h-5  transition duration-75"
//                     : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
//                 }
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 21"
//               >
//                 <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                 <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//               </svg>
//               <span
//                 className={
//                   path.endsWith("/lawyer") ? "text-white ms-3 " : "ms-3"
//                 }
//               >
//                 Dashboard
//               </span>
//             </Link>
//             <hr />
//           </li>

//           <li className="flex flex-col items-center py-4 text-gray-900 rounded-lg   dark:hover:bg-[#d9a1f3] group ">
//               <div className="w-full px-2 flex items-center justify-between  text-gray-700   p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black group">
//                 <Link href="/lawyer/cases" className="flex gap-4 items-center ">
//                   <div className="flex items-center gap-4">
//                     <FaBriefcase
//                       className={
//                         path.startsWith("/lawyer/cases")
//                           ? "text-white w-5 h-5  transition duration-75"
//                           : "text-gray-500 text-2xl w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white"
//                       }
//                     />

//                     <span
//                       className={
//                         path.startsWith("/lawyer/clients")
//                           ? "text-white flex-1 ms-3 whitespace-nowrap"
//                           : "flex-1  whitespace-nowrap"
//                       }
//                     >
//                       Cases
//                     </span>
//                   </div>
//                 </Link>

//                 {showCase &&  path.startsWith("/lawyer/") ? (
//                   <div onClick={toggleShowCase} className="cursor-pointer">
//                     <Icon icon="mingcute:up-line" style={{ color: "black" }} />
//                   </div>
//                 ) : (
//                   <div onClick={toggleShowCase} className="cursor-pointer">
//                     <Icon
//                       icon="mingcute:down-line"
//                       style={{ color: "black" }}
//                     />
//                   </div>
//                 )}
//               </div>
//               <hr />
//               {showCase ||  path.startsWith("/lawyer/") ? (
//                 <ul className="space-y-2 font-medium mt-2">
//                   <li
//                     className={
//                       path.startsWith("/lawyer/complated")
//                         ? "bg-[#7B3B99] rounded-xl  text-white"
//                         : "text-gray-900"
//                     }
//                   >
//                     <Link
//                       href="/lawyer/complated"
//                       className="flex gap-4 items-center  px-4 py-2 rounded-lg hover:bg-[#f0f0f0] hover:text-gray-500 group"
//                     >
//                       <FaBriefcase
//                         className={
//                           path.startsWith("/lawyer/complated")
//                             ? "text-white w-5 h-5  transition duration-75"
//                             : "text-gray-500 text-2xl w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white"
//                         }
//                       />
//                       Completed
//                     </Link>
//                   </li>
//                   <hr />

//                   <li
//                     className={
//                       path.startsWith("/lawyer/InProgress")
//                         ? "bg-[#7B3B99] rounded-xl  text-white"
//                         : "text-gray-900"
//                     }
//                   >
//                     <Link
//                       href="/lawyer/InProgress"
//                       className=" flex gap-4 items-center  p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black group"
//                     >
//                       <FaBriefcase
//                         className={
//                           path.startsWith("/lawyer/InProgress")
//                             ? "text-white w-5 h-5  transition duration-75"
//                             : "text-gray-500 text-2xl w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white"
//                         }
//                       />
//                       In-progress  
//                     </Link>
//                   </li>
//                 </ul>
//               ) : (
//                 ""
//               )}

//               <hr />
//             </li>
//             <hr />
//             <li
//               className={
//                 path.startsWith("/admin/signOut")
//                   ? "bg-[#7B3B99] rounded-xl text-white"
//                   : ""
//               }
//             >
//               <Link
//                 href=""
//                 className="flex items-center  text-gray-900  py-2 px-4 rounded-lg hover:bg-[#f3f3f3] hover:text-gray-500 group"
//               >
//                 <svg
//                   className={
//                     path.startsWith("/admin/signOut")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
//                   }
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 18 16"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
//                   />
//                 </svg>
//                 <span
//                   className={
//                     path.startsWith("/admin/signOut")
//                       ? "text-white flex-1 ms-3 whitespace-nowrap"
//                       : "flex-1 ms-3 whitespace-nowrap"
//                   }
//                 >
//                   Sign Out
//                 </span>
//               </Link>
//               <hr />
//             </li>

//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LawyerSidebar;





// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Icon } from "@iconify/react";
// import { useState } from "react";
// import { FaBriefcase} from "react-icons/fa";

// const LawyerSideBar = () => {
//   const [showCase, setShowCase] = useState(false);

//   const toggleShowCase = () => {
//     setShowCase((prev) => !prev);
//   };
//   const path = usePathname();
//   return (
//     <>
//       {/* <aside
//         id="logo-sidebar"
//         className="fixed  left-0 z-40 w-56 p-2 h-screen  mt-4 ml-4   bg-white border-r border-gray-200 "
//         aria-label="Sidebar"
//       > */}
//       <div className="fixed  left-0  w-56 p-2 h-screen  z-10   bg-white border-r border-gray-200   transition-transform -translate-x-full  lg:translate-x-0 ">
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
//           <ul className="space-y-2 font-medium mt-10">
//             <li
//               className={
//                 path.endsWith("/lawyer")
//                   ? "bg-[#7B3B99] rounded-xl text-white"
//                   : ""
//               }
//             >
//               <Link
//                 href="/lawyer"
//                 className="flex items-center  text-gray-600  gap-4  p-2 rounded-lg hover:bg-[#f0f0f0]  hover:text-black group"
//               >
//                 <svg
//                   className={
//                     path.endsWith("/admin")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-white"
//                   }
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span
//                   className={
//                     path.endsWith("/lawyer") ? "text-white ms-3 " : "ms-3"
//                   }
//                 >
//                   Dashboard
//                 </span>
//               </Link>
//               <hr />
//             </li>

//             <li className="flex flex-col items-center py-4 text-gray-900 rounded-lg   dark:hover:bg-[#d9a1f3] group ">
//               <div className="w-full px-2 flex items-center justify-between  text-gray-700   p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black group">
//                 <Link href="/lawyer/cases" className="flex gap-4 items-center ">
//                   <div className="flex items-center gap-4">
//                     <FaBriefcase
//                       className={
//                         path.startsWith("/lawyer/cases")
//                           ? "text-white w-5 h-5  transition duration-75"
//                           : "text-gray-500 text-2xl w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white"
//                       }
//                     />

//                     <span
//                       className={
//                         path.startsWith("/lawyer/clients")
//                           ? "text-white flex-1 ms-3 whitespace-nowrap"
//                           : "flex-1  whitespace-nowrap"
//                       }
//                     >
//                       Cases
//                     </span>
//                   </div>
//                 </Link>

//                 {showCase &&  path.startsWith("/lawyer/") ? (
//                   <div onClick={toggleShowCase} className="cursor-pointer">
//                     <Icon icon="mingcute:up-line" style={{ color: "black" }} />
//                   </div>
//                 ) : (
//                   <div onClick={toggleShowCase} className="cursor-pointer">
//                     <Icon
//                       icon="mingcute:down-line"
//                       style={{ color: "black" }}
//                     />
//                   </div>
//                 )}
//               </div>
//               <hr />
//               {showCase ||  path.startsWith("/lawyer/") ? (
//                 <ul className="space-y-2 font-medium mt-2">
//                   <li
//                     className={
//                       path.startsWith("/lawyer/complated")
//                         ? "bg-[#7B3B99] rounded-xl  text-white"
//                         : "text-gray-900"
//                     }
//                   >
//                     <Link
//                       href="/lawyer/completed"
//                       className="flex gap-4 items-center  px-4 py-2 rounded-lg hover:bg-[#f0f0f0] hover:text-gray-500 group"
//                     >
//                       <FaBriefcase
//                         className={
//                           path.startsWith("/lawyer/complated")
//                             ? "text-white w-5 h-5  transition duration-75"
//                             : "text-gray-500 text-2xl w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white"
//                         }
//                       />
//                       Completed
//                     </Link>
//                   </li>
//                   <hr />

//                   <li
//                     className={
//                       path.startsWith("/lawyer/InProgress")
//                         ? "bg-[#7B3B99] rounded-xl  text-white"
//                         : "text-gray-900"
//                     }
//                   >
//                     <Link
//                       href="/lawyer/inProgress"
//                       className=" flex gap-4 items-center  p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black group"
//                     >
//                       <FaBriefcase
//                         className={
//                           path.startsWith("/lawyer/InProgress")
//                             ? "text-white w-5 h-5  transition duration-75"
//                             : "text-gray-500 text-2xl w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white"
//                         }
//                       />
//                       In-progress  
//                     </Link>
//                   </li>
//                 </ul>
//               ) : (
//                 ""
//               )}

//               <hr />
//             </li>
//             <hr />

//             <li
//               className={
//                 path.startsWith("/admin/signOut")
//                   ? "bg-[#7B3B99] rounded-xl text-white"
//                   : ""
//               }
//             >
//               <Link
//                 href=""
//                 className="flex items-center  text-gray-900  py-2 px-4 rounded-lg hover:bg-[#f3f3f3] hover:text-gray-500 group"
//               >
//                 <svg
//                   className={
//                     path.startsWith("/admin/signOut")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
//                   }
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 18 16"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
//                   />
//                 </svg>
//                 <span
//                   className={
//                     path.startsWith("/admin/signOut")
//                       ? "text-white flex-1 ms-3 whitespace-nowrap"
//                       : "flex-1 ms-3 whitespace-nowrap"
//                   }
//                 >
//                   Sign Out
//                 </span>
//               </Link>
//               <hr />
//             </li>
//           </ul>
//         </div>
//       </div>
//       {/* </aside> */}
//     </>
//   );
// };

// export default LawyerSideBar;









// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Icon } from "@iconify/react";
// import { useState } from "react";
// import { FaBriefcase } from "react-icons/fa";
// import { Account } from "@/server/user-management/Account";

// const LawyerSideBar = () => {
//   const [showCase, setShowCase] = useState(false);
//   const path = usePathname();

//   const toggleShowCase = () => setShowCase((prev) => !prev);

//    const handleLogOut = async () => {
//       await Account.logout()
//     }

//   return (
//     <div className="fixed left-0 w-56 p-2 h-screen z-10 bg-white border-r border-gray-200 lg:translate-x-0">
//       <div className="h-full px-3 pb-4 overflow-y-auto">
//         <ul className="space-y-2 font-medium mt-10">

//           {/* Dashboard */}
//           <li >
//             <Link
//               href="/lawyer"
//               className={path.endsWith("/lawyer") ? " flex items-center gap-4 p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black  group bg-[#7B3B99] text-white" : "flex items-center gap-4 p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black text-gray-600 group"}
//               // className="flex items-center gap-4 p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black text-gray-600 group"
//             >
//               <svg
//                 className="w-5 h-5 text-gray-600 group-hover:text-gray-700"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 22 21"
//               >
//                 <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066Z" />
//                 <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//               </svg>
//               <span className="ms-3">Dashboard</span>
//             </Link>
//             <hr />
//           </li>

//           {/* Cases Section */}
//           <li className="flex flex-col text-gray-900 rounded-lg group">
//             <div
//               className="w-full px-2 flex items-center justify-between p-2 rounded-lg hover:bg-[#f0f0f0] cursor-pointer"
//               onClick={toggleShowCase}
//             >
//               <div className="flex items-center gap-4">
//                 <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" />
//                 <span className="whitespace-nowrap">Cases</span>
//               </div>
//               <Icon
//                 icon={showCase ? "mingcute:up-line" : "mingcute:down-line"}
//                 style={{ color: "black" }}
//               />
//             </div>

//             {showCase && (
//               <ul className="space-y-2 mt-2 pl-4">
//                 <li className={path.startsWith("/lawyer/completed") ? "bg-[#7B3B99] rounded-xl text-white" : ""}>
//                   <Link
//                     href="/lawyer/completed"
//                     className="flex gap-3 items-center p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black"
//                   >
//                     <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" />
//                     Completed
//                   </Link>
//                 </li>
//                 <li className={path.startsWith("/lawyer/inProgress") ? "bg-[#7B3B99] rounded-xl text-white" : ""}>
//                   <Link
//                     href="/lawyer/inProgress"
//                     className="flex gap-3 items-center p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black"
//                   >
//                     <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" />
//                     In Progress
//                   </Link>
//                 </li>
//               </ul>
//             )}
//             <hr />
//           </li>

//           {/* Sign Out */}
//           <li className={path.startsWith("/admin/signOut") ? "bg-[#7B3B99] rounded-xl text-white" : "flex flex-col text-gray-900 rounded-lg group cursor-pointer"}>
//             <button
//               onClick={handleLogOut}
//               className="flex items-center gap-4 py-2 px-2 rounded-lg hover:bg-[#f3f3f3] hover:text-gray-500 text-gray-900"
//             >
//               <svg
//                 className="w-5 h-5 text-gray-500 group-hover:text-gray-600"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 16"
                
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
//                 />
//               </svg>
//               <span className="ms-3">Sign Out</span>
//             </button>
//             <hr />
//           </li>

//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LawyerSideBar;








import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBriefcase } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import { signOut } from 'next-auth/react';

interface LawyerSideBarProps {
  showCase: boolean;
  toggleShowCase: () => void;
}

const LawyerSideBar: React.FC<LawyerSideBarProps> = ({ showCase, toggleShowCase }) => {
  const { pathname } = useRouter();
  const path = pathname;

  const handleLogOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/';
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 md:hidden bg-white border border-gray-200 rounded-lg p-2 shadow-lg"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <Icon icon="mingcute:close-line" className="w-6 h-6 text-gray-600" />
        ) : (
          <Icon icon="mingcute:menu-line" className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 w-56 p-2 h-screen z-40 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium mt-10">
            {/* Dashboard */}
            <li>
              <Link
                href="/lawyer"
                onClick={() => setIsMobileMenuOpen(false)}
                className={path.endsWith("/lawyer") ? " flex items-center gap-4 p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black  group bg-[#7B3B99] text-white" : "flex items-center gap-4 p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black text-gray-600 group"}
              >
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
              <hr />
            </li>

            {/* Cases Section */}
            <li className="flex flex-col text-gray-900 rounded-lg group">
              <div
                className="w-full px-2 flex items-center justify-between p-2 rounded-lg hover:bg-[#f0f0f0] cursor-pointer"
                onClick={toggleShowCase}
              >
                <div className="flex items-center gap-4">
                  <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" />
                  <span className="whitespace-nowrap">Cases</span>
                </div>
                <Icon
                  icon={showCase ? "mingcute:up-line" : "mingcute:down-line"}
                  style={{ color: "black" }}
                />
              </div>

              {showCase && (
                <ul className="space-y-2 mt-2 pl-4">
                  <li className={path.startsWith("/lawyer/completed") ? "bg-[#7B3B99] rounded-xl text-white" : ""}>
                    <Link
                      href="/lawyer/completed"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex gap-3 items-center p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black"
                    >
                      <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" />
                      Completed
                    </Link>
                  </li>
                  <li className={path.startsWith("/lawyer/inProgress") ? "bg-[#7B3B99] rounded-xl text-white" : ""}>
                    <Link
                      href="/lawyer/inProgress"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex gap-3 items-center p-2 rounded-lg hover:bg-[#f0f0f0] hover:text-black"
                    >
                      <FaBriefcase className="text-gray-500 w-5 h-5 group-hover:text-gray-600" />
                      In Progress
                    </Link>
                  </li>
                </ul>
              )}
              <hr />
            </li>

            {/* Sign Out */}
            <li className={path.startsWith("/admin/signOut") ? "bg-[#7B3B99] rounded-xl text-white" : "flex flex-col text-gray-900 rounded-lg group cursor-pointer"}>
              <button
                onClick={() => {
                  handleLogOut();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 py-2 px-2 rounded-lg hover:bg-[#f3f3f3] hover:text-gray-500 text-gray-900"
              >
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="ms-3">Sign Out</span>
              </button>
              <hr />
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default LawyerSideBar;