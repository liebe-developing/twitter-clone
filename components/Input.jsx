"use client";

import { db, storage } from "@/firebase";
import { PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { signOut, useSession } from "next-auth/react";
import { useRef } from "react";
import { useState } from "react";

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendPost = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setInput("");
    setSelectedFile(null);
    setIsLoading(false);
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
    <>
      {session && (
        <div className="flex border-b border-b-[#EFF3F4] p-3 space-x-3">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={signOut}
            src={session?.user?.image}
            alt="User image"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-[#EFF3F4]">
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
    </>
  );
};

export default Input;
