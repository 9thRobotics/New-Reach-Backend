import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Tokenomics = () => {
  const [chartData, setChartData] = useState({});
  const [stats, setStats] = useState({ totalSupply: 0, circulating: 0 });

  useEffect(() => {
    const fetchTokenData = async () => {
      const response = await axios.get('https://your-backend-url/api/token-stats'); // Updated Backend API URL
      setStats(response.data);
      setChartData({
        labels: response.data.history.dates,
        datasets: [
          {
            label: 'Token Price ($)',
            data: response.data.history.prices,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
        ],
      });
    };

    fetchTokenData();
  }, []);

  return (
    <div>
      <h2>Tokenomics</h2>
      <p>Total Supply: {stats.totalSupply}</p>
      <p>Circulating Supply: {stats.circulating}</p>
      <Line data={chartData} />
    </div>
  );
};

export default Tokenomics;
