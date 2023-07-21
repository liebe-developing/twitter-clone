import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const posts = [
    {
      id: "1",
      name: "Ali Razmjooei",
      username: "alirazmjooei",
      userImage: "/myPhoto.gif",
      postImage:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      text: "Programming is my favorite activity",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "John doe",
      username: "doejohn",
      userImage: "/myPhoto.gif",
      postImage:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      text: "Learn programming fast and easy!",
      timestamp: "a day ago",
    },
    {
      id: "2",
      name: "John doe",
      username: "doejohn",
      userImage: "/myPhoto.gif",
      postImage:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      text: "Learn programming fast and easy!",
      timestamp: "a day ago",
    },
    {
      id: "2",
      name: "John doe",
      username: "doejohn",
      userImage: "/myPhoto.gif",
      postImage:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      text: "Learn programming fast and easy!",
      timestamp: "a day ago",
    },
    {
      id: "2",
      name: "John doe",
      username: "doejohn",
      userImage: "/myPhoto.gif",
      postImage:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      text: "Learn programming fast and easy!",
      timestamp: "a day ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
