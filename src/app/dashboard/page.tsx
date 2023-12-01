"use client"
import Agend from "@/components/Agend";
import styles from "./page.module.css"
import Link from 'next/link'

const Dashboard = () => {  
  return (
    <div className={styles.main}>
      <div className={styles.subMain}>
      <h1>Dashboard</h1>
      <div className={styles.divResults}>
        <Agend/>
      </div>
      <Link legacyBehavior href="/">
      <a>
        <button type="button" className={styles.btnDs}>
          Agendamento
        </button>
      </a>
    </Link>  
    </div>  
    </div>    
  );
};

export default Dashboard
