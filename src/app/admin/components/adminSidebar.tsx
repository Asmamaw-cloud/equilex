// import { Account } from "@/server/user-management/Account";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface props {
//   isVisible: boolean;
// }

// const AdminSidebar: React.FC<props> = ({ isVisible }) => {
//   const path = usePathname();

//   const handleLogout = async () => {
//     await Account.logout();
//   };

//   return (
//     <>
//       <div
//         className={`fixed top-20 lg:top-0 left-0 z-40 w-56 p-2 h-[94vh] shadow-lg mt-4 ml-4 rounded-2xl transition-transform transform ${
//           isVisible ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 bg-white border-r border-gray-200`}
//       >
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
//           <h1 className="font-bold text-3xl mt-3 self-center text-[#7B3B99]">
//             EQUI<span className="text-black">LEX</span>
//           </h1>
//           <ul className="space-y-2 font-medium mt-10">
//             <li
//               className={
//                 path.endsWith("/admin")
//                   ? "bg-[#7B3B99] rounded-xl text-white"
//                   : ""
//               }
//             >
//               <Link
//                 href="/admin"
//                 className="flex items-center p-4 text-gray-900 rounded-lg   dark:hover:bg-[#d9a1f3] group"
//               >
//                 <svg
//                   className={
//                     path.endsWith("/admin")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
//                     path.endsWith("/admin") ? "text-white ms-3" : "ms-3"
//                   }
//                 >
//                   Dashboard
//                 </span>
//               </Link>
//               <hr />
//             </li>
//             <li
//               className={
//                 path.startsWith("/admin/clients")
//                   ? "bg-[#7B3B99] rounded-xl  text-black"
//                   : ""
//               }
//             >
//               <Link
//                 href="/admin/clients"
//                 className="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-[#d9a1f3] group"
//               >
//                 <svg
//                   className={
//                     path.startsWith("/admin/clients")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   }
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 18"
//                 >
//                   <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                 </svg>
//                 <span
//                   className={
//                     path.startsWith("/admin/clients")
//                       ? "text-white flex-1 ms-3 whitespace-nowrap"
//                       : "flex-1 ms-3 whitespace-nowrap"
//                   }
//                 >
//                   Clients
//                 </span>
//               </Link>
//               <hr />
//             </li>
//             <li
//               className={
//                 path.startsWith("/admin/lawyers")
//                   ? "bg-[#7B3B99] rounded-xl text-black"
//                   : ""
//               }
//             >
//               <Link
//                 href="/admin/lawyers"
//                 className="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-[#d9a1f3] group"
//               >
//                 <svg
//                   className={
//                     path.startsWith("/admin/lawyers")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
//                   }
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 18"
//                 >
//                   <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                 </svg>
//                 <span
//                   className={
//                     path.startsWith("/admin/lawyers")
//                       ? "text-white flex-1 ms-3 whitespace-nowrap"
//                       : "flex-1 ms-3 whitespace-nowrap"
//                   }
//                 >
//                   Lawyers
//                 </span>
//               </Link>
//               <hr />
//             </li>

//             <li
//               className={
//                 path.startsWith("/admin/transaction")
//                   ? "bg-[#7B3B99] rounded-xl  text-black"
//                   : ""
//               }
//             >
//               <Link
//                 href="/admin/transaction"
//                 className="flex items-center p-4 text-gray-900 rounded-lg   hover:bg-[#d9a1f3] group"
//               >
//                 <svg
//                   className={
//                     path.startsWith("/admin/lawyers")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
//                   }
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="1em"
//                   height="1em"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M11.75 16h.725v-.8q.7-.1 1.188-.575t.487-1.225q0-.65-.5-1.088T12.5 11.6V9.75q.25.075.413.25t.237.425l.9-.375q-.175-.525-.6-.837T12.5 8.8V8h-.75v.775q-.7.075-1.187.513t-.488 1.162q0 .675.513 1.125t1.162.725v1.975q-.4-.125-.675-.425t-.375-.7l-.875.375q.2.7.7 1.15t1.225.55zm.75-1.75V12.6q.275.125.488.3t.212.525q0 .4-.2.563t-.5.262m-.75-2.975q-.275-.125-.5-.3t-.225-.525t.225-.513t.5-.212zM8 19q-2.925 0-4.962-2.037T1 12t2.038-4.962T8 5h8q2.925 0 4.963 2.038T23 12t-2.037 4.963T16 19z"
//                   />
//                 </svg>
//                 <span
//                   className={
//                     path.startsWith("/admin/transaction")
//                       ? "text-white flex-1 ms-3 whitespace-nowrap"
//                       : "flex-1 ms-3 whitespace-nowrap"
//                   }
//                 >
//                   Finance
//                 </span>
//               </Link>
//               <hr />
//             </li>

