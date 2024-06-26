import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import AxiosInstance from '../Axios';

const PieChartUserNationalities = () => {
  const [nationalityData, setNationalityData] = useState([]);

  useEffect(() => {
    fetchNationalityData();
  }, []);

  const fetchNationalityData = async () => {
    try {
      const response = await AxiosInstance.get(`users/count-nationalities/`);
      setNationalityData(response.data);
      renderPieChartNationalities(response.data);
    } catch (error) {
      console.error('Error fetching nationality data:', error);
    }
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const renderPieChartNationalities = (data) => {
    console.log("Data:", data); 

    const colors = data.map(() => getRandomColor()); 

    const chartOptions = {
      series: data.map(item => item.total_users),
      labels: data.map(item => item.nationality.toString()),
      colors: colors,
      chart: {
        height: 420,
        width: "100%",
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

    if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("pie-chart"), chartOptions);
      chart.render();
    }
  };

  return (
    <div id="pie-chart"></div>
  );
};

export default PieChartUserNationalities;
