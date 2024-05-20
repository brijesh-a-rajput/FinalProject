import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLog = ({ token }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/activities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activity data', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      {activities.map(activity => (
        <div key={activity.id}>
          Visited {activity.url}{activity.path} for {activity.time_spent} seconds
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
