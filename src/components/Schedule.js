import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Schedule.css'; // Import your CSS file

const ScheduleComponent = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:8080/schedule');
        setSchedule(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <h2>Schedule</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Movie ID</th>
              <th>Room ID</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry) => (
              <tr key={entry.schedule_id}>
                <td>{entry.date}</td>
                <td>{entry.start_time}</td>
                <td>{entry.end_time}</td>
                <td>{Number(entry.movie_id)}</td>
                <td>{Number(entry.room_id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleComponent;
