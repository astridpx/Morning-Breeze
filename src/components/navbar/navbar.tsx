"use client";

import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import { BiMoon, BiSun } from "react-icons/bi";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import useSidebarStore from "@/lib/zustand/sidebar-store/sidebar-store";
import { useTheme } from "next-themes";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

// Declare the HTML elements used in your JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add declarations for HTML elements you use in your JSX
      div: React.HTMLAttributes<HTMLDivElement>;
      span: React.HTMLAttributes<HTMLSpanElement>;
      // Add more as needed
    }
  }

export default function Navbar() {
  const { toggleSidebar, isExpand } = useSidebarStore();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <nav className="h-[10vh] w-full px-4 bg-white border flex justify-between z-10 sticky top-0  dark:bg-dark_bg">
        <div className="flex items-center">
          <Toggle onClick={() => toggleSidebar(!isExpand)}>
            <HiOutlineMenuAlt2
              size={26}
              className="cursor-pointer text-gray-500  dark:text-gray-300"
            />
          </Toggle>
        </div>

        <div className="flex items-center space-x-4">
          {theme === "dark" ? (
            <Badge
              className="rounded-3xl cursor-pointer"
              onClick={() => setTheme("light")}
            >
              <BiSun size={23} />
            </Badge>
          ) : (
            <Badge
              className="rounded-3xl cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              <BiMoon size={23} />
            </Badge>
          )}

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-0 focus:outline-none">
                <Badge
                  // variant="secondary"
                  className="rounded-3xl relative"
                >
                  <IoMdNotificationsOutline
                    size={23}
                    className="relative cursor-pointer"
                  />
                  <span className="px-1 absolute z-10  text-[10px] bg-red-400 rounded-full -top-1 right-1">
                    10
                  </span>
                </Badge>
              </DropdownMenuTrigger>

              {/* NOTIFICATION DROPDOWN */}
              <DropdownMenuContent
                className="h-96 w-72 "
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="py-4 sticky top-0 w-full flex justify-between  ">
                  <h4 className="text-base font-medium leading-none">
                    Notifications
                  </h4>
                  <p className="text-xs bg-sky-100 text-sky-500 dark:bg-[#1B2C32]  px-2 py-1 rounded-full">
                    10 Unread
                  </p>
                </DropdownMenuLabel>
                <Separator />
                <ScrollArea className="h-80  w-full">
                  <div className="pb-1">
                    {tags.map((tag) => (
                      <>
                        <div
                          className="px-4 text-sm py-3 text-gray-600 "
                          key={tag}
                        >
                          {tag}
                        </div>
                        <Separator />
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-0 focus:outline-none">
              <div className="h-[10vh] flex items-center px-2 space-x-4 focus:outline-0 focus:outline-none border-none cursor-pointer">
                <div className="flex flex-col justify-end text-right leading-6 ">
                  <h1 className="text-gray-700 dark:text-gray-300">
                    Joe Biden
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Admin
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <IoIosArrowDown size={21} className="text-gray-400" />
                </div>
              </div>
            </DropdownMenuTrigger>

            {/* //? DROPDOWN MENU ITEMS */}
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    m@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </DropdownMenuItem>
                <DropdownMenuItem>New Team</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {/* <Separator /> */}
    </>
  );
}
