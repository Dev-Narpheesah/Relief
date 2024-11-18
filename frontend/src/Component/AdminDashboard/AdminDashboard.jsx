import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { FaEdit, FaTrash, FaCheck, FaHourglassHalf, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

export const shortenText = (text = "", n) => {
  return text.length > n ? text.substring(0, n).concat("...") : text;
};

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [userReports, setUserReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    disasterType: "",
    location: "",
    report: "",
  });
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user");
        const users = response.data;
        setUsers(users);
        setTotalReports(users.length);
        const uniqueRegions = new Set(users.map((user) => user.location));
        setTotalRegions(uniqueRegions.size);
      } catch (error) {
        toast.error("Error fetching users.");
        console.error("Error fetching users:", error);
      }
    };

    const formatDate = (dateTime) => {
      if (!dateTime) {
        return "Invalid Date";
      }
  
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
  
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC"
      };
  
      return new Intl.DateTimeFormat("en-US", options).format(date);
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

        setDisasters(fetchedDisasters);
      } catch (error) {
        console.error("Error fetching disasters:", error);
        toast.error("Failed to fetch disaster data.");
      }
    };

    fetchUsers();
    fetchDisasters();

    const intervalId = setInterval(fetchDisasters, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const goToReportDetails = (id) => navigate(`/report/${id}`);

  const openModal = (user) => {
    setSelectedUser(user);
    setUpdatedData({
      disasterType: user.disasterType,
      location: user.location,
      report: user.report,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/api/user/${selectedUser._id}`,
        updatedData
      );
      setUsers(users.map((user) =>
        user._id === selectedUser._id ? { ...user, ...updatedData } : user
      ));
      toast.success("User updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update user.");
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${userToDelete._id}`);
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      toast.success("User deleted successfully!");
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error("Failed to delete user:", error);
    }
  };

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

  return (
    <div className={styles.dashboard}>
    
      <div className={styles.topSection}>
        <img src="adHead.jpeg" alt="Header" className={styles.topImage} />
        <div className={styles.topText}>
          <h1>Dashboard</h1>
          <p>Manage users, reports, and more efficiently!</p>
        </div>
      </div>
      <div className={styles.statistics}>
        <div className={styles.statCard}><h3>Total Users</h3><p>{users.length}</p></div>
        <div className={styles.statCard}><h3>Total Reports</h3><p>{totalReports}</p></div>
        <div className={styles.statCard}><h3>Total Regions</h3><p>{totalRegions}</p></div>
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
  );
};

export default AdminDashboard;