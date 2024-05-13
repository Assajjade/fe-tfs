import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardHeader, CardActions, Button } from '@mui/material';
import AxiosInstance from './Axios';
import ReactMarkdown from 'react-markdown';


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
                    <p>Loading data...</p>
                ) : (
                    merchandise.map((item, index) => (
                        <Card key={index} sx={{backgroundColor: '#f0f0f0', marginBottom: '20px'}}>
                            <CardHeader
                                title={item.name}
                                subheader={`Created at: ${new Date(item.created_at).toLocaleDateString()}`}
                            />
                            <Box sx={{padding: 4}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            {/*<strong>Link:</strong> <a href={item.link}>{item.link}</a>*/}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Story:</strong> {item.story}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <a href={item.link}><strong>Visit Store Page</strong></a>
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                )}
            </div>
            <div>
                {merchandiseSection.map((section, index) => (
                    <Card key={index} sx={{backgroundColor: '#f0f0f0', marginBottom: '20px'}}>
                        <CardHeader
                            title={section.name}
                        />
                        <Box sx={{padding: 4}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        <ReactMarkdown>
                                            {section.content}
                                        </ReactMarkdown>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                ))}
            </div>
        </div>

    );
};

export default ShowMerchandise;