//             <li
//               className={
//                 path.startsWith("/admin/withdraw")
//                   ? "bg-[#7B3B99] rounded-xl  text-black"
//                   : ""
//               }
//             >
//               <Link
//                 href="/admin/withdraw"
//                 className="flex items-center p-4 text-gray-900 rounded-lg   hover:bg-[#d9a1f3] group"
//               >
//                 <svg
//                   className={
//                     path.startsWith("/admin/withdraw")
//                       ? "text-white w-5 h-5  transition duration-75"
//                       : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
//                   }
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="1em"
//                   height="1em"
//                   viewBox="0 0 256 256"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M236 198.65V240a12 12 0 0 1-24 0v-41.35A70.66 70.66 0 0 0 196 154v48.27a12 12 0 0 1-22 6.57l-10.67-16.3a7 7 0 0 1-.36-.58a8 8 0 0 0-14 7.77l22 33.66a12 12 0 1 1-20.08 13.14l-22.26-34c-.12-.19-.24-.38-.35-.58A32 32 0 0 1 172 168.3V68h-8a12 12 0 0 1 0-24h12a20 20 0 0 1 20 20v57.52a94.91 94.91 0 0 1 40 77.13M88 56a12 12 0 0 0-12-12H64a20 20 0 0 0-20 20v136a12 12 0 0 0 24 0V68h8a12 12 0 0 0 12-12m68.49 60.48a12 12 0 0 0-17-17L132 107V16a12 12 0 0 0-24 0v91l-7.51-7.52a12 12 0 0 0-17 17l28 28a12 12 0 0 0 17 0Z"
//                   />
//                 </svg>
//                 <span
//                   className={
//                     path.startsWith("/admin/withdraw")
//                       ? "text-white flex-1 ms-3 whitespace-nowrap"
//                       : "flex-1 ms-3 whitespace-nowrap"
//                   }
//                 >
//                   Withdraw
//                 </span>
//               </Link>
//               <hr />
//             </li>

//             <li
//               className={
//                 path.startsWith("/admin/signOut")
//                   ? "bg-[#7B3B99] rounded-xl text-white"
//                   : ""
//               }
//             >
//               <Link
//                 href=""
//                 className="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-[#d9a1f3] group"
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
//                   onClick={handleLogout}
//                 >
//                   Sign Out
//                 </span>
//               </Link>

//               <hr />
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;




// "use client"

// import type React from "react"

// import { Account } from "@/server/user-management/Account"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { LayoutDashboard, Users, UserCog, DollarSign, CreditCard, LogOut, ChevronRight } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface Props {
//   isVisible: boolean
// }

// const AdminSidebar: React.FC<Props> = ({ isVisible }) => {
//   const path = usePathname()

//   const handleLogout = async () => {
//     await Account.logout()
//   }

//   const navItems = [
//     {
//       name: "Dashboard",
//       href: "/admin",
//       icon: LayoutDashboard,
//       exact: true,
//     },
//     {
//       name: "Clients",
//       href: "/admin/clients",
//       icon: Users,
//       exact: false,
//     },
//     {
//       name: "Lawyers",
//       href: "/admin/lawyers",
//       icon: UserCog,
//       exact: false,
//     },
//     {
//       name: "Finance",
//       href: "/admin/transaction",
//       icon: DollarSign,
//       exact: false,
//     },
//     {
//       name: "Withdraw",
//       href: "/admin/withdraw",
//       icon: CreditCard,
//       exact: false,
//     },
//   ]

