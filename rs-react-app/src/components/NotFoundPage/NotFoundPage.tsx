import { type ReactNode } from 'react';
import { Link } from 'react-router';
import './NotFoundPage.css';

export default function NotFoundPage(): ReactNode {
  return (
    <div className="not-found">
      <h2 className="error-page-title">Error 404</h2>
      <h2 className="error-page-title">Page not found</h2>
      <Link className="link" to="/">
        <button className="button">Go to main page</button>
      </Link>
    </div>
  );
}
