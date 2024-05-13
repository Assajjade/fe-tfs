import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Dialog components
import TheTextField from './forms/TheTextField';
import { useForm, useFieldArray } from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateQuestions = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState({});
  const { id } = useParams(); 

  const schema = yup.object().shape({
    questions: yup.array().of(
      yup.object().shape({
        question_text: yup.string().required('Question is required')
      })
    )
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      questions: [{ question_text: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const [openDialog, setOpenDialog] = useState(false); 

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await AxiosInstance.get(`trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const questionTexts = data.questions.map(question => question.question_text);      
      const requestData = {
        questions: questionTexts,
      };
  
      const response = await AxiosInstance.post(`trips/${trip.id}/add-questions/`, requestData);
      if (response.status === 201) {
        setOpenDialog(true);
      } else {
      }
    } catch (error) {
      console.error('Error creating questions:', error);
    }
  };

  const handleCloseDialog = () => { 
    setOpenDialog(false);
    navigate('/'); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
          <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
            Create Questions
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {fields.map((question, index) => (
            <Box key={question.id} sx={{ marginBottom: '10px' }}>
              <TheTextField
                label={`Question ${index + 1}`}
                name={`questions[${index}].question_text`}
                control={control}
                error={!!errors.questions?.[index]?.question_text}
                helperText={errors.questions?.[index]?.question_text?.message}
              />
              <Button type="button" onClick={() => remove(index)}>Remove</Button>
            </Box>
          ))}
          <Button type="button" onClick={() => append({ question_text: '' })}>Add Question</Button>
          <Button type="submit">Submit</Button>
        </Box>
      </form>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <Typography>Your questions have been successfully submitted.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateQuestions;
