import * as React from 'react';
import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';
import SignInButton from './SignInButton';
import mini from '../public/mini.jpeg';

export default function Header() {
  return (
    <>
      <div className={styles.headerContainer}>
        <div>
          <Link to={'/'}>
            <img src={mini} alt='logo' className={styles.logo}></img>
          </Link>
        </div>
        <div className={styles.right}>
          <SignInButton></SignInButton>
        </div>
      </div>
      <div style={{ height: 64 }}></div>
    </>
  );
}
