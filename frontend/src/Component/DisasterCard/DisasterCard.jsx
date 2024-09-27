import React from 'react';
import styles from './DisasterCard.module.css';
import { Link } from 'react-router-dom';

const DisasterCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="flood.jpeg" alt="" className={styles.image} />
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>Headlines....</p>
        <button className={styles.button}><Link to='/disReport'>Learn More</Link></button>
      </div>
      <div className={styles.card}>
        <img src="blizzard.jpeg" alt="" className={styles.image} />
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>Headlines...</p>
        <button className={styles.button}><Link to='/disReport'>Learn More</Link></button>
      </div>
      <div className={styles.card}>
        <img src="hurricane.jpeg" alt="" className={styles.image} />
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>Headlines...</p>
        <button className={styles.button}><Link to='/disReport'>Learn More</Link></button>
      </div>
    </div>
  );
};

export default DisasterCard;