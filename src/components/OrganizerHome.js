import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AxiosInstance from './Axios';
import ApexCharts from 'apexcharts';
import PieChartNationalities from './PieChartNationalities'; // Import the PieChartNationalities component
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OrganizerHome = ({pageViews}) => {
  const [tripCounts, setTripCounts] = useState({ entire: 0 });
  const [loading, setLoading] = useState(true);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [tripCountsByIsland, setTripCountsByIsland] = useState({});
  const [chartOptions, setChartOptions] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState({});
  const chartRef = useRef(null);
  const chartRendered = useRef(false); // Flag to track whether the chart has been rendered

  useEffect(() => {
    const fetchTripCount = async () => {
      try {
        const tripResponse = await AxiosInstance.get('trip/count/');
        setTripCounts({
          entire: tripResponse.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTripCount();
  }, []);

  useEffect(() => {
    AxiosInstance.get('trips/island-name-count').then((res) => {
      const islandData = res.data;
      const chartData = islandData.map(({ island_name, total_trips }) => ({
        x: island_name,
        y: total_trips,
      }));

      const newOptions = {
        colors: generateRandomColors(islandData.length), // Generate random colors
        series: [{
          name: "Total Trips",
          data: chartData,
        }],
        chart: {
          type: "bar",
          height: "320px",
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            borderRadiusApplication: "end",
            borderRadius: 8,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"],
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -14
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          floating: false,
          title: {
            text: 'Island Name', // Title for x-axis
            style: {
              fontFamily: "Inter, sans-serif",
            },
          },
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          title: {
            text: 'Total Trips', // Title for y-axis
            style: {
              fontFamily: "Inter, sans-serif",
            },
          },
          show: false,
        },
        fill: {
          opacity: 1,
        },
      };

      setChartOptions(newOptions);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const fetchParticipantsCount = async () => {
      try {
        const response = await AxiosInstance.get('participants/total/');
        if (response.data.total_participants !== undefined) {
          setParticipantsCount(response.data.total_participants);
        } else {
          setParticipantsCount(0);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching participants count:', error);
        setLoading(false);
      }
    };

    fetchParticipantsCount();
  }, []);

  useEffect(() => {
    if (chartOptions && !loading && chartRef.current && !chartRendered.current) {
      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();
      chartRendered.current = true; // Set the flag to true after rendering the chart
    }
  }, [chartOptions, loading]);

  useEffect(() => {
    fetchTripStatus();
  }, []);

  const fetchTripStatus = async () => {
    try {
      const response = await AxiosInstance.get('trip/status-total/');
      setApplicationStatus(response.data);
    } catch (error) {
      console.error('Error fetching trip status:', error);
    }
  };

  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(color);
    }
    return colors;
  };

  return (
    <div>
      <div className="flex" style={{ marginBottom: '20px' }}>
            <Button component={Link} to="/admin/dashboard" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                All
            </Button>
            <Button component={Link} to="/io/dashboard" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Trip
            </Button>
            <Button component={Link} to="/cw/dashboard" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                Blog
            </Button>
        </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Card style={{ backgroundColor: '#f5f5f5', width: '500px', height: '200px', marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
              Status User
            </Typography>
  
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {Object.entries(applicationStatus).map(([status, count]) => (
                <Card key={status} style={{ backgroundColor: 'white', width: '45%', padding: '5px', margin: '0 5px' }}>
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
        <Card style={{ backgroundColor: '#f5f5f5', width: '500px', height: '200px', marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
              Statistics
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card style={{ backgroundColor: 'white', width: '45%', padding: '15px' }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                  {tripCounts.entire}
                  </Typography>
                  <Typography variant="h7" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                    Trip
                  </Typography>
                </CardContent>
              </Card>
              
              <Card style={{ backgroundColor: 'white', width: '45%', padding: '15px' }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                    {participantsCount}
                  </Typography>
                  <Typography variant="h7" component="div" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                    Participants
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Card style={{ backgroundColor: '#f5f5f5', width: '490px', height: '450px', padding: '10px', marginRight: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
              Pie Chart Nationalities
            </Typography>
            <PieChartNationalities /> 
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#f5f5f5', width: '510px', height: '450px', padding: '10px' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'Nunito, sans-serif', color: '#333', paddingBottom: '10px' }}>
              Trip base on Island Name
            </Typography>
            <div ref={chartRef}></div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OrganizerHome;
