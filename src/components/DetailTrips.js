import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, IconButton, Card, CardHeader } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import AxiosInstance from './Axios';
import ShowQuestions from './ShowQuestions';
import ShowParticipants from './ShowParticipants';
import AnalyticsViewTrips from './AnalyticsViewTrips';

const DetailTrips = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getData = () => {
    AxiosInstance.get(`trips/detail/${id}/`).then((res) => {
      setTrip(res.data);
      setLoading(false);
    });
  };

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    AxiosInstance.delete(`trips/delete/${id}/`)
      .then(() => {
        navigate(`/detail/${id}`); // Navigate back to the trip detail page after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting trip:', error);
      });
    setShowDeleteModal(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <div>
        <div class="w-full flex items-start justify-start" style={{ paddingBottom: "15px" }}>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => navigate(`/trips`)}> Back </button>
        </div>
        <AnalyticsViewTrips />

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Card sx={{ backgroundColor: '#f0f0f0', width:"900px", alignItems:"center" }}>
            <CardHeader
              sx={{ backgroundColor: '#bdbdbd', display: 'flex', justifyContent: 'space-between' }}
              title="Detail Trip"
              action={
                <Box sx={{ display: 'flex' }}>
                  <IconButton color="primary" aria-label="edit" onClick={() => handleEditClick()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClick()} sx={{ marginLeft: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/trips/${id}/add-questions/`)}>
                    Add Questions
                  </Button>
                </Box>
              }
            />
            <Box sx={{ padding: 4 }}>
              <Grid container spacing={2} style={{textAlign:"left"}}>
                <Grid item xs={6}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '150px', fontWeight: 'bold' }}>Area</div>
                      <div >: {trip.area}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '150px', fontWeight: 'bold' }}>Island Name</div>
                      <div>: {trip.island_name}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '150px', fontWeight: 'bold' }}>Trip Date</div>
                      <div>: {Dayjs(trip.trip_date).format('YYYY-MM-DD')}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '150px', fontWeight: 'bold' }}>Objective</div>
                        <div>: {trip.objective}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '150px', fontWeight: 'bold', textAlign: 'left' }}>Preparation</div>
                      <div style={{ flex: '1', textAlign: 'left' }}>: {trip.preparation}</div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: 'left' }}>

                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '150px', fontWeight: 'bold', textAlign: 'left' }}>Capacity</div>
                      <div style={{ flex: '1', textAlign: 'left' }}>: {trip.capacity}</div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '150px', fontWeight: 'bold', textAlign: 'left' }}>Skills</div>
                      <div style={{ flex: '1', textAlign: 'left' }}>: {trip.skills}</div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '8px' }}>
                      <div style={{ width: '150px', fontWeight: 'bold', textAlign: 'left' }}>vroles</div>
                      <div style={{ flex: '1', textAlign: 'left' }}>: {trip.vroles}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '150px', fontWeight: 'bold', textAlign: 'left' }}>Captain</div>
                      <div style={{ flex: '1', textAlign: 'left' }}>: {trip.captain}</div>
                    </div>
                  </div>
                </Grid>

              </Grid>
            </Box>
          </Card>
        )}
        <DeleteModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleConfirmDelete}
        />
        <div style={{ marginTop: '20px' }}>
          <ShowQuestions />
        </div>
        <div style={{ marginTop: '20px' }}>
          <ShowParticipants />
        </div>
      </div>
    </Box>
  );
};

export default DetailTrips;
