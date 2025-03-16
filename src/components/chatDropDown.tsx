import { MessageSquareText, Video } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

import { MdOutlineLocalPostOffice } from "react-icons/md";

const ChatDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <MdOutlineLocalPostOffice className="w-12 h-10 text-gray-400 hover:text-[#7B3B99]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/chat2" className="flex gap-2 items-center">
              <MessageSquareText className="mr-2 h-4 w-4" /> <span> Chat </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Video className="mr-2 h-4 w-4" />
            <Link href="/videoCall">
              <span>Video Call </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatDropDown;
