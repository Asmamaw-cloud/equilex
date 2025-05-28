
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/app/context/NotificationContext";
import { useSession } from "next-auth/react";
import ProfileDropdown from "@/components/profileDropDown";
import {
  Bell,
  Menu,
  X,
  MessageSquare,
  UserCheck,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAdminBalance } from "../api/dashboard";

interface Props {
  toggleShowSideBar: () => void;
  isSidebarOpen: boolean;
  showToggle: boolean;
}

const AdminNavbar: React.FC<Props> = ({
  toggleShowSideBar,
  isSidebarOpen,
  showToggle,
}) => {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["adminBalance"],
    queryFn: () => getAdminBalance(),
  });

  const {
    faqNotifications,
    lawyerNotifications,
    disputeNotifications,
    fetchNotifications,
  } = useNotifications();

  useEffect(() => {
    setIsClient(true);
    fetchNotifications();
  }, [fetchNotifications]);

  if (!isClient) return null;

  const totalNotifications =
    faqNotifications + lawyerNotifications + disputeNotifications;

  return (
    <nav className="fixed top-4 left-4 right-4 z-40 p-3 bg-white border border-gray-200 rounded-xl shadow-lg">
      <div className="flex flex-wrap justify-between items-center gap-y-2">
        {/* Left - Sidebar toggle + Title */}
        <div className="flex items-center gap-3">
          {showToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleShowSideBar}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          <div className="text-lg md:text-xl font-bold text-purple-700">
            Admin Dashboard
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} className="text-gray-600" />
                {totalNotifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <Link href="/admin/FAQ">
                <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-purple-600" />
                    <span>FAQ Requests</span>
                  </div>
                  {faqNotifications > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {faqNotifications}
                    </Badge>
                  )}
                </DropdownMenuItem>
              </Link> */}
              <Link href="/admin/manage">
                <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <UserCheck size={16} className="text-purple-600" />
                    <span>Lawyer Applications</span>
                  </div>
                  {lawyerNotifications > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {lawyerNotifications}
                    </Badge>
                  )}
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/dispute">
                <DropdownMenuItem className="flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-purple-600" />
                    <span>Active Disputes</span>
                  </div>
                  {disputeNotifications > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {disputeNotifications}
                    </Badge>
                  )}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Balance - Hidden on small screens */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-full">
            <Wallet size={16} className="text-purple-700" />
            <span className="text-sm font-medium text-purple-700">
              {data} ETB
            </span>
          </div>

          {/* Profile - Hide details on mobile */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">
                {session?.user?.email}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
