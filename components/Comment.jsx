import { modalState, postIdState } from "@/atom/modalAtom";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Moment from "react-moment";
import { useRecoilState } from "recoil";

const Comment = ({ comment, commentId, originalPostId }) => {
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [open, setOpen] = useRecoilState(modalState);

  const router = useRouter();

  const { data: session } = useSession();

  /* Getting the number of likes for post comments */
  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId, commentId]);

  /* Checking if the post has been liked */
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  /* Liking the comment */
  async function likeComment() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          ),
          {
            username: session.user.username,
          }
        );
      }
    } else {
      router.push("/auth/signin");
    }
  }

  /* Deleting the comment by the owner of the comment */
  async function deleteComment() {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  }
  return (
    <div className="flex p-3 cursor-pointer border-b border-b-gray-200 md:pl-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={comment?.userImg}
        alt="user-image"
        className="rounded-full h-11 w-11 mr-4"
      />
      {/* Right side */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center justify-between w-full whitespace-nowrap">
            <div className="flex items-center space-x-1 truncate">
              <h4 className="font-bold text-[14px] sm:text-[16px] hover:underline">
                {comment?.name}
              </h4>
              <span className="text-[13px] sm:text-[15px] max-w-[90px] truncate sm:max-w-full">
                @{comment?.username} -
              </span>
              <span className="text-xs sm:text-[15px] hover:underline max-w-[90px] truncate sm:max-w-full">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
            </div>

            {/* dot icon */}
            <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
          </div>
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {comment?.comment}
        </p>

        {/* icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <ChatBubbleOvalLeftEllipsisIcon
            onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(originalPostId);
                setOpen(!open);
              }
            }}
            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
          />
          {session?.user.uid === comment?.userId && (
            <TrashIcon
              onClick={deleteComment}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <SolidHeartIcon
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                onClick={likeComment}
              />
            ) : (
              <HeartIcon
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                onClick={likeComment}
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

export default Comment;
