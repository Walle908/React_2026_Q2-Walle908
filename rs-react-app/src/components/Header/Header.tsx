import { type ReactNode } from 'react';
import { Link } from 'react-router';
import ErrorButton from '../ErrorButton/ErrorButton';
import './Header.css';

export default function Header(): ReactNode {
  return (
    <header className="header">
      <Link className="link" to="/about">
        <button className="button">About</button>
      </Link>
      <ErrorButton />
    </header>
  );
}
