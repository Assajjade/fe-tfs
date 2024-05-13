import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardHeader, CardActions, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../Axios';

const ContentList = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);


    const getData = () => {
        const language = localStorage.getItem('language');
        AxiosInstance.get(`blogs/`).then((res) => {
            setMerchandise(res.data); console.log(res.data);
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
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.author}</TableCell>
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

export default ContentList;