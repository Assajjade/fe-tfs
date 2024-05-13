import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import AxiosInstance from './Axios';
import { useParams } from 'react-router-dom';

const PieChartNationalities = () => {
  const [nationalityData, setNationalityData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchNationalityData();
  }, []);

  const fetchNationalityData = async () => {
    try {
      const response = await AxiosInstance.get(`trip/total-user-nationalities/`);
      setNationalityData(response.data);
      renderPieChart(response.data);
    } catch (error) {
      console.error('Error fetching nationality data:', error);
    }
  };

  const renderPieChart = (data) => {
    const chartOptions = {
      series: data.map(item => item.total_users),
      labels: data.map(item => item.user__nationality),
      colors: ["#4793AF", "#FFC470", "#DD5746"], // Add more colors if needed
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

    if (document.getElementById("pie-chart-all") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("pie-chart-all"), chartOptions);
      chart.render();
    }
  };

  return (
    <div id="pie-chart-all"></div>
  );
};

export default PieChartNationalities;
