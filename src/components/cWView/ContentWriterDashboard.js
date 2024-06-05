import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardCW from './CardCW';
import SingleLine from '../adminView/SingleLine';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ContentWriterDashboard = () => {
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
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CardCW/>
    </div>
    </div>
  );
};

export default ContentWriterDashboard;
