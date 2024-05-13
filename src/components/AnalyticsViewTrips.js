import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ApexCharts from 'apexcharts';
import { useParams } from 'react-router-dom';
import AxiosInstance from './Axios';

const AnalyticsViewTrips = () => {
  const { id: tripId } = useParams();
  const [loading, setLoading] = useState(true);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [nationalityData, setNationalityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participantsResponse = await AxiosInstance.get(`trips/${tripId}/participants/count/`);
        setParticipantsCount(participantsResponse.data.total_participants || 0);

        const statusResponse = await AxiosInstance.get(`trip/${tripId}/total-applications/`);
        setApplicationStatus(statusResponse.data);

        const nationalityResponse = await AxiosInstance.get(`trips/${tripId}/nationalities/count/`);
        setNationalityData(nationalityResponse.data);
        renderPieChart(nationalityResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  const renderPieChart = (data) => {
    if (data.length === 0) {
      document.getElementById("pie-chart-nationalities").innerHTML = "No user";
      return;
    }
  
    const chartOptions = {
      series: data.map(item => item.total_users),
      labels: data.map(item => item.user__nationality),
      colors: ["#1C64F2", "#16BDCA", "#9061F9"], // Add more colors if needed
      chart: {
        height: 420,
        width: "90%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "%"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  
    if (document.getElementById("pie-chart-nationalities") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("pie-chart-nationalities"), chartOptions);
      chart.render();
    }
  };
  

  return (
    <div>
      <Card style={{ backgroundColor: '#f5f5f5', width: '850px', height: '150px', marginRight: '20px', marginBottom:"30px" }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
            Status User
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Object.entries(applicationStatus).map(([status, count]) => (
              <Card key={status} style={{ backgroundColor: 'white', width: '45%', height:"80px", paddingBottom: '5px', margin: '0 5px' }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                    {count}
                  </Typography>
                  <Typography variant="h7" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                    {status}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div style={{ display: 'flex'}}>
      <Card style={{ backgroundColor: '#f5f5f5',width: '400px', height: '300px', marginRight: "15px", marginBottom:"30px"}}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
            Statistics
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Card style={{ backgroundColor: 'white', height: '80px', marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
              {participantsCount}
            </Typography>
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
              Participants
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: 'white', height: '80px', marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
              {/* Render questions count here */}
            </Typography>
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
              Questions
            </Typography>
          </CardContent>
        </Card>
      </div>

        </CardContent>
      </Card>
      <Card style={{ backgroundColor: '#f5f5f5', width: '430px', height: '300px', padding: '10px', marginBottom:"30px" }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
            User on Trip Nationalities
          </Typography>
          <div id="pie-chart-nationalities"></div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default AnalyticsViewTrips;
