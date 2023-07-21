"use client";

import Image from "next/image";
import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import { SidebarItems } from "@/assets/dummy";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Twitter log */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          width={50}
          height={50}
          alt="Twitter logo"
          className="cursor-pointer"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        {SidebarItems.map((item, idx) => (
          <SidebarMenuItem
            key={idx}
            text={item.text}
            Icon={item.icon}
            active={item.active}
          />
        ))}
      </div>
      {/* Tweet Button */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>

      {/* Mini-Profile */}
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <Image
          src="/myPhoto.gif"
          width={40}
          height={40}
          alt="User image"
          className="rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Ali Razmjooei</h4>
          <p className="text-gray-500">@alirazmjooei</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
