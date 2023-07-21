"use client";

import SigninButtons from "@/components/SigninButtons";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Singin = () => {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image inside a phone"
        className="hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex"
      />
      <div>
        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-36 object-cover"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="twitter logo"
          />
          <p className="text-center text-sm italic my-10">
            This app is created for learning purposes
          </p>
          <SigninButtons
            text="Sign in with Google"
            Icon={FcGoogle}
            classes="bg-gray-100 hover:bg-white rounded-lg w-full flex items-center gap-2 border px-10 py-2.5"
            signinUrl={"google"}
          />
          <SigninButtons
            text="Continute with Github"
            Icon={FaGithub}
            classes="bg-[#222] text-white hover:bg-black rounded-lg w-full flex items-center gap-2 border px-10 py-2.5"
            signinUrl={"github"}
          />
        </div>
      </div>
    </div>
  );
};

export default Singin;
