import { type ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './About.module.css';

export default function AboutPage(): ReactNode {
  return (
    <div className={styles.aboutWrapper}>
      <h2 className={styles.aboutTitle}>About App</h2>
      <p className={styles.aboutAuthor}>
        <span className={styles.aboutText}>Author:</span>
        <a className={`link ${styles.aboutLink}`} href="https://github.com/Walle908">
          Elena Valiullina
        </a>
      </p>
      <p className={styles.aboutCourse}>
        <span className={styles.aboutText}>Link to the course:</span>
        <a className={`link ${styles.aboutLink}`} href="https://rs.school/courses/reactjs">
          RS School React course
        </a>
      </p>
      <Link className="link" to="/">
        <button className="button">Go to main page</button>
      </Link>
    </div>
  );
}
