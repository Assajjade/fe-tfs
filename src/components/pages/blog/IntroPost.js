import React, { useEffect, useState } from "react";
import Header from "../../../image/perahu.jpg";
import account from "../../../image/account.jpeg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../Axios";


function IntroPost({ post }) {
  const navigate = useNavigate();
  const firstLanguange = useParams();
  const [language, setLanguage] = useState(firstLanguange.languange); // Default language is English
  const [blog, setBlog] = useState([]);
  // const { lan } = useParams();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    // This will run every time the location changes
    setCurrentPath(location.pathname);
    // You can perform additional actions based on the new location
    console.log('Location changed:', location.pathname);

    fetchData(language)
  }, [location]);

  const fetchData = async (language) => {
    try {
      const res = await AxiosInstance.post(`blogs/${language}/`);
      setBlog(res.data);
      console.log("Blog data fetched successfully:", res.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };
  
  return (
    <div className="mt-10 px-10 md:px-15 lg:px-32 gap-8">
      <div
        className="grid grid-cols-1 md:grid-cols-2 bg-gray-300 p-3 rounded-2xl  w-full h-full"
        onClick={() => navigate(`/blog/detail/${post.id}`, { replace: true })}
      >
        <img src={Header} className="rounded-2xl object-cover" alt="Header" />
        <div className="m-5 flex flex-col justify-between">
          <div>
          <h2 className="text-[23px] font-bold mt-5">{blog.length > 0 ? blog[0].title : ""}</h2>
            <h4 className="flex line-clamp-6 text-gray-500 mt-5">{blog.length > 0 ? blog[0].content : ""}</h4>
          </div>
          <div id="hallo" className="flex items-center mt-5 px-3">
            <img src={account} className="rounded-full w-[50px]" alt="Account" />
            <div className="ml-2 flex justify-start flex-col">
              <div className="font-bold flex">{post.author}</div>
              <div className="text-gray-600">{post.created_at}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroPost;
