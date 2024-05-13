import * as React from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TheTextField from './forms/TheTextField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EditMerchandiseSection = () => {

    const [merch, setMerch] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const { id } = useParams();

    const GetData = () => {
        AxiosInstance.get(`merchandise/${id}/`).then((res) => {
            setMerch(res.data);
            setDefaultValues({
                name: res.data.name || '',
                link: res.data.link || '',
                story: res.data.story || '',
                highlighted: res.data.highlighted || 0,
                created_at: res.data.created_at || '',
            });
            setLoading(false);
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    React.useEffect(() => {
        GetData();
    }, []);

    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = React.useState({
        name: '',
        link: '',
        story: '',
        highlighted: 0,
        created_at: '',
    });

    const schema = yup.object({
        name: yup.string().required('This is a required field'),
        link: yup.string().required('This is a required field'),
        story: yup.string().required('This is a required field'),
        highlighted: yup.number().required('This is a required field'),
    });
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate(`/merchandise/${id}`);
    };
    const { handleSubmit, control } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });

    const submission = (data) => {
        const updatedMerchandise = {
            name: data.name,
            link: data.link,
            story: data.story,
            highlighted: data.highlighted,
            created_at: data.created_at,
        };

        AxiosInstance.put(`merchandise/${id}/`, updatedMerchandise)
            .then((res) => {
                handleOpenDialog(); // Open the dialog after successful update
            })
            .catch((error) => {
                console.error('Error merch update', error);
            });
    };

    const deleteMerchandiseSection = () => {
        AxiosInstance.delete(`merchandisesection/${id}/`)
            .then((res) => {
                console.log(res.data);
                navigate('/merchandisesection');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            {loading ? <p>Loading data...</p> :
                <form onSubmit={handleSubmit(submission)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                        <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                            Edit Merchandise
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                            <TheTextField
                                label="Section Name"
                                name="name"
                                control={control}
                                placeholder="Enter section name"
                                width={'30%'}
                            />
                            <TheTextField
                                label="Content"
                                name="content"
                                control={control}
                                placeholder="Enter markdown content"
                                width={'30%'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '40px' }}>
                            <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                                Update
                            </Button>
                            <Button variant="contained" color="error" onClick={deleteMerchandiseSection} sx={{ marginLeft: '10px', width: '30%' }}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                    {/* Pop-up Confirmation Dialog */}
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Success!</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Merchandise Section has been successfully updated.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary" autoFocus>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>}
        </div>
    );
};

export default EditMerchandiseSection;