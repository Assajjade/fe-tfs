import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import AxiosInstance from '../Axios';

const UserDomicile = () => {
  const [domicileData, setDomicileData] = useState([]);

  useEffect(() => {
    fetchDomicileData();
  }, []);

  const fetchDomicileData = async () => {
    try {
      const response = await AxiosInstance.get(`users/count-domicile/`);
      setDomicileData(response.data);
      renderPieChartDomicile(response.data);
    } catch (error) {
      console.error('Error fetching domicile data:', error);
    }
  };

  const getRandomColor = () => {
    // Generate random color code in hexadecimal format
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const renderPieChartDomicile = (data) => {
    const colors = data.map(() => getRandomColor()); // Generate random colors array

    const chartOptions = {
      series: data.map(item => item.total_users),
      labels: data.map(item => item.domicile.toString()),
      colors: colors, // Use the random colors array

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
            return value + "user"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "user"
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

    if (document.getElementById("pie-chart-domicile") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("pie-chart-domicile"), chartOptions);
      chart.render();
    }
  };

  return (
    <div id="pie-chart-domicile"></div>
  );
};

export default UserDomicile;
