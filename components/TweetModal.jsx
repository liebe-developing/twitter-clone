"use client";

import { useRecoilState } from "recoil";
import { modalState, postIdState, tweetModalState } from "@/atom/modalAtom";
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
import Input from "./Input";

const TweetModal = () => {
  const [open, setOpen] = useRecoilState(tweetModalState);
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  return (
    <>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md h-auto"
        >
          <div className="p-1">
            {session && (
              <div className="flex border-b border-b-gray-200 p-3 space-x-3">
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
                      placeholder="What's happening?"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                  </div>
                  {selectedFile && (
                    <div className="relative">
                      <XMarkIcon
                        className={`${
                          isLoading && "hidden"
                        } h-6 w-6 ml-1 mt-1 text-red-600 bg-red-100 h-50 hover:bg-red-200 absolute cursor-pointer shadow-sm shadow-white rounded-full`}
                        onClick={() => setSelectedFile(null)}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedFile}
                        alt="post-image"
                        className={`${
                          isLoading && "animate-pulse"
                        } h-[400px] w-full rounded-md`}
                      />
                    </div>
                  )}

                  {!isLoading && (
                    <>
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
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
                        </div>
                        <button
                          className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                          disabled={!input.trim()}
                          onClick={sendPost}
                        >
                          Tweet
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default TweetModal;
