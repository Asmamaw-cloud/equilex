

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
      name: "Transaction",
      href: "/admin/transaction",
      icon: DollarSign,
      exact: false,
    },
    // {
    //   name: "Withdraw",
    //   href: "/admin/withdraw",
    //   icon: CreditCard,
    //   exact: false,
    // },
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
