import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import AxiosInstance from '../Axios';

const SingleLine = () => {
  const [createdData, setCreatedData] = useState([]);

  useEffect(() => {
    fetchCreatedData();
  }, []);

  const fetchCreatedData = async () =>{
    try {
      const response = await AxiosInstance.get(`users/count-created/`);
      setCreatedData(response.data);
      renderLineChart(response.data); 
    } catch (error) {
      console.error('Error fetching nationality data:', error);
    }
  }

  const renderLineChart = (data) => { 
    const options = {
      xaxis: {
        categories: data.map(item => item.date),
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
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          },
          formatter: function (date) {
            return date;
          }
        }
      },
      series: [
        {
          name: "Total Users",
          data: data.map(item => item.total_users),
          color: "#1A56DB",
        }
      ],
      chart: {
        sparkline: {
          enabled: false
        },
        height: "90%",
        width: "90%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
      },
    };

    if (document.getElementById("labels-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("labels-chart"), options);
      chart.render();
    }
  };

  return <div id="labels-chart"></div>;
};

export default SingleLine;
