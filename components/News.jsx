import Link from "next/link";
import React from "react";

const News = ({ article, setArticleNum }) => {
  const { url, title, source, urlToImage } = article;
  return (
    <Link href={url} target="_blank">
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{title}</h6>
          <p className="text-xs font-medium text-gray-500">{source.name}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urlToImage} alt="" className="rounded-xl" width={70} />
      </div>
    </Link>
  );
};

export default News;
