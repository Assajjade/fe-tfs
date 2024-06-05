import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from './Axios';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchTrips();
    }, [currentPage, searchTerm]);
    
    const fetchTrips = () => {
        setLoading(true);
        AxiosInstance.get(`trips/?page=${currentPage}&search=${searchTerm}`)
            .then((res) => {
                if (res.data.results) {
                    setTrips(res.data.results);
                    setTotalPages(res.data.total_pages);
                } else {
                    setTrips([]);
                    setTotalPages(0);
                }
            })
            .catch((error) => {
                console.error('Error fetching trips:', error);
                setTrips([]);
                setTotalPages(0);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset to the first page when searching
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Box sx={{ borderRadius: '12px', maxWidth: '80%', display: 'flex', alignItems: 'center' }}>
                    <input
                        type="search"
                        className="rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search Trip by Island Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width:'800px',height: '50px', borderRadius: '10px', flex: 1 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
                        Search
                    </Button>
                </Box>
            </div>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <div>
<TableContainer component={Paper} sx={{ borderRadius: '12px', maxWidth: '80%', margin: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Picture</TableCell> 
                                    <TableCell>Area</TableCell>
                                    <TableCell>Island Name</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Close Registration</TableCell>
                                    <TableCell>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trips.map((trip, index) => (
                                    <TableRow key={trip.id}>
                                        <TableCell>{index + 1 + (5 * (currentPage - 1))}</TableCell>
                                        <TableCell>
                                        <img src={`http://127.0.0.1:8000${trip.trip_pic}`} alt={`Trip ${index + 1}`} style={{ width: '100px', height: '100px' }} />
                                        </TableCell>
                                        <TableCell>{trip.area}</TableCell>
                                        <TableCell>{trip.island_name}</TableCell>
                                        <TableCell>{trip.capacity}</TableCell>
                                        <TableCell>{trip.close_registration}</TableCell>
                                        <TableCell>
                                            <Button
                                                component={Link}
                                                to={`/detail/${trip.id}`}
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
            )}
        </div>
    );
};

export default Trips;
