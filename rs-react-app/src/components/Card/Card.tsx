import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { Link, useSearchParams } from 'react-router';
import './Card.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  const [searchParams] = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  newParams.set('character', String(char.id));

  return (
    <Link to={`/?${newParams.toString()}`} className="link">
      <div className="main-card-wrapper">
        <img className="card-img" src={char.image} alt={char.name} />
        <h2 className="card-title">{char.name || 'n/a'}</h2>
      </div>
    </Link>
  );
}
