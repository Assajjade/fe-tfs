import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardHeader, CardActions, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from './Axios';

const MerchandiseManage = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        AxiosInstance.get(`merchandise/`).then((res) => {
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
                    <Button variant="contained" color="primary" component={Link} to="/merchandise/create">
                        Add Merchandise
                    </Button>
                    <Table>
                        <TableBody>
                            {merchandise.filter(item => !item.is_deleted).map((item, index) => (                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.link}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" component={Link} to={`/merchandise/${item.id}`}>
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

export default MerchandiseManage;