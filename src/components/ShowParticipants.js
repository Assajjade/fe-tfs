import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AxiosInstance from './Axios';
import { Link } from 'react-router-dom';

const ShowParticipants = () => {
  const { id: tripId } = useParams(); 
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    fetchParticipants();
}, [currentPage]); 

const fetchParticipants = () => {
    setLoading(true);
    AxiosInstance.get(`trips/participants/${tripId}/?page=${currentPage}`)
        .then((res) => {
            if (res.data.results) { // Check if results exist in response
                setParticipants(res.data.results); // Access trips data directly
                setTotalPages(res.data.total_pages); // Access total_pages directly
            } else {
              setParticipants([]);
                setTotalPages(0);
            }
        })
        .catch((error) => {
            console.error('Error fetching participants:', error);
            setParticipants([]);
            setTotalPages(0);
        })
        .finally(() => {
            setLoading(false);
        });
};


const handlePreviousPage = () => {
  if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
  }
};

return (
  <div>
    {loading ? (
      <p>Loading data...</p>
    ) : participants.length > 0 ? (
      <div>
        <TableContainer component={Paper} sx={{ borderRadius: '12px', width: '800px', margin: 'auto' }}>
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
                    <Button
                      component={Link}
                      to={`/trips/${tripId}/participants/${participant.user}`}
                      variant="outlined"
                      color="primary"
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <p style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</p>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    ) : (
      <p>No participants for this trip.</p>
    )}
  </div>
);
}

export default ShowParticipants;
