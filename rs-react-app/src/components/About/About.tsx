import { type ReactNode } from 'react';
import { Link } from 'react-router';
import './About.css';

export default function AboutPage(): ReactNode {
  return (
    <div className="about-wrapper">
      <h2 className="about-title">About App</h2>
      <p className="about-author">
        <span>Author:</span>
        <a className="link about-link" href="https://github.com/Walle908">
          Elena Valiullina
        </a>
      </p>
      <p className="about-course">
        <span>Link to the course:</span>
        <a className="link about-link" href="https://rs.school/courses/reactjs">
          RS School React course
        </a>
      </p>
      <Link className="link" to="/">
        <button className="button">Go to main page</button>
      </Link>
    </div>
  );
}
