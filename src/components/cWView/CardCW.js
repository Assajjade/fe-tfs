import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AxiosInstance from '../Axios';
import { useParams } from 'react-router-dom';

const CardCW = () => {
  const { id: blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogCounts, setBlogCounts] = useState({ entire: 0 });
  const [commentCounts, setCommentCounts] = useState(0); // Changed to primitive
  const [commentReportsCounts, setCommentReportsCounts] = useState(0); // Changed to primitive

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

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Card style={{ backgroundColor: '#f5f5f5', width: '300px', height: '200px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            Comment
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            {commentCounts}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#f5f5f5', width: '300px', height: '200px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            Comment Reports
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            {commentReportsCounts}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#f5f5f5', width: '300px', height: '200px' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            Blog
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            {blogCounts.entire}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardCW;
