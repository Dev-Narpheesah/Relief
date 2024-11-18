import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { FaEdit, FaTrash, FaCheck, FaHourglassHalf, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserDashboard.module.css";

export const shortenText = (text = '', n) => {
  return text.length > n ? text.substring(0, n).concat("...") : text;
};

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [userReports, setUserReports] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user`);
        setUserReports(response.data);
      } catch (error) {
        console.error("Error fetching user reports:", error);
      }
    };

    const fetchDisasters = async () => {
      try {
        const response = await axios.get("https://api.reliefweb.int/v1/disasters", {
          params: { offset: 0, limit: 100, profile: "full" },
        });

        const fetchedDisasters = response.data.data.map((disaster) => {
          const disasterDate = new Date(disaster.fields.date.created);
          const isPast = disasterDate < new Date();
          return {
            id: disaster.id,
            name: disaster.fields.name,
            geo: disaster.fields.primary_country ? [disaster.fields.primary_country] : [],
            formattedDate: disaster.fields.date.created,
            isDone: isPast,
          };
        });
        fetchDisasters();
        setDisasters(fetchedDisasters);
      } catch (error) {
        console.error("Error fetching disasters:", error);
        toast.error("Failed to fetch disaster data.");
      }
    };

    fetchUserReports();
   
  }, [id, navigate]);


  const handleMarkAsDone = async (disasterId) => {
    try {
      const updatedDisasters = disasters.map((disaster) =>
        disaster.id === disasterId ? { ...disaster, isDone: !disaster.isDone } : disaster
      );
      setDisasters(updatedDisasters);
      toast.success("Disaster status updated!");
    } catch (error) {
      toast.error("Failed to mark disaster as done.");
      console.error("Failed to mark disaster as done:", error);
    }
  };

  const disastersToDisplay = disasters.slice(currentPage * 20, (currentPage + 1) * 20);

  if (userReports.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <div className={styles.welcomeMessage}>
          <h1>Hi, {user?.username}</h1>
          <p>Welcome to your dashboard!</p>
        </div>

        <div className={styles.tableSection}>
          <h2>Your Submitted Reports</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Disaster Type</th>
                <th>Location</th>
                <th>Report</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {userReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.disasterType}</td>
                  <td>{report.location}</td>
                  <td>{shortenText(report.report, 20)}</td>
                  <td>
                    {report.image?.url ? (
                      <img
                        src={report.image.url}
                        alt="Report"
                        className={styles.reportImage}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableSection}>
        <h2>Disaster Data</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Disaster Type</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {disastersToDisplay.map((disaster) => (
              <tr key={disaster.id}>
                <td>{disaster.name}</td>
                <td>{disaster.geo.length > 0 ? disaster.geo[0].country : "N/A"}</td>
                <td>{new Date(disaster.formattedDate).toLocaleDateString()}</td>
                <td>{disaster.isDone ? "Past Event" : "Ongoing"}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={disaster.isDone}
                    onChange={() => handleMarkAsDone(disaster.id)}
                  />
                  {disaster.isDone ? (
                    <FaCheck title="Past Event" className={styles.icon} />
                  ) : (
                    <FaHourglassHalf title="Ongoing Event" className={styles.icon} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className={styles.pageButton}
          >
            <FaArrowLeft />
          </button>
          <span>Page {currentPage + 1}</span>
          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) * 20 < disasters.length ? prev + 1 : prev)}
            disabled={(currentPage + 1) * 20 >= disasters.length}
            className={styles.pageButton}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserDashboard;
