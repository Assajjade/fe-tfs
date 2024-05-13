import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import AxiosInstance from './Axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditApplicationStatus = () => {
  const { tripId, userId } = useParams();
  const navigate = useNavigate();

  const [participant, setParticipant] = useState({});
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`trips/${tripId}/participants/${userId}/`);
        setParticipant(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching participant details:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId, userId]);

  const handleChangeStatus = async () => {
    try {
      await AxiosInstance.put(`trips/${tripId}/${userId}/`, { new_status: newStatus });
      setOpenDialog(true); 
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(`/trips/${tripId}/participants/${userId}/`); 
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
          <Typography variant="h5">Edit Application Status</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Name</strong>: {participant.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Email</strong>: {participant.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Phone Number</strong>: {participant.phoneNum}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Experience</strong>: {participant.experience}</Typography>
            </Grid>
          </Grid>
          <FormControl fullWidth>
            <InputLabel id="status-label">Application Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="applied">Applied</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleChangeStatus}>Update Status</Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
              <Typography>
                Application status updated successfully.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default EditApplicationStatus;
