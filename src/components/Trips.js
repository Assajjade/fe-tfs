import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from './Axios';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        setLoading(true);
        AxiosInstance.get('trips/')
            .then((res) => {
                setTrips(res.data);
            })
            .catch((error) => {
                console.error('Error fetching trips:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = () => {
        setLoading(true);
        AxiosInstance.get(`trips/?island_name=${searchTerm}`)
            .then((res) => {
                setTrips(res.data);
            })
            .catch((error) => {
                console.error('Error searching trips:', error);
            })
            .finally(() => {
                setLoading(false);
            });
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
                <TableContainer component={Paper} sx={{ borderRadius: '12px', maxWidth: '80%', margin: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Area</TableCell>
                                <TableCell>Island Name</TableCell>
                                <TableCell>Capacity</TableCell>
                                <TableCell>Close Registration</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id}>
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
            )}
        </div>
    );
};

export default Trips;
