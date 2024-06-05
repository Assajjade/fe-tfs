import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Checkbox } from '@mui/material';
import TheTextField from './forms/TheTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControlLabel } from '@mui/material';

const FundingWritingPage = () => {
    const [fundingWritingPageOpen, setFundingWritingPageOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [fundingWritingId, setFundingWritingId] = useState(null);
    const [fundingWritingData, setFundingWritingData] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const [filteredFundingWritingData, setFilteredFundingWritingData] = useState([]);

    const defaultValues = {
        title: '',
        content: '',
        isShow: false
    };

    const schema = yup.object({
        title: yup.string(),
        content: yup.string(),
        isShow: yup.boolean()
    });

    const { handleSubmit: handleCreateSubmit, control: createControl, reset: resetCreate, setValue: setCreateValue, watch: watchCreate } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });

    const { handleSubmit: handleEditSubmit, control: editControl, reset: resetEdit, setValue: setEditValue, watch: watchEdit } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });

    useEffect(() => {
        fetchFundingWritingData();
    }, []);

    const fetchFundingWritingData = () => {
        AxiosInstance.get('crowdfunding/writing')
            .then((res) => {
                setFundingWritingData(res.data);
                setFilteredFundingWritingData(res.data.filter(item => item.isShow));
                            })
            .catch((error) => {
                console.error('Error fetching Funding Writing data:', error);
            });
    };

    const handleCreate = () => {
        setCreateMode(prevCreateMode => !prevCreateMode);
    };
    const handleHideSection = async () => {
        try {
            const confirmed = window.confirm(`Are you sure you want to update the content shown?`);
            if (!confirmed) return;
    
            const updatedData = fundingWritingData.map(item => ({
                ...item,
                isShow: false
            }));
    
            // Update all items in the backend
            const promises = updatedData.map(async item => {
                const response = await AxiosInstance.put(`crowdfunding/writing/update/${item.id}/`, item);
                if (response.status === 200 || response.status === 204) {
                    console.log(`Item with ID ${item.id} updated successfully.`);
                } else {
                    console.error(`Error updating item with ID ${item.id}: ${response.statusText}`);
                }
            });
    
            // Wait for all updates to complete
            await Promise.all(promises);
    
            // Update state after all items are successfully updated
            setFundingWritingData(updatedData);
            console.log('All items updated successfully.');
    
        } catch (error) {
            console.error('Error updating The Content:', error);
        }
    };
    
    const handleEdit = async (id) => {
        setEditMode(true);
        setFundingWritingId(id);
        setOpenDialog(true);

        try {
            const response = await AxiosInstance.get(`crowdfunding/writing/${id}`);
            const editingItem = response.data;

            resetEdit({
                title: editingItem.title,
                content: editingItem.content,
                isShow: editingItem.isShow
            });
        } catch (error) {
            console.error('Error fetching data for editing:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await AxiosInstance.delete(`crowdfunding/writing/${id}/`);
            if (response.status === 204) {
                console.log('Funding Writing deleted successfully');
                fetchFundingWritingData();
            } else {
                console.error('Error deleting Funding Writing:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting Funding Writing:', error);
        }
    };

    const handlePageSubmit = async (data) => {
        try {
            let response;
            if (editMode) {
                response = await AxiosInstance.put(`crowdfunding/writing/update/${fundingWritingId}/`, data);
            } else if (createMode) {
                response = await AxiosInstance.post('crowdfunding/writing/create', data);
            }

            if (response.status === 200 || response.status === 201) {
                console.log('Funding Writing saved successfully:', response.data);
                setCreateMode(false);
                setEditMode(false);
                fetchFundingWritingData();
                setOpenSuccess(true); // Show success message
            } else {
                console.error('Error saving Funding Writing:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving Funding Writing:', error);
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
            const confirmed = window.confirm(`Are you sure you want to update the content shown?`);
            if (!confirmed) return;

            // Find the item by id
            const itemToUpdate = fundingWritingData.find(item => item.id === id);

            // Create a copy of the item with the new highlighted value
            const updatedItem = { ...itemToUpdate, isShow: newValue };
            const response = await AxiosInstance.put(`crowdfunding/writing/update/${id}/`, updatedItem);

            if (response.status === 200 || response.status === 204) {
                console.log('The Content shown updated successfully');
                setFundingWritingData(prevData =>
                    prevData.map(item =>
                        item.id === id ? updatedItem : item
                    )
                );
            } else {
                console.error('Error updating The Content:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating The Content:', error);
        }
    };

    const renderTableRows = () => {
        if (!fundingWritingData) return null;
        return fundingWritingData.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleHighlightToggle(item.id, !item.isShow)}
                    >
                        <Checkbox
                            checked={item.isShow}
                            onChange={() => { }} // Dummy onChange to prevent direct checkbox click
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

    const handleOpenPage = () => {
        setIsPressed(!isPressed);
        setFundingWritingPageOpen(!fundingWritingPageOpen);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="section" style={{ marginBottom: '20px', width: '80%', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: fundingWritingPageOpen ? '#f5f5f5' : 'inherit' }}>
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
                    Content Section Management
                </button>
                {fundingWritingPageOpen && (
                    <div style={{ paddingTop: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <Button onClick={handleCreate} variant="contained" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer', marginBottom: '10px', display: 'inline-block' }}>{createMode ? 'Back' : 'Create'}</Button>
                        </div>
                        {createMode && (
                            <form onSubmit={handleCreateSubmit(handlePageSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                                <TheTextField
                                    label="Title"
                                    name="title"
                                    control={createControl}
                                    placeholder="Enter title"
                                />
                                <TheTextField
                                    label="Content"
                                    name="content"
                                    control={createControl}
                                    placeholder="Enter content"
                                />
                                <FormControlLabel
                                    label="isShow"
                                    control={
                                        <Checkbox
                                            name="isShow"
                                            checked={!!watchCreate("isShow")} // Use watch to get the value from form data
                                            onChange={(e) => setCreateValue('isShow', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                />
                                <Button type="submit" variant="contained" style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Submit</Button>
                            </form>
                        )}
                    </div>
                )}
                {fundingWritingPageOpen && (
                    <div style={{ marginTop: '20px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                            <Checkbox onChange={handleHideSection} />
                            <span>Hide the section</span>
                        </Box>
                        <Typography variant="h5" gutterBottom>
                            Existing content writing
                        </Typography>
                        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Show</th>
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
                    <Button onClick={handleCloseSuccess} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? 'Edit' : 'Create'} Funding Writing</DialogTitle>
                <DialogContent>
                    {editMode && (
                        <form onSubmit={handleEditSubmit(handlePageSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                            <TheTextField
                                label="Title"
                                name="title"
                                control={editControl}
                                placeholder="Enter title"
                            />
                            <TheTextField
                                label="Content"
                                name="content"
                                control={editControl}
                                placeholder="Enter content"
                            />
                            <FormControlLabel
                                label="isShow"
                                control={
                                    <Checkbox
                                        name="isShow"
                                        checked={!!watchEdit("isShow")} // Use watch to get the value from form data
                                        onChange={(e) => setEditValue('isShow', e.target.checked)}
                                        color="primary"
                                    />
                                }
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: '#28a745', color: 'white', borderRadius: '5px', padding: '8px 15px', cursor: 'pointer' }}>Submit</Button>
                        </form>
                    )}
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

export default FundingWritingPage;
