import React, { useState, useEffect } from 'react';
import Search from './blog/Search';
import IntroPost from './blog/IntroPost';
import ListBlog from './blog/ListBlog';
import AxiosInstance from '../Axios';
import BgSea from '../../image/bg-sea3.jpg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Blog = () => {
  const firstLanguange = useParams();
  const [language, setLanguage] = useState(firstLanguange.languange); // Default language is English
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // This will run every time the location changes
    fetchData(language);
  }, [location]);

  const fetchData = (language) => {
    AxiosInstance.post(`blogs/${language}/`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "id" : "en";
    navigate(`/blogs/${language}/`, { replace: true });
    setLanguage(newLanguage);
  };

  return (
    <div className=''>
      <img src={BgSea} className="absolute inset-0 w-screen  object-cover z-[-2] top-0 left-0 " alt="Background"></img>
      <div className="relative z-10 ">
        <Search></Search>
        {blog.length > 0 ? <IntroPost post={blog[0]} /> : null}
        {blog.length > 0 ? <ListBlog posts={blog.slice(1)} /> : null}
      </div>
    </div>
  );
};

export default Blog;
