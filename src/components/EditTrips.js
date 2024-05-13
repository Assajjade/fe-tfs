import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from '@mui/material';
import DateField from './forms/DateField';
import TheTextField from './forms/TheTextField';
import MultilinedField from './MultilinedField';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EditTrips = () => {
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const GetData = () => {
    AxiosInstance.get(`trips/update/${id}/`).then((res) => {
      setTrip(res.data);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching trip:', error);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();
  const defaultValues = {
    area: '',
    island_name: 'Sumatera', // Default to 'Sumatera'
    trip_date: null,
    duration: '', // Change to string type
    open_registration: null,
    close_registration: null,
    objective: '',
    preparation: '',
    capacity: 0,
    skills: '',
    vroles: '',
    captain: '', // Change to string type
  };

  const schema = yup
    .object({
      area: yup.string().required('Area is a required field'),
      island_name: yup.string().required('Island name is a required field'),
      trip_date: yup.date().required('Trip date is a required field'),
      duration: yup.string().required('Duration is a required field'), // Change to string type
      open_registration: yup.date().required('Open registration date is a required field'),
      close_registration: yup.date().required('Close registration date is a required field'),
      objective: yup.string().required('Objective is a required field'),
      preparation: yup.string().required('Preparation is a required field'),
      capacity: yup.number().positive().integer().required('Capacity is a required field'),
      skills: yup.string().required('Skills is a required field'),
      vroles: yup.string().required('Vroles is a required field'),
      captain: yup.string().required('Captain is a required field') // Change to string type
    });

  const { handleSubmit, control } = useForm({ defaultValues: defaultValues, resolver: yupResolver(schema) });
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(`/trips`);
  };

  const submission = (data) => {
    const tripData = {
      area: data.area,
      island_name: data.island_name,
      trip_date: Dayjs(data.trip_date).format("YYYY-MM-DD"),
      duration: data.duration,
      open_registration: Dayjs(data.open_registration).format("YYYY-MM-DD"),
      close_registration: Dayjs(data.close_registration).format("YYYY-MM-DD"),
      objective: data.objective,
      preparation: data.preparation,
      capacity: data.capacity,
      skills: data.skills,
      vroles: data.vroles,
      captain: data.captain,
    };

    AxiosInstance.put(`trips/update/${id}/`, tripData)
      .then((res) => {
        handleOpenDialog(); // Open the dialog after successful update
      })
      .catch((error) => {
        console.error('Error updating trip:', error);
      });
  };

  return (
    <div>
      {loading ? <p>Loading data...</p> :
        <form onSubmit={handleSubmit(submission)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
            <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
              Edit Trip
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
              <TheTextField
                label="Area"
                name="area"
                control={control}
                placeholder="Enter area"
                width={'30%'}
              />
              <Select
                label="Island Name"
                name="island_name"
                control={control}
                defaultValue="Sumatera"
                style={{ width: '150px' }}
                MenuProps={{ style: { width: '150px' } }}
              >
                <MenuItem value="Sumatera">Sumatera</MenuItem>
                <MenuItem value="Sulawesi">Sulawesi</MenuItem>
                <MenuItem value="Kalimantan">Kalimantan</MenuItem>
                <MenuItem value="Jawa">Jawa</MenuItem>
                <MenuItem value="Papua">Papua</MenuItem>
                <MenuItem value="Timor">Timor</MenuItem>
              </Select>
              <DateField
                label="Trip Date"
                name="trip_date"
                control={control}
                width={'30%'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
              <TheTextField
                label="Duration"
                name="duration"
                control={control}
                placeholder="Enter duration"
                width={'30%'}
              />
              <DateField
                label="Open Registration"
                name="open_registration"
                control={control}
                width={'30%'}
              />
              <DateField
                label="Close Registration"
                name="close_registration"
                control={control}
                width={'30%'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
              <MultilinedField
                label="Objective"
                name="objective"
                control={control}
                placeholder="Enter objective"
                width={'30%'}
              />
              <MultilinedField
                label="Preparation"
                name="preparation"
                control={control}
                placeholder="Enter preparation"
                width={'30%'}
              />
              <TheTextField
                label="Capacity"
                name="capacity"
                control={control}
                type="number"
                placeholder="Enter capacity"
                width={'30%'}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
              <TheTextField
                label="Skills"
                name="skills"
                control={control}
                placeholder="Enter skills"
                width={'30%'}
              />
              <TheTextField
                label="Volunteer roles"
                name="vroles"
                control={control}
                placeholder="Enter vroles"
                width={'30%'}
              />
              <TheTextField
                label="Captain"
                name="captain"
                control={control}
                placeholder="Enter captain"
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
            <DialogTitle>Edit Trip Successful</DialogTitle>
            <DialogContent>
              <Typography>
                Your trip has been successfully created.
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

export default EditTrips;

