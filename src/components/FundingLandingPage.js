import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import TheTextField from './forms/TheTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FundingLandingPage = () => {
    const [landingPageOpen, setLandingPageOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false); 
    const navigate = useNavigate();
    const [landingPageData, setLandingPageData] = useState(null);
    const [isPressed, setIsPressed] = useState(false);

    const defaultValues = {
        bg_landing: null,
        title: '',
        content: ''
    };

    const schema = yup.object({
        bg_landing: yup
            .mixed()
            .test('is-image', 'Invalid image format', async (value) => {
                if (!value) return true; // Allow empty values
                return value instanceof File || (typeof value === 'object' && value.hasOwnProperty('type') && value.type.startsWith('image/'));
            }),
        title: yup.string(),
        content: yup.string(),
    });

    const { handleSubmit, control, reset, setValue } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });

    const fetchLandingPageData = () => {
        AxiosInstance.get(`fund/`)
            .then((res) => {
                setLandingPageData(res.data);
                const { bg_landing, ...rest } = res.data;
                reset(rest);
                if (bg_landing) {
                    setValue("bg_landing", bg_landing); // Set the value of file input
                }
            })
            .catch((error) => {
                console.error('Error fetching landing page data:', error);
            });
    };

    useEffect(() => {
        AxiosInstance.get(`fund/`)
            .then((res) => {
                setLandingPageData(res.data);
                const { bg_landing, ...rest } = res.data;
                reset(rest);
                if (bg_landing) {
                    const file = new File([], bg_landing.name, { type: bg_landing.type });
                    setValue("bg_landing", file);
                }
            })
            .catch((error) => {
                console.error('Error fetching landing page data:', error);
            });
    }, []);
    

    const handleLandingPageSubmit = async (data) => {
        const formData = new FormData();
        formData.append('bg_landing', data.bg_landing);
        formData.append('title', data.title);
        formData.append('content', data.content);

        try {
            const response = await AxiosInstance.post('fund/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Landing page created successfully:', response.data);
            handleOpenDialog();
            setEditMode(false); // Disable editing after successful submission
        } catch (error) {
            console.error('Error creating landing page:', error);
        }
    };

    const handleEdit = () => {
        setEditMode(prevEditMode => !prevEditMode); // Enable editing
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate(`/crowdfunding`);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setValue("bg_landing", file);
    };

    const handleOpenPage= () => {
        setIsPressed(!isPressed);
        setLandingPageOpen(!landingPageOpen);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="section" style={{ marginBottom: '20px', width: '80%', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: landingPageOpen ? '#f5f5f5' : 'inherit' }}>
            <button
                style={{
                    backgroundColor: 'transparent',
                    fontWeight: isPressed ? 'bold' : 'normal', // Set text to bold when pressed, otherwise normal
                    border: 'none',
                    borderRadius: '0',
                    padding: '0',
                    cursor: 'pointer',
                    marginBottom: '10px',
                    textAlign: 'left'
                }}
                onClick={() => handleOpenPage()} // Properly call handleOpenPage function
                >
                Landing Page Section Management
            </button>

                {landingPageOpen && (
                    <div style={{ paddingTop: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleEdit} variant="contained" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer', marginBottom: '10px', display: 'inline-block' }}>{editMode ? 'Back' : 'Create'}</Button>
                        </div>
                        <form onSubmit={handleSubmit(handleLandingPageSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px' }}>
                        <input
                            type="file"
                            onChange={handleFileInputChange}
                            disabled={!editMode}
                            accept="image/*" 
                        />
                        {landingPageData && landingPageData.bg_landing ? (
                            <Typography variant="body2" style={{ marginTop: '5px' }}>
                                {landingPageData.bg_landing.name}
                            </Typography>
                        ) : null}

                            <TheTextField
                                label="Title"
                                name="title"
                                control={control}
                                placeholder="Enter title"
                                disabled={!editMode}
                            />
                            <TheTextField
                                label="Content"
                                name="content"
                                control={control}
                                placeholder="Enter content"
                                disabled={!editMode}
                            />
                        </Box>

                            {editMode && (
                                <Button type="submit" variant="contained" style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Submit</Button>
                            )}
                        </form>
                    </div>
                )}
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Landing Page Creation Successful</DialogTitle>
                <DialogContent>
                    <Typography>
                        Your landing page has been successfully created.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FundingLandingPage;
