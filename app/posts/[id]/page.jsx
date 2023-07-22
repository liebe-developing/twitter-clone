"use client";

import { Sidebar, Widgets } from "@/components";
import Comment from "@/components/Comment";
import Post from "@/components/Post";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const PostPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [newsResults, setNewsResults] = useState([]);
  const [randomUsersResults, setRandomUsersResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => {
        setNewsResults(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=30&inc=name,login,picture")
      .then((res) => res.json())
      .then((data) => {
        setRandomUsersResults(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot));
  }, [db, id]);

  /* Getting the comments of the post */
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  return (
    <main className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow xl:max-w-xl">
        <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="hoverEffect flex justify-center items-center" onClick={() => router.push("/")}>
            <ArrowLeftIcon className="h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        </div>
        <Post id={id} post={post} />

        <AnimatePresence>
          {comments.length > 0 &&
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Comment
                  commentId={comment.id}
                  originalPostId={id}
                  comment={comment.data()}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Widgets */}

      <Widgets
        newsResults={newsResults?.articles}
        randomUsersResults={randomUsersResults.results}
      />
    </main>
  );
};

export default PostPage;
