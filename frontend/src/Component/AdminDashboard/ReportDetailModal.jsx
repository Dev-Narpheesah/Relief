import React from 'react';
import  styles from './ReportDetailModal.module.css';

const ReportDetailModal = ({ report, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{report.title}</h3>
        <p><strong>Date:</strong> {report.date}</p>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>Details:</strong> {report.details}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportDetailModal;
