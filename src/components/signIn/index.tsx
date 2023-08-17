"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import { AiOutlineMenu } from "react-icons/ai";

export function SignIn() {
  const { status, data: session } = useSession();
  const [isMenuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLoginClick = () => {
    signIn();
  };
  const handleLogoutClick = () => {
    signOut();
  };

  const handleMenuClick = () => {
    setMenuIsOpen(!isMenuIsOpen);
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuIsOpen(false);
      }
    }

    if (isMenuIsOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuIsOpen]);
  return (
    <div>
      {status === "authenticated" && session?.user && (
        <div
          ref={menuRef}
          className={`flex justify-center items-center gap-4 ${
            isMenuIsOpen ? "border-primary" : "border-lighterGray"
          } border-2 px-4 py-2 rounded-[40px] relative cursor-pointer hover:border-primary hover:shadow-md transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-primaryGray focus:ring-offset-opacity-50 focus:ring-offset-soli]`}
        >
          <AiOutlineMenu
            size={24}
            onClick={handleMenuClick}
            className={`cursor-pointer hover:text-primary ${
              isMenuIsOpen ? "text-primary" : "text-gray-500"
            }`}
          />
          <div
            className={`absolute z-20 top-16 right-0 bg-primaryLight rounded-md py-8 px-4  ${
              isMenuIsOpen ? "block" : "hidden"
            }`}
          >
            {status === "authenticated" && (
              <div className="flex flex-col justify-center w-[120px]">
                <Link
                  onClick={handleMenuClose}
                  href="/my-trips"
                  className="text-primary text-center text-sm font-semibold  py-2  rounded-md hover:opacity-80 "
                >
                  Minhas Viagem
                </Link>

                <div className="border-b border-lighterGray my-2 w-full" />

                <button
                  className="text-primary text-sm font-semibold py-2 rounded-md hover:opacity-80"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
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
