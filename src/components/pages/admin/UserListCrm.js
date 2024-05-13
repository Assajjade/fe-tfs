import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardHeader, CardActions, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../Axios';

const UserListCrm = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        AxiosInstance.get(`usermetrics/`).then((res) => {
            setMerchandise(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Wird geladen...</p>
            ) : (
                <div>
                    <Button variant="contained" color="primary" component={Link} to="/addMerchandiseSection">
                        Content Analytics
                    </Button>
                    <Table>
                        <TableBody>
                            {merchandise.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" component={Link} to={`/blog/stats/${item.id}`}>
                                            View Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default UserListCrm;