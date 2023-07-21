import { db } from "@/firebase";
import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Moment from "react-moment";

const Post = ({ post }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }

  return (
    <>
      {post && (
        <div className="flex p-3 cursor-pointer border-b border-b-gray-200 ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.data().userImg}
            alt="user-image"
            className="rounded-full h-11 w-11 mr-4"
          />
          {/* Right side */}
          <div className="flex flex-col w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
              {/* post user info */}
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                  {post.data().name}
                </h4>
                <span className="text-sm sm:text-[15px]">
                  @{post.data().username} -
                </span>
                <span className="text-sm sm:text-[15px] hover:underline">
                  <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
                </span>
              </div>

              {/* dot icon */}
              <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
            </div>

            {/* post text */}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
              {post.data().text}
            </p>

            {/* post image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.data().image}
              alt="post-image"
              className="rounded-2xl mr-2 w-full h-[250px] sm:h-[400px]"
            />

            {/* icons */}
            <div className="flex items-center justify-between text-gray-500 p-2">
              <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
              <div className="flex items-center">
                {hasLiked ? (
                  <SolidHeartIcon
                    className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                    onClick={likePost}
                  />
                ) : (
                  <HeartIcon
                    className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                    onClick={likePost}
                  />
                )}
                {likes.length > 0 && (
                  <span
                    className={`${
                      hasLiked && "text-red-600"
                    } text-sm select-none`}
                  >
                    {likes.length}
                  </span>
                )}
              </div>
              <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
              <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
