import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HandHelping, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Account } from "@/server/user-management/Account";

const ProfileDropDown = () => {
  const { data: session } = useSession();

  //@ts-ignore
  const userType = session?.user.image.type;

  const handleLogOut = async() => {
    await Account.logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className=" flex p-1 bg-[#7B3B99] cursor-pointer items-center justify-center h-[40px] w-[40px] rounded-full ">
          <span className=" text-xl text-white font-semibold capitalize ">
            {session?.user.email?.slice(0, 1)}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userType === "admin" ? null : (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className=" mr-2 h-4 w-4 " />
              <Link
                href={
                  userType == "client" ? "/client/profile" : "/lawyer/profile"
                }
              >
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuGroup>
          {userType == "client" ? (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HandHelping className="mr-2 h-4 w-4" />
                <Link href="/client/case">case</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : (
            ""
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span onClick={handleLogOut}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
