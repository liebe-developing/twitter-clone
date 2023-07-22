"use client";

import Post from "@/components/Post";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const PostPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, [db]);
  
  return (
    <>
      {post && (
        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="hoverEffect" onClick={() => router.push("/")}>
              <ArrowLeftIcon className="h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <Post id={id} post={post} />
          {comments?.map((comment) => (
            <h1 key={comment.id}>{comment.username}</h1>
          ))}
        </div>
      )}
    </>
  );
};

export default PostPage;
