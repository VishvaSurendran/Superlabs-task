import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, icon }) => (
  <div className={styles.card}>
    <div className={styles.icon}>{icon}</div>
    <div>
      <p className={styles.title}>{title}</p>
      <h3 className={styles.value}>{value}</h3>
    </div>
  </div>
);

export default StatCard;