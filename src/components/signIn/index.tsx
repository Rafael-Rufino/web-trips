"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export function SignIn() {
  const { status, data: session } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    signIn();
  };
  const handleLogoutClick = () => {
    signOut();
  };

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      {status === "authenticated" && session?.user && (
        <div
          className={`flex justify-center items-center gap-4 ${
            isMenuOpen ? "border-primary" : "border-lighterGray"
          } border-2 px-4 py-2 rounded-[40px] relative cursor-pointer hover:border-primary hover:shadow-md transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-primaryGray focus:ring-offset-opacity-50 focus:ring-offset-soli]`}
        >
          <AiOutlineMenu
            size={24}
            onClick={handleMenuClick}
            className={`cursor-pointer hover:text-primary ${
              isMenuOpen ? "text-primary" : "text-gray-500"
            }`}
          />
          <div
            className={`absolute top-16 right-0 bg-primaryLight rounded-md p-4 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            {status === "authenticated" && (
              <button
                className="text-primary text-sm font-semibold border-primary border-2 px-4 py-2 rounded-md hover:bg-primary hover:text-white"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            )}
          </div>
          <Image
            width={40}
            height={40}
            className="border-2 border-white-500 rounded-full cursor-pointer"
            src={session?.user?.image! || "/avatar.png"}
            alt={session?.user?.name!}
            title={session?.user?.name!}
          />
        </div>
      )}
      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold border-primary  border-2 px-4 py-2 rounded-md hover:bg-primary hover:text-white "
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
    </div>
  );
}
