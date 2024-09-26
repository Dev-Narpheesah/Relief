import React from 'react';
import styles from './DisasterCard.module.css';

const DisasterCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="flood.jpeg" alt="" className={styles.image} />
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>Headlines....</p>
        <button className={styles.button}>Learn More</button>
      </div>
      <div className={styles.card}>
        <img src="blizzard.jpeg" alt="" className={styles.image} />
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>Headlines...</p>
        <button className={styles.button}>Learn More</button>
      </div>
      <div className={styles.card}>
        <img src="hurricane.jpeg" alt="" className={styles.image} />
        <h1 className={styles.title}>Title</h1>
        <p className={styles.description}>Headlines...</p>
        <button className={styles.button}>Learn More</button>
      </div>
    </div>
  );
};

export default DisasterCard;