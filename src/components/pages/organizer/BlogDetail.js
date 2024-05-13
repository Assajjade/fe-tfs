import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../../Axios";

const BlogDetail = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [author, setAuthor] = useState(null);

  const handleDelete = () => {
    AxiosInstance.delete(`blog/delete/${blog_id}`).catch((error) => {
      console.error("Error deleting trip:", error);
    });
    setRefetch(refetch + 1);
    setDeleteModal(false);
  };

  useEffect(() => {
    AxiosInstance.get(`blog/${blog_id}`).then((res) => {
      setBlog(res.data);
    });
  }, [refetch]);
  useEffect(() => {
    if (blog) {
      AxiosInstance.get(`user/${blog.author}`).then((res) => {
        setAuthor(res.data);
        setLoading(false);
      });
    }
  }, [blog]);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div className="page title mb-2 border-b">
            <div className="pb-1 w-full flex">
              <Button
                variant="text"
                size="small"
                component={Link}
                to={`/blogs`}
              >
                Back
              </Button>
            </div>
            <h2 className="title font-bold text-[30px] mb-12">
              Content Preview
            </h2>
          </div>
          <div className="blog">
            <div className="blog-title flex flex-col mb-5">
              <h3 className="title font-normal text-[40px]">{blog.title}</h3>
              <span>Author : {author.name}</span>
              <span>
                Created at : {new Date(blog.created_at).toLocaleString()}
              </span>
              <span>
                Post date : {new Date(blog.post_date).toLocaleString()}
              </span>
            </div>
            <div className="w-full">
              <p className="text text-justify">{blog.content}</p>
            </div>
            <div className="pb-1 w-full flex flex-col text-[14px]">
              Note: Changes here will affect how your story appears in homepage
              <div>
                <Button variant="contained">Publish Now</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
