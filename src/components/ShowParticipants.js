import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AxiosInstance from './Axios';
import { Link } from 'react-router-dom';

const ShowParticipants = () => {
  const { id: tripId } = useParams(); 
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await AxiosInstance.get(`trips/participants/${tripId}/`);
        setParticipants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching participants:', error);
        setLoading(false);
      }
    };

    getData();
  }, [tripId]);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : participants.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', maxWidth: '80%', margin: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Status Application</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.phoneNum}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.experience}</TableCell>
                  <TableCell>{participant.application_status}</TableCell>
                  <TableCell>
                  <Button component={Link} to={`/trips/${tripId}/participants/${participant.user}`} variant="outlined" color="primary"> Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No participants for this trip.</p>
      )}
    </div>
  );
};

export default ShowParticipants;
