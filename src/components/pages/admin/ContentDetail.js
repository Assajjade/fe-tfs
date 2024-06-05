import * as React from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AxiosInstance from '../../Axios';
import { useNavigate, useParams } from 'react-router-dom';

const ContentDetail = () => {

    const [result, setResult] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const { id } = useParams();

    const setDefaultValues = (data) => {
        return {
            last_visit: data.last_visit || '',
            average_duration: data.average_duration || '',
            most_common_user_agent: data.most_common_user_agent || '',
            latest_visitor_ip: data.latest_visitor_ip || '',
            pageviews: data.pageviews || 0,
        };
    };


    const GetData = () => {
        AxiosInstance.get(`analytics-api/content/${id}/`).then((res) => {
            setResult(res.data);
            const defaultValues = setDefaultValues(res.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    React.useEffect(() => {
        GetData();
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            {loading ? <p>Loading data...</p> :
                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                        <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                            Blog Content Analytics Details
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                            <Typography>Last Visit: {result.last_visit}</Typography>
                            <Typography>Average Visit Duration: {result.average_duration}</Typography>
                            <Typography>Most Common Browser Profile: {result.most_common_user_agent}</Typography>
                            <Typography>Last Visitor IP: {result.latest_visitor_ip}</Typography>
                            <Typography>Page Views: {result.pageviews}</Typography>
                        </Box>
                    </Box>
                </div>}
        </div>
    );
};

export default ContentDetail;