// components/user/concert/ConcertCard.tsx
import React from 'react';
import { useRouter } from 'next/router';

import styles from './ConcertCard.module.css';

type Concert = {
  id: number;
  title: string;
  singer: string;
  date: string;
};

interface ConcertCardProps {
  concert: Concert;
}

export default function ConcertCard({ concert }: ConcertCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/concert/${concert.id}`);
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <div className={styles.image}>image</div>
      <div className={styles.cardTitle}>{concert.title}</div>
      <div className={styles.cardSinger}>{concert.singer}</div>
      <div className={styles.cardDate}>
        {concert.date} ~ {concert.date}
      </div>
    </div>
  );
}