//   const isActive = (item: (typeof navItems)[0]) => {
//     if (item.exact) {
//       return path === item.href
//     }
//     return path.startsWith(item.href)
//   }

//   return (
//     <div
//       className={`fixed top-20 lg:top-20 left-0 z-40 w-56 p-2 h-[94vh] shadow-lg mt-4 ml-4 rounded-2xl transition-transform transform ${
//         isVisible ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0 bg-white border-r border-gray-200`}
//     >
//       <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
//         <h1 className="font-bold text-3xl mt-3 text-center text-[#7B3B99]">
//           EQUI<span className="text-black">LEX</span>
//         </h1>

//         <ul className="space-y-2 font-medium mt-10">
//           {navItems.map((item) => (
//             <li key={item.name} className={cn("rounded-xl overflow-hidden", isActive(item) ? "bg-[#7B3B99]" : "")}>
//               <Link
//                 href={item.href}
//                 className={cn(
//                   "flex items-center p-4 rounded-lg group",
//                   isActive(item) ? "text-white" : "text-gray-900 hover:bg-[#d9a1f3]",
//                 )}
//               >
//                 <item.icon
//                   className={cn(
//                     "w-5 h-5 mr-3 transition duration-75",
//                     isActive(item) ? "text-white" : "text-gray-500 group-hover:text-gray-900",
//                   )}
//                 />
//                 <span>{item.name}</span>
//                 {isActive(item) && <ChevronRight size={16} className="ml-auto" />}
//               </Link>
//               <hr className="mt-1" />
//             </li>
//           ))}

//           <li>
//             <button
//               onClick={handleLogout}
//               className="flex w-full items-center p-4 text-gray-900 rounded-lg hover:bg-[#d9a1f3] group"
//             >
//               <LogOut className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 mr-3" />
//               <span>Sign Out</span>
//             </button>
//             <hr className="mt-1" />
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default AdminSidebar





"use client"

import type React from "react"

import { Account } from "@/server/user-management/Account"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, UserCog, DollarSign, CreditCard, LogOut, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { FaQuestion } from "react-icons/fa"

interface Props {
  isVisible: boolean
}

const AdminSidebar: React.FC<Props> = ({ isVisible }) => {
  const path = usePathname()

  const handleLogout = async () => {
    await Account.logout()
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: Users,
      exact: false,
    },
    {
      name: "Lawyers",
      href: "/admin/lawyers",
      icon: UserCog,
      exact: false,
    },
    {
      name: "Finance",
      href: "/admin/transaction",
      icon: DollarSign,
      exact: false,
    },
    {
      name: "Withdraw",
      href: "/admin/withdraw",
      icon: CreditCard,
      exact: false,
    },
    {
      name: "Add FAQ",
      href: "/admin/faq",
      icon: FaQuestion,
      exact: false
    }
  ]

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return path === item.href
    }
    return path.startsWith(item.href)
  }

  return (
    <div
      className={`fixed top-20 lg:top-20 left-0 z-40 w-56 p-2 h-[94vh] shadow-lg mt-4 ml-4 rounded-2xl transition-transform transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 bg-white border-r border-gray-200`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <h1 className="font-bold text-3xl mt-3 text-center text-[#7B3B99]">
          EQUI<span className="text-black">LEX</span>
        </h1>

        <ul className="space-y-2 font-medium mt-10">
          {navItems.map((item) => (
            <li key={item.name} className={cn("rounded-xl overflow-hidden", isActive(item) ? "bg-[#7B3B99]" : "")}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-4 rounded-lg group",
                  isActive(item) ? "text-white" : "text-gray-900 hover:bg-[#d9a1f3]",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 mr-3 transition duration-75",
                    isActive(item) ? "text-white" : "text-gray-500 group-hover:text-gray-900",
                  )}
                />
                <span>{item.name}</span>
                {isActive(item) && <ChevronRight size={16} className="ml-auto" />}
              </Link>
              <hr className="mt-1" />
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center p-4 text-gray-900 rounded-lg hover:bg-[#d9a1f3] group"
            >
              <LogOut className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 mr-3" />
              <span>Sign Out</span>
            </button>
            <hr className="mt-1" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSidebar
