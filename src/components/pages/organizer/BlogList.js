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
import AxiosInstance from "../../Axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = (id) => {
    AxiosInstance.delete(`blog/delete/${id}`).catch((error) => {
      console.error("Error deleting trip:", error);
    });
    setRefetch(refetch + 1);
    setDeleteModal(false);
  };

  useEffect(() => {
    AxiosInstance.get("blogs/").then((res) => {
      setBlogs(res.data);
      setLoading(false);
    });
  }, [refetch]);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div className="title mb-2 border-b">
            <h2 className="title font-bold text-[40px] mb-16">Manage Blogs</h2>
            <div className="action flex flex-row justify-between">
              <div>
                <Button variant="text">All</Button>
                <Button variant="text">Upcoming</Button>
                <Button variant="text">Past</Button>
              </div>
              <div className="pb-1">
                <Button
                  variant="contained"
                  component={Link}
                  to={`/blog/create`}
                >
                  Add Content
                </Button>
              </div>
            </div>
          </div>
          <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="blog-title">{blog.title}</div>
                        <div className="blog-date">
                          {new Date(blog.created_at).toLocaleString()} -{" "}
                          {new Date(blog.post_date).toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-2">
                        <Button
                          component={Link}
                          to={`/blog/${blog.id}`}
                          variant="text"
                          color="primary"
                        >
                          View Content
                        </Button>
                        <Button
                          component={Link}
                          to={`/blog/update/${blog.id}`}
                          variant="text"
                          color="primary"
                        >
                          Edit Blog
                        </Button>
                        <Button
                          onClick={() => handleDelete(blog.id)}
                          variant="text"
                          color="error"
                        >
                          Delete Blog
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default BlogList;
