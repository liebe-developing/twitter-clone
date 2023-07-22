"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import News from "./News";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Widgets = ({ newsResults, randomUsersResults }) => {
  const [articleNum, setArticleNum] = useState(3);
  const [userNum, setUserNum] = useState(3);
  return (
    <div className="hidden lg:inline xl:w-[600px] ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <MagnifyingGlassIcon className="w-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
          />
        </div>
      </div>

      {/* News */}
      <div className="widget_item_container">
        <h4 className="font-bold text-xl px-4">{`What's happening`}</h4>
        <AnimatePresence>
          {newsResults?.slice(0, articleNum).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setArticleNum(articleNum + 3)}
        >
          Show more
        </button>
      </div>

      {/* Random users */}
      <div className="widget_item_container sticky top-16">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
          {randomUsersResults?.slice(0, userNum).map((user) => (
            <motion.div
              key={user.login.username}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-300 ease-out">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.picture.thumbnail}
                  alt="user-image"
                  width={40}
                  className="rounded-full"
                />
                <div className="truncate ml-4 leading-5">
                  <h4 className="font-bold hover:underline text-[14px] truncate">
                    {user.login.username}
                  </h4>
                  <h5 className="text-[13px] text-gray-500 truncate">
                    {user.name.first + " " + user.name.last}
                  </h5>
                </div>
                <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-[#222] hover:brightness-95">
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setUserNum(userNum + 3)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
