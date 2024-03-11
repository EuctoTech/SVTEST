import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const AppointmentStatusPiechart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [appointmentData, setAppointmentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [debouncedData, setDebouncedData] = useState({});

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('https://euctostaging.com/prolife/api/appointment_list', {
          method: 'POST', // Use POST method to fetch appointment data
          headers: {
            'Content-Type': 'application/json',
          },
          // You can add any required headers or authentication here
          body: JSON.stringify({
            appointment_status: 'PENDING', // Specify the appointment status you need
          }),
        });

        if (response.status === 429) {
          console.error('API rate limit exceeded. Please try again later.');
          setIsLoading(false);
          setIsFetching(false);
          return;
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAppointmentData(data);
        setDebouncedData(data); // Set debounced data here
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
        setIsLoading(false);
      } finally {
        setIsFetching(false);
      }
    };

    // Call the fetchData function only once when the component mounts
    fetchData();

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Function to update the chart
    const updateChart = () => {
      if (!isLoading && chartRef.current && appointmentData) {
        const completedCount = appointmentData.filter(
          (appointment) => appointment.appointment_status === 'COMPLETED'
        ).length;
        const pendingCount = appointmentData.filter(
          (appointment) => appointment.appointment_status === 'PENDING'
        ).length;

        const data = {
          labels: ['Appointment Completed', 'Appointment Pending'],
          datasets: [
            {
              label: 'Appointment Status',
              data: [completedCount, pendingCount],
              backgroundColor: ['#FECF02', '#FF5773'],
              hoverOffset: 4,
            },
          ],
        };

        const config = {
          type: 'pie',
          data: data,
          options: {
            maintainAspectRatio: false,
            aspectRatio: 1,
          },
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(chartRef.current, config);
      }
    };

    updateChart();
  }, [debouncedData, isLoading, appointmentData]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <canvas ref={chartRef} style={{ height: '250px' }} />
      )}
    </div>
  );
};

export default AppointmentStatusPiechart;

