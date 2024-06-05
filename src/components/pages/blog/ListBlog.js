import React from "react";
import Header from "../../../image/perahu.jpg";
import account from "../../../image/account.jpeg";
import { useNavigate, useParams } from 'react-router-dom';

function ListBlog({ posts }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 px-10 md:px-15 lg:px-32">
      {posts.map((item) => (
        // <div className="m-4 cursor-pointer" onClick={() => navigate(`/blog/detail/${item.id}`, {replace: true})}>
        <div className="m-4 cursor-pointer bg-slate-200 p-2 rounded-2xl" onClick={() => navigate(`/blog/details/${item.id}`, {replace: true})}>
          <img
            src={Header}
            className="w-full rounded-2xl object-cover h-[200px]"
          />
          <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold mt-3 ">{item.title}</h3>
            <h3 className="line-clamp-3 text-gray-400 mt-3 text-justify">
              {item.content}
            </h3>
          </div>
          <div className="flex items-center mt-5">
            <img src={account} className="rounded-full w-[35px]" />
            <div className="ml-2 flex justify-start flex-col">
              <div className="font-bold flex text-[12px]">{item.author.name}</div>
              <div className="text-gray-500 text-[10px]">{item.created_at}</div>
            </div>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}

export default ListBlog;
