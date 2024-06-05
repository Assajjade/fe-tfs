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
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import AxiosInstance from "../../Axios";
import { useParams } from 'react-router-dom';

const BlogList = () => {
  const [data, setData] = useState([])
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("All")
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blogCounts, setBlogCounts] = useState({ entire: 0 });
  const [commentCounts, setCommentCounts] = useState(0); 
  const [commentReportsCounts, setCommentReportsCounts] = useState(0); 
  const { id: blogId } = useParams();

  const handleDelete = (id) => {
    AxiosInstance.delete(`blog/delete/${id}`).then(() => {
      setRefetch(refetch + 1);
      setDeleteModal(false);
    }).catch((error) => {
      console.error("Error deleting blog:", error);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentReportsResponse = await AxiosInstance.get(`blogs/${blogId}/total-comment-reports/`);
        setCommentReportsCounts(commentReportsResponse.data.total_reports || 0);

        const commentBlogsResponse = await AxiosInstance.get(`trip/${blogId}/total-comment-blog/`);
        setCommentCounts(commentBlogsResponse.data.entire); // Access entire property

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [blogId]);
  
  useEffect(() => {
    const fetchBlogCounts = async () => {
      try {
        const response = await AxiosInstance.get('blogs/count/');
        setBlogCounts({
          entire: response.data.entire_count
        });
      } catch (error) {
        console.error('Error fetching blog counts:', error);
      }
    };

    fetchBlogCounts();
  }, []);

  useEffect(() => {
    AxiosInstance.get("blogs/").then((res) => {
      setBlogs(res.data);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    });
  }, [refetch]);

  useEffect(() => {
    const today = new Date()
    let filtered = []
    if (blogs.length > 0) {
      if (mode === "Upcoming") {
        filtered = blogs.filter((blog) => new Date(blog.post_date).toISOString() > today.toISOString())
      } else if (mode === "Past") {
        filtered = blogs.filter((blog) => new Date(blog.post_date).toISOString() < today.toISOString())
      } else {
        filtered = blogs
      }

    }
    console.log(today);
    console.log(filtered);
    setData(filtered)
  }, [mode])
  

  return (
    <div>
      <div class={"flex"} style={{ marginBottom: '20px' }}>
        <Button component={Link} to="/blogs" variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Blog List
        </Button>
        <Button component={Link} to="/admin/comment-report" variant="contained" color="primary">
            Comment Report
        </Button>
    </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <div className="title mb-2 border-b">
            <h2 className="title font-bold text-[40px] mb-16">Manage Blogs</h2>
            <div className="action flex flex-row justify-between">
              <div>
                <Button variant={mode === "All" ? "outlined" :"text"} onClick={() => setMode("All")}>All</Button>
                <Button variant={mode === "Upcoming" ? "outlined" :"text"} onClick={() => setMode("Upcoming")}>Upcoming</Button>
                <Button variant={mode === "Past" ? "outlined" :"text"} onClick={() => setMode("Past")}>Past</Button>
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
            <Card style={{ backgroundColor: '#f5f5f5', width: '120px', height: '50px' }}>
              <CardContent>
                <p component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
                  total: {blogCounts.entire}
                </p>
              </CardContent>
            </Card>
          </div>
          <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Total Comments</TableCell>
                  <TableCell>Total Comment Reports</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((blog) => (
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
                    <TableCell>{blog.total_comments}</TableCell>
                    <TableCell>{blog.total_comment_reports}</TableCell>
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
