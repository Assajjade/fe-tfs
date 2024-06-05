import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardHeader, CardActions, Button, CardContent } from '@mui/material';
import AxiosInstance from './Axios';
import ReactMarkdown from 'react-markdown';
import logo from "../image/background-homepage.png";
import {Link} from "react-router-dom";


const ShowMerchandise = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);
    const [merchandiseSection, setMerchandiseSection] = useState([]);

    const getMerchandiseSectionData = () => {
        AxiosInstance.get(`merchandisesection/`).then((res) => {
            setMerchandiseSection(res.data);
        });
    };

    const getData = () => {
        AxiosInstance.get(`merchandise/`).then((res) => {
            setMerchandise(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        getData();
        getMerchandiseSectionData()
    }, []);

    return (
        <div>

            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Grid container spacing={2}>
                        {merchandiseSection.map((section, index) => (
                            <Grid item xs={12} key={index}>
                                <Card sx={{backgroundColor: '#6fb4f4', marginBottom: '20px'}}>
                                    <CardHeader
                                        title={section.name}
                                    />
                                    <CardContent>
                                        <ReactMarkdown>
                                            {section.content}
                                        </ReactMarkdown>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>

            <div>
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Grid container spacing={2}>
                            {merchandise.filter(item => !item.is_deleted).map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card sx={{backgroundColor: '#ffffff', marginBottom: '20px'}}>
                                        <CardHeader
                                            title={item.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body1">
                                                {item.story}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" color="primary" component={Link}
                                                    to={item.link}>
                                                Go To Store
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowMerchandise;