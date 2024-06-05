import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PieChartUserNationalities from './PieChartUserNationalities';
import UserDomicile from './UserDomicile';
import CardUserAdmin from './CardUserAdmin';
import SingleLine from '../adminView/SingleLine';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <div className="flex" style={{ marginBottom: '20px' }}>
            <Button component={Link} to="/admin/dashboard" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                All
            </Button>
            <Button component={Link} to="/io/dashboard" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Trip
            </Button>
            <Button component={Link} to="/cw/dashboard" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Blog
            </Button>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems:'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px' }}>
          <CardUserAdmin />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <Card style={{ backgroundColor: '#f5f5f5', width: '300px', height: '300px',marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              User Nationalities
            </Typography>
            <PieChartUserNationalities />
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#f5f5f5', width: '300px', height: '300px',marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              User Domicile
            </Typography>
            <UserDomicile />
          </CardContent>
        </Card>
      <Card style={{ backgroundColor: '#f5f5f5', width: '500px', height:'300px',marginRight: '20px' }}>
          <Typography variant="h6" component="div">
            User graphic access
          </Typography>
          <SingleLine/>
      </Card>
      </div>
    </div>
    </div>

    
  );
};

export default AdminDashboard;
