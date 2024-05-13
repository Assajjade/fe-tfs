import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import AxiosInstance from './Axios';
import { useParams, useNavigate } from 'react-router-dom';

const ShowQuestions = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`trips/${id}/questions/`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, [id]);

  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Trip Questions
      </Typography>
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
         <Card key={index} style={{ marginBottom: '10px', textAlign: 'left', width: '300px' }}>
          <CardContent>
                <Typography variant="body1">{question.question_text}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Typography variant="body1" gutterBottom>
            No questions found for this trip.
          </Typography>
          {/* <Button variant="contained" color="primary" onClick={() => navigate(`/trips/${id}/add-questions`)}>
            Create Questions
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default ShowQuestions;
