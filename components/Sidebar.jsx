"use client";

import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Twitter log */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          src="/twitter-logo.png"
          width={50}
          height={50}
          alt="Twitter logo"
          className="cursor-pointer"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text={"Home"} Icon={HomeIcon} active={true} />
        <SidebarMenuItem text={"Explore"} Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItem text={"Notifications"} Icon={BellIcon} />
            <SidebarMenuItem text={"Messages"} Icon={InboxIcon} />
            <SidebarMenuItem text={"Bookmarks"} Icon={BookmarkIcon} />
            <SidebarMenuItem text={"Lists"} Icon={ClipboardIcon} />
            <SidebarMenuItem text={"Profile"} Icon={UserIcon} />
            <SidebarMenuItem
              text={"More"}
              Icon={EllipsisHorizontalCircleIcon}
            />
          </>
        )}
      </div>
      {/* Tweet Button */}
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>

          {/* Mini-Profile */}
          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <Image
              onClick={signOut}
              src={session?.user?.image}
              width={40}
              height={40}
              alt="User image"
              className="rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session?.user?.name}</h4>
              <p className="text-gray-500">@{session?.user?.username}</p>
            </div>
            <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
          onClick={signIn}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Sidebar;
