import { db, storage } from "@/firebase";
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
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import Link from "next/link";

const Post = ({ post, id }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  /* Like Post */
  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }

  /* Delete Post */
  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-b-gray-200 ">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post?.data()?.userImg}
        alt="user-image"
        className="rounded-full h-11 w-11 mr-4"
      />
      {/* Right side */}
      <div className="flex flex-col md:w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center justify-between w-full whitespace-nowrap">
            <div className="flex items-center space-x-1">
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>

            {/* dot icon */}
            <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
        </div>

        <Link href={`/posts/${id}`}>
          {/* post text */}
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
            {post?.data()?.text}
          </p>

          {/* post image */}
          {post?.data()?.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post?.data()?.image}
              alt="post-image"
              className="rounded-2xl mr-2 w-full h-[250px] sm:h-[400px]"
            />
          )}
        </Link>

        {/* icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <div className="flex items-center group">
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-sm select-none group-hover:text-sky-500">
                {comments.length}
              </span>
            )}
          </div>
          {session?.user.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
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
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
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
  );
};

export default Post;
