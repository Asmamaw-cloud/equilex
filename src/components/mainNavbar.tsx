"use client";

import {
  Bell,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  Scale,
  User,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Button } from "./ui/button";
import ProfileDropDown from "./profileDropDown";
import SearchInput from "./searchInput";
import Notification from "./Notification";
import ChatDropDown from "./chatDropDown";

const MainNavbar = () => {
  const [nav, setNav] = useState(false);
  const { data: session } = useSession();
  const currentRoute = usePathname();
  const router = useRouter();
  console.log("session: ", session);

  //@ts-ignore
  const userType = session?.user.image.type;
  console.log("user Type: ", userType);

  const handleNav = () => setNav(!nav);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="sticky top-0 bg-background/95 md:backdrop-blur md:text-black z-50 flex justify-between items-center h-20 min-w-screen mx-auto px-4 text-white border ">
      {/* <div className="w-[15%] lg:pl-12 ">
        <Link className=" flex flex-row items-center gap-2 " href={"/"}>
          <Scale className="h-6 w-6 text-[#7B3B99]" size={300} />
          <h1 className="w-full text-3xl font-bold text-black ">
            <span className="text-[#7B3B99]">EQUI</span>LEX
          </h1>
        </Link>
      </div> */}

      <div className=" lg:pl-4">
        <Link
          className="flex items-center gap-2"
          href="/"
          aria-label="EQUILEX Home"
        >
          <Scale className="h-6 w-6 text-[#333333]" />
          <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-[#7B3B99]">EQUI</span><span className="text-[#2C2C2C]">LEX</span>
          </h1>
        </Link>
      </div>

      <>
        {session ? (
          <>
            <div className="w-[30%]  md:flex hidden">
              {userType == "client" ? <SearchInput /> : null}
            </div>
            <ul className="hidden md:flex items-center ">
              <div className="relative p-2 hover:scale-110 duration-300 text-slate-500  ">
                <Notification />
              </div>
              <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300 hover:text-black hover:scale-110 ">
                <ChatDropDown />
              </li>

              <li className="py-4 px-2 rounded-xl m-1 cursor-pointer duration-300   text-slate-500  ">
                {currentRoute == "/" ? (
                  <>
                    {userType == "client" ? (
                      <Link href="/client/lawyers">
                        <h3 className="text-2xl group-hover:font-bolder hover:text-[#7B3B99] hover:scale-110">
                          Lawyer
                        </h3>
                      </Link>
                    ) : (
                      <div className="flex gap-4">
                        <Link href="/lawyer">
                          <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99] hover:scale-110">
                            MyPage
                          </h3>
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <div className=" flex gap-2 ">
                    <Link href="/">
                      <h3 className="text-xl group-hover:font-bolder hover:text-[#7B3B99] duration-300 hover:scale-110">
                        Home
                      </h3>
                    </Link>
                    {userType == "lawyer" && (
                      <div
                        onClick={() => router.push("/lawyer/withdraw")}
                        className="  hover:text-white rounded-full p-1  hover:opacity-100 transition-opacity "
                      >
                        <p className="text-gray-400  hover:text-[#7B3B99] hover:scale-110 duration-300 ">
                          300 ETB
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </li>

              <li className="py-4 px-2 rounded-xl m-1 duration-300 hover:scale-110">
                {/* <IoPersonCircleSharp className="text-[#7B3B99] w-16 h-12" /> */}
                <ProfileDropDown />
              </li>
            </ul>
            <div onClick={handleNav} className="block md:hidden text-black">
              {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: "Features", id: "features" },
                { name: "How It Works", id: "how-it-works" },
                { name: "Testimonials", id: "testimonials" },
                { name: "FAQ", id: "faq" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium relative group transition-colors hover:text-[#7B3B99]"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7B3B99] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="/signin"
                className="text-sm font-medium transition-colors hover:text-[#7B3B99] hidden md:block"
              >
                Login
              </a>
              <Button
                className=" rounded bg-[#7B3B99] px-8 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring  sm:w-auto cursor-pointer hidden md:block"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-10 w-10 " />
                ) : (
                  <Menu className="h-5 w-5 " />
                )}
              </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div
                id="mobile-menu"
                className="fixed inset-0 top-20 z-40 bg-white border-t md:hidden"
              >
                <nav className="flex flex-col p-4 space-y-4">
                  {[
                    { name: "Features", id: "features" },
                    { name: "How It Works", id: "how-it-works" },
                    { name: "Testimonials", id: "testimonials" },
                    { name: "FAQ", id: "faq" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex justify-start p-3 rounded-lg hover:bg-[#333333]/10 text-lg font-medium w-full text-left text-foreground  cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                  <Link
                    href="/signin"
                    className="flex items-center p-3 rounded-lg hover:bg-[#333333]/10 text-lg text-foreground font-medium "
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Button
                    className="mt-2 w-full bg-[#7B3B99] hover:bg-[#444444]  cursor-pointer"
                    onClick={() => {
                      router.push("/signup");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </nav>
              </div>
            )}
          </>
        )}
      </>
      <ul
        className={
          nav
            ? "backdrop-blur z-50 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#7B3B99]  ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-white m-4">EQUILEX</h1>

        <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link href={"/chat"}>Chat</Link>
        </li>

        <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
          {userType == "client" ? (
            <Link href="/client/lawyers">Lawyers</Link>
          ) : (
            <Link href="/lawyer">My Page</Link>
          )}
        </li>

        <li className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600">
          <Link
            href={userType === "client" ? "/client/profile" : "/lawyer/profile"}
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNavbar;
