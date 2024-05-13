import React, { useEffect, useState } from 'react';
import { Box, IconButton, Card, CardHeader, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import AxiosInstance from './Axios';

const DetailParticipants = () => {
  const { tripId, userId } = useParams(); // Using userId instead of id
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    AxiosInstance.get(`trips/${tripId}/participants/${userId}/`) // Using userId
      .then((res) => {
        setParticipant(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching participant details:', error);
        setLoading(false);
      });
  };

  const handleEditClick = () => {
    navigate(`/trips/${tripId}/participants/${userId}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    AxiosInstance.delete(`trips/${tripId}/participants/${userId}/`) 
      .then(() => {
        navigate(`/detail/${tripId}`);
      })
      .catch((error) => {
        console.error('Error deleting participant:', error);
      });
    setShowDeleteModal(false);
  };

  useEffect(() => {
    getData();
  }, [tripId, userId]);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : participant ? (
        <Card sx={{ backgroundColor: '#f0f0f0'}}>
          <CardHeader
            sx={{ backgroundColor: '#bdbdbd', display: 'flex', justifyContent: 'space-between' }}
            title="Participant Details"
            action={
              <Box sx={{ display: 'flex' }}>
                <IconButton color="primary" aria-label="back to list" onClick={() => navigate(`/detail/${tripId}`)}>
                  <ArrowBackIcon />
                </IconButton>
                <IconButton color="primary" aria-label="edit" onClick={() => handleEditClick()}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClick()} sx={{ marginLeft: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          />
          <Box sx={{ p: 2 , marginLeft: 1 }}>
            <Typography variant="h6" sx={{textAlign: 'left' }}>Participant Name: {participant.name}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Email: {participant.email}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Phone Number: {participant.phoneNum}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Experience: {participant.experience}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Application Status: {participant.application_status}</Typography>
          </Box>
        </Card>
      ) : (
        <p>No participant data found.</p>
      )}
      <DeleteModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default DetailParticipants;
