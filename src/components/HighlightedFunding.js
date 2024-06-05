import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Checkbox } from '@mui/material';
import TheTextField from './forms/TheTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControlLabel } from '@mui/material';

const HighlightedFunding = () => {
    const [landingPageOpen, setLandingPageOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [highlightedId, setHighlightedId] = useState(null);
    const [highlightedData, setHighlightedData] = useState(null);
    const [landingPageData, setLandingPageData] = useState(null);
    const [isPressed, setIsPressed] = useState(false);


    const handleOpenPage = () => {
        setLandingPageOpen(!landingPageOpen);
        setIsPressed(!isPressed);
    };

    const defaultValues = {
        title: '',
        link: '',
        purpose: '',
        highlighted: false 
    };

    const schema = yup.object({
        title: yup.string(),
        link: yup.string().url(),
        purpose: yup.string(),
        highlighted: yup.boolean()
    });

    const { handleSubmit, control, reset, setValue, watch } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });
    
    useEffect(() => {
        fetchLandingPageData(); // Fetch data on component mount
    }, []); // Dependency array to run only on mount

    const fetchLandingPageData = () => {
        AxiosInstance.get('crowdfunding/')
            .then((res) => {
                setLandingPageData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching highlighted Crowdfunding data:', error);
            });
    };

    const handleCreate = () => {
        setCreateMode(prevCreateMode => !prevCreateMode);
        setEditMode(false);
        reset(defaultValues); 
    };
    

    const handleEdit = (id) => {
        setEditMode(true);
        setHighlightedId(id);
        const highlightedItem = landingPageData.find(item => item.id === id);
        setHighlightedData(highlightedItem);
        reset({
            title: highlightedItem.title,
            link: highlightedItem.link,
            purpose: highlightedItem.purpose,
            highlighted: highlightedItem.highlighted
        });
        setOpenDialog(true);
    };
    

    const handleDelete = async (id) => {
        try {
            const response = await AxiosInstance.delete(`crowdfunding/update/${id}/`);
            if (response.status === 204) {
                console.log('highlighted Crowdfunding deleted successfully');
                fetchLandingPageData();
            } else {
                console.error('Error deleting highlighted Crowdfunding:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting highlighted Crowdfunding:', error);
        }
    };

    const handleLandingPageSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('link', data.link);
            formData.append('purpose', data.purpose);
            formData.append('highlighted', data.highlighted);
    
            let response;
            if (editMode) {
                response = await AxiosInstance.put(`crowdfunding/update/${highlightedId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else if (createMode){
                response = await AxiosInstance.post('crowdfunding/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
    
            if (response.status === 200 || response.status === 201) {
                console.log('highlighted Crowdfunding saved successfully:', response.data);
                setCreateMode(false); 
                setEditMode(false); 
                fetchLandingPageData(); 
                setOpenSuccess(true); 
            } else {
                console.error('Error saving highlighted Crowdfunding:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving highlighted Crowdfunding:', error);
        }
    };
    
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
        handleCloseDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleHighlightToggle = async (id, newValue) => {
        try {
            const confirmed = window.confirm(`Are you sure you want to update the highlighted status?`);
            if (!confirmed) return;
    
            // Find the item by id
            const itemToUpdate = landingPageData.find(item => item.id === id);
            
            const updatedItem = { ...itemToUpdate, highlighted: newValue };
    
            const response = await AxiosInstance.put(`crowdfunding/update/${id}/`, updatedItem);
    
            if (response.status === 200 || response.status === 204) {
                console.log('highlighted Crowdfunding updated successfully');
                setLandingPageData(prevData =>
                    prevData.map(item =>
                        item.id === id ? updatedItem : item
                    )
                );
            } else {
                console.error('Error updating highlighted Crowdfunding:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating highlighted Crowdfunding:', error);
        }
    };
    
    const renderFormFields = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px' }}>
                <TheTextField
                    label="Title"
                    name="title"
                    control={control}
                    placeholder="Enter title"
                    defaultValue={editMode && highlightedData ? highlightedData.title : ''}
                    disabled={!editMode}
                />
                <TheTextField
                    label="Link"
                    name="link"
                    control={control}
                    placeholder="Enter link"
                    defaultValue={editMode && highlightedData ? highlightedData.link : ''}
                    disabled={!editMode}
                />
                <TheTextField
                    label="Purpose"
                    name="purpose"
                    control={control}
                    placeholder="Enter purpose"
                    defaultValue={editMode && highlightedData ? highlightedData.purpose : ''}
                    disabled={!editMode}
                />
            </Box>
        );
    };

    const renderHighlightCheckbox = () => {
        return (
            <FormControlLabel
                label="Highlighted"
                control={
                    <Checkbox
                        name="highlighted"
                        checked={!!watch("highlighted")}
                        onChange={(e) => setValue('highlighted', e.target.checked)}
                        color="primary"
                    />
                }
            />
        );
    };

    const renderFormSubmitButton = () => {
        return (
            <Button type="submit" variant="contained" style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Submit</Button>
        );
    };

    const handleHideSection = async () => {
        try {
            const confirmed = window.confirm(`Are you sure you want to update the content shown?`);
            if (!confirmed) return;
    
            const updatedData = landingPageData.map(item => ({
                ...item,
                highlighted: false // Set the 'highlighted' property to false for all items
            }));
    
            const promises = updatedData.map(async item => {
                const response = await AxiosInstance.put(`crowdfunding/update/${item.id}/`, item);
                if (response.status === 200 || response.status === 204) {
                    console.log(`Item with ID ${item.id} updated successfully.`);
                } else {
                    console.error(`Error updating item with ID ${item.id}: ${response.statusText}`);
                }
            });
    
            await Promise.all(promises);
    
            setLandingPageData(updatedData);
            console.log('All items updated successfully.');
    
        } catch (error) {
            console.error('Error updating The Content:', error);
        }
    };
    

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit(handleLandingPageSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                {renderFormFields()}
                {renderHighlightCheckbox()}
                {renderFormSubmitButton()}
            </form>
        );
    };

    const renderTableRows = () => {
        if (!landingPageData) return null;
        return landingPageData.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.link}</td>
                <td>{item.purpose}</td>
                <td>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleHighlightToggle(item.id, !item.highlighted)}
                    >
                        <Checkbox
                            checked={item.highlighted}
                            onChange={() => {}} 
                            color="primary"
                            inputProps={{ 'aria-label': 'checkbox with default true & false' }}
                        />
                    </div>
                </td>
                <td><Button onClick={() => handleEdit(item.id)}>Edit</Button></td>
                <td><Button onClick={() => handleDelete(item.id)}>Delete</Button></td>
            </tr>
        ));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="section" style={{ marginBottom: '20px', width: '80%', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: landingPageOpen ? '#f5f5f5' : 'inherit' }}>
                <button
                    style={{
                        backgroundColor: 'transparent',
                        fontWeight: isPressed ? 'bold' : 'normal', 
                        border: 'none',
                        borderRadius: '0',
                        padding: '0',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        textAlign: 'left'
                    }}
                    onClick={() => handleOpenPage()} 
                    >
                    Highlited Crowd Funding Section Management
                </button>
                {landingPageOpen && (
                    <div style={{ paddingTop: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={handleCreate} variant="contained" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer', marginBottom: '10px', display: 'inline-block' }}>{createMode ? 'Back' : 'Create'}</Button>
                        </div>
                        {createMode && renderForm()}
                    </div>
                )}
                {landingPageOpen && (
                    <div style={{ marginTop: '20px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                        <Checkbox onChange={handleHideSection} />
                        <span>Hide the section</span>
                    </Box>

                        <Typography variant="h5" gutterBottom>
                            Existing Highlighted Crowdfunding
                        </Typography>
                        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Title</th>
                                    <th>Link</th>
                                    <th>Purpose</th>
                                    <th>Highlighted</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Dialog open={openSuccess} onClose={handleCloseSuccess}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography>Your changes have been saved successfully!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccess} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? 'Edit' : 'Create'} highlighted crowdfunding</DialogTitle>
                <DialogContent>
                    {renderForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HighlightedFunding;
