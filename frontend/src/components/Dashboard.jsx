import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Dashboard.css"; // New CSS file

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h2>Welcome Dashboard</h2>
        {user ? (
          <div className="user-details">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        ) : (
          <p className="loading-text">Loading your profile...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
