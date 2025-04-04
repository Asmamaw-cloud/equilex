"use client";

import { useNotifications } from "@/app/context/NotificationContext";
import ProfileDropDown from "@/components/profileDropDown";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<Props> = ({ toggleSidebar }) => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const { lawyerNotifications, fetchNotifications } = useNotifications();

  console.log(
    "Lawyer Notification: ",
    lawyerNotifications,
    "and the function: ",
    fetchNotifications
  );

  useEffect(() => {
    fetchNotifications(); // Fetch notifications when the component mounts
  }, [fetchNotifications]);

  const notifications = [
    { href: "/admin/FAQ", label: "FAQ", count: 3 },
    { href: "/admin/manage", label: "LAWYERS", count: lawyerNotifications },
    { href: "/admin/dispute", label: "DISPUTE", count: 12 },
  ];

  return (
    <div className="fixed top-4 left-10 lg:left-72 right-10 lg:mx-auto rounded-xl shadow-lg z-40 p-2 w-[95vw] lg:w-[80vw] bg-white border-gray-200">
      <div className="flex items-center justify-between mx-auto">
        {/* Sidebar Toggle */}
        <div
          onClick={toggleSidebar}
          className="flex gap-4 items-center cursor-pointer"
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 12C0.716667 12 0.479333 11.904 0.288 11.712C0.0960001 11.5207 0 11.2833 0 11C0 10.7167 0.0960001 10.4793 0.288 10.288C0.479333 10.096 0.716667 10 1 10H17C17.2833 10 17.5207 10.096 17.712 10.288C17.904 10.4793 18 10.7167 18 11C18 11.2833 17.904 11.5207 17.712 11.712C17.5207 11.904 17.2833 12 17 12H1ZM1 7C0.716667 7 0.479333 6.904 0.288 6.712C0.0960001 6.52067 0 6.28333 0 6C0 5.71667 0.0960001 5.479 0.288 5.287C0.479333 5.09567 0.716667 5 1 5H17C17.2833 5 17.5207 5.09567 17.712 5.287C17.904 5.479 18 5.71667 18 6C18 6.28333 17.904 6.52067 17.712 6.712C17.5207 6.904 17.2833 7 17 7H1ZM1 2C0.716667 2 0.479333 1.90433 0.288 1.713C0.0960001 1.521 0 1.28333 0 1C0 0.716667 0.0960001 0.479 0.288 0.287C0.479333 0.0956668 0.716667 0 1 0H17C17.2833 0 17.5207 0.0956668 17.712 0.287C17.904 0.479 18 0.716667 18 1C18 1.28333 17.904 1.521 17.712 1.713C17.5207 1.90433 17.2833 2 17 2H1Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Navbar Items */}
        <div className="flex gap-4 items-center">
          {/* Notifications */}
          <div
            className="relative p-2 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <Icon
              icon="iconamoon:notification-bold"
              className="text-gray-400 hover:text-[#7B3B99]"
              width={30}
              height={30}
            />
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 absolute top-0 right-0">
              {notifications.reduce((total, item) => total + item.count, 0)}
            </span>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-6 right-0 mt-2 w-40 bg-white rounded-lg shadow-md z-10">
                <div className="flex flex-col gap-2 px-4 py-2 text-black">
                  {notifications.map((item, index) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className=" py-1 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md flex justify-between"
                      >
                        {item.label}
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {item.count}
                        </span>
                      </Link>
                      {index < notifications.length - 1 && (
                        <hr className="border-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Balance Display */}
          <p className="text-gray-400 hover:text-[#7B3B99]">{23000} ETB</p>

          {/* User Info */}
          <div className="text-black">
            <p>{session?.user?.email}</p>
          </div>

          {/* Profile Dropdown */}
          <ProfileDropDown />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
