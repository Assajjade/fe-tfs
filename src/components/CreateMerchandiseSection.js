import * as React from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TheTextField from './forms/TheTextField';
import MultilinedField from './MultilinedField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateMerchandiseSection = () => {

    const [merch, setMerch] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);


    const GetData = () => {
        AxiosInstance.get(`merchandise/`).then((res) => {
            setMerch(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    React.useEffect(() => {
        GetData();
    }, []);

    const navigate = useNavigate();
    const defaultValues = {
        name: '',
        link: '',
        story: '',
        highlighted: 0,
    };

    const schema = yup
        .object({
            name: yup.string().required('This is a required field'),
            content: yup.string().required('This is a required field'),

        });

    const { handleSubmit, control } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate(`/merchandisesection/`);
    };

    const submission = (data) => {
        const sectionData = {
            name: data.name,
            content: data.content,
        };

        console.log('Request body:', sectionData); // req body log

        AxiosInstance.post(`/merchandisesection/`, sectionData)
            .then((res) => {
                handleOpenDialog(); // Open the dialog after successful update
            })
            .catch((error) => {
                console.error('Error :', error);
            });
    };

    return (
        <div>
            {loading ? <p>Loading data...</p> :
                <form onSubmit={handleSubmit(submission)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
                        <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
                            Add New Section
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
                            <TheTextField
                                label="Name"
                                name="name"
                                control={control}
                                placeholder="Enter name"
                                width={'30%'}
                            />
                            <TheTextField
                                label="Content"
                                name="content"
                                control={control}
                                placeholder="Enter content in markdown"
                                width={'30%'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '40px' }}>
                            <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Success!</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Merchandise section has been added
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

export default CreateMerchandiseSection;