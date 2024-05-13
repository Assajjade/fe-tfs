import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardCW from './CardCW';
import SingleLine from './SingleLine';

const ContentWriterDashboard = () => {
  return (
    <div style={{ marginTop: '20px', display: 'flex' }}>
      <CardCW/>
    </div>
  );
};

export default ContentWriterDashboard;
