"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";
import { useState } from "react";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div className="xl:ml-[370px] border-l border-r border-[#EFF3F4] xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-3xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-[#EFF3F4]">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <Image
          src="/twitter-logo.png"
          width={50}
          height={50}
          alt="Twitter logo"
          className="inline sm:hidden justify-center ml-10"
        />
        <div className="flex items-center gap-1">
          <button
            className=" inline xl:hidden font-medium hover:text-sky-600"
            onClick={signIn}
          >
            Sign in
          </button>
          <div className="hoverEffect flex items-center justify-center px-0 w-9 h-9">
            <SparklesIcon className="h-5" />
          </div>
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Post id={post?.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
