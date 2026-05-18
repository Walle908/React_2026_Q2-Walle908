import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { Link, useSearchParams } from 'react-router';
import './Card.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  const [searchParams] = useSearchParams();
  return (
    <Link to={`/character/${char.id}?${searchParams.toString()}`} className="card-link">
      <div className="main-card-wrapper">
        <img className="card-img" src={char.image} alt={char.name} />
        <h2 className="card-title">{char.name || 'n/a'}</h2>
      </div>
    </Link>
  );
}
