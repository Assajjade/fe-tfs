import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardHeader, CardActions, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from './Axios';

const MerchandiseSectionManage = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        AxiosInstance.get(`merchandisesection/`).then((res) => {
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
                    <Button variant="contained" color="primary" component={Link} to="/merchandisesection/create">
                        Add Merchandise Section
                    </Button>
                    <Table>
                        <TableBody>
                            {merchandise.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.content}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" component={Link} to={`/merchandisesection/${item.id}`}>
                                            Edit
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

export default MerchandiseSectionManage;