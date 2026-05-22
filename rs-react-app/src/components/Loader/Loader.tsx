import { type ReactNode } from 'react';
import styles from './Loader.module.css';

export default function Loader(): ReactNode {
  return <div className={styles.loader}></div>;
}
