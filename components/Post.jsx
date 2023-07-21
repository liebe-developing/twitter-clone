import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";

const Post = ({ post }) => {
  // const { name, username, userImg, text, timestamp, image } = post.data().;
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
                  <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
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
              <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
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
