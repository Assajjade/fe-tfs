import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent } from '@mui/material';
import AxiosInstance from './Axios'; // Assuming AxiosInstance is properly configured
import { useNavigate, useParams } from 'react-router-dom';
import TheTextField from './forms/TheTextField';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller

const FormQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { tripId } = useParams();
  const { control, handleSubmit } = useForm(); // Initialize useForm

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    AxiosInstance.get(`trips/${tripId}/questions/`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  };

  const onSubmit = async (data) => {
    const answers = [];

    for (const questionId in data) {
      answers.push({ question: questionId.split('_')[1], answer_text: data[questionId] });
    }

    try {
      await AxiosInstance.post(`trips/${tripId}/answers/`, answers);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate(`/trips`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}> {/* Use handleSubmit from useForm */}
          <Box>
            {questions.map((question) => (
              <Card key={question.id} sx={{ mb: 2, p: 2, display: 'flex' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>{question.question_text}</Typography>
                  <Controller
                    name={`answer_${question.id}`} 
                    control={control} // Pass control prop to Controller
                    render={({ field }) => ( // Use field prop to bind input
                      <TheTextField
                        label={`Answer for question ${question.id}`}
                        control={control}
                        {...field} // Spread field props to input
                      />
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
        </form>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <Typography>Your answers have been successfully submitted.</Typography>
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

export default FormQuestions;
