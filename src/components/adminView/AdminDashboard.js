import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PieChartUserNationalities from './PieChartUserNationalities';
import UserDomicile from './UserDomicile';
import CardUserAdmin from './CardUserAdmin';
import SingleLine from '../cWView/SingleLine';
const AdminDashboard = () => {
  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px' }}>
          <CardUserAdmin />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <Card style={{ backgroundColor: '#f5f5f5', width: '400px', height: '430px',marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              User Nationalities
            </Typography>
            <PieChartUserNationalities />
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#f5f5f5', width: '400px', height: '430px',marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              User Domicile
            </Typography>
            <UserDomicile />
          </CardContent>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <Card style={{ backgroundColor: '#f5f5f5', width: '900px', height:'530px',marginRight: '20px' }}>
          <Typography variant="h6" component="div">
            User graphic access
          </Typography>
          <SingleLine/>
      </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
