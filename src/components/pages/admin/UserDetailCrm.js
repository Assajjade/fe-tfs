import * as React from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AxiosInstance from '../../Axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetailCrm = () => {

    const [result, setResult] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const { id } = useParams();

    const setDefaultValues = (data) => {
        return {
            user: data.user || '',
            views: data.views || '',
            unique: data.unique || '',
            cvisits: data.cvisits || 0,
            bounce: data.bounce || 0,
            mduration: data.mduration || '',
            gtu_rate: data.gtu_rate || '',
            utv_rate: data.utv_rate || '',
        };
    };

    const GetData = () => {
        AxiosInstance.get(`usermetrics/${id}/`).then((res) => {
            setResult(res.data);
            const defaultValues = setDefaultValues(res.data);
            // Use defaultValues here
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
                            <Typography>User ID: {result && result.user ? result.user : 'Loading...'}</Typography>
                            <Typography>Views: {result && result.views ? result.average_duration : 'Loading...'}</Typography>
                        </Box>
                    </Box>
                </div>}
        </div>
    );
};

export default UserDetailCrm;