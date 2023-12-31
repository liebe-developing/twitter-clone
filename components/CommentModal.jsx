"use client";

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const CommentModal = () => {
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");

  const router = useRouter();

  const filePickerRef = useRef(null);

  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  const sendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      userId: session.user.uid,
    });
    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md h-auto"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-11 h-11 flex justify-center items-center"
              >
                <XMarkIcon className="h-[22px] text-gray-700" />
              </div>
            </div>

            <div className="p-2 flex items-center space-x-1 relative truncate">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post?.data()?.userImg}
                alt="user-image"
                className="rounded-full h-11 w-11 mr-4"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm sm:text-[15px] truncate">
                @{post?.data()?.username} -
              </span>
              <span className="text-sm sm:text-[15px] hover:underline truncate">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex p-3 space-x-3">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={session?.user?.image}
                alt="User image"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 "
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-end pt-2.5">
                  {/* <div className="flex items-center">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div> */}
                  <button
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                    onClick={sendComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
