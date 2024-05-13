import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AxiosInstance from '../Axios';

const CardUserAdmin = () => {
  const [participantsCount, setParticipantsCount] = useState(0);
  const [blogCounts, setBlogCounts] = useState({ entire: 0 });
  const [tripCounts, setTripCounts] = useState({ entire: 0 });
  const [crowdfundingCounts, setcrowdfundingCounts] = useState();
  const [merchandiseCounts, setMerchandiseCounts] = useState();

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {
        const response = await AxiosInstance.get('users/count/');
        setParticipantsCount(response.data.total_users);
      } catch (error) {
        console.error('Error fetching participants count:', error);
      }
    };

    fetchParticipantsData();
  }, []);

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
    const fetchTripCount = async () => {
      try {
        const tripResponse = await AxiosInstance.get('trip/count/');
        setTripCounts({
          entire: tripResponse.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTripCount();
  }, []);

  useEffect(() => {
    const fetchMerchandiseCount = async () => {
      try {
        const tripResponse = await AxiosInstance.get('merchandise/count/');
        setMerchandiseCounts({
          entire: tripResponse.data
        });
      } catch (error) {
        console.error('Error fetching merchandise count:', error);
      }
    };

    fetchMerchandiseCount();
  }, []);

  useEffect(() => {
    const fetchCrowdfundingCount = async () => {
      try {
        const tripResponse = await AxiosInstance.get('crowdfunding/count/');
        setcrowdfundingCounts({
          entire: tripResponse.data
        });
      } catch (error) {
        console.error('Error fetching crowdfunding count:', error);
      }
    };

    fetchCrowdfundingCount();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '200px', height: '100px',marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            Users
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            {participantsCount}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '200px', height: '100px',marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            Blog
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333' }}>
            {blogCounts.entire}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '200px', height: '100px',marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
            Trips
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
            {tripCounts.entire}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '200px', height: '100px',marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
            CrowdFunding
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
            {crowdfundingCounts?.entire}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '200px', height: '100px',marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
            Merchandise
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
            {merchandiseCounts?.entire}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardUserAdmin;
