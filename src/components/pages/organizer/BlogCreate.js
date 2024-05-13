import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../Axios";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postDate, setPostDate] = useState(null);
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = () => {
    AxiosInstance.post(`blog/create`, {
      author: "stprLFLuPChAZhGIzDkVyZ20kTG3",
      title: title,
      content: content,
      is_deleted: false,
      highlighted: highlight,
      post_date: postDate,
      languange: "id"
    }).then(() => {
      navigate("/blogs");
    });
  };

  return (
    <div>
      <div className="page title mb-2 border-b">
        <div className="pb-1 w-full flex">
          <Button variant="text" size="small" component={Link} to={`/blogs`}>
            Back
          </Button>
        </div>
        <h2 className="title font-bold text-[30px] mb-12">Create Content</h2>
      </div>
      <div className="blog px-24 flex flex-col gap-3">
        <div className="blog-title flex flex-col">
          <label>Title</label>
          <input
            className="py-2 px-3 border rounded-xl"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="blog-pic flex flex-row items-center gap-2">
          <label>Image</label>
          <input
            type="file"
          />
        </div>
        <div className="blog-title grid grid-cols-4 gap-2">
          <div className="col-span-2 flex flex-col">
            <label>Post date</label>
            <input
              className="py-2 px-3 border rounded-xl"
              value={postDate}
              type="datetime-local"
              onChange={(e) => setPostDate(e.target.value)}
              min={new Date().toISOString().slice(0, -8)}
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Highlight</label>
            <input
              className="py-2 px-3 border rounded-xl"
              value={highlight}
              type="number"
              onChange={(e) => setHighlight(e.target.value)}
            />
          </div>
        </div>
        <div className="blog-title flex flex-col">
          <label>Content</label>
          <textarea
            className="py-2 px-3 border rounded-xl"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />
        </div>
        <div className="pb-1 w-full flex flex-col text-[14px]">
          <div>
            <Button variant="contained" onClick={() => handleSubmit()}>
              Publish Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreate;
