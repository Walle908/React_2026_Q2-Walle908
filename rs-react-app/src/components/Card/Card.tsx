import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import './Card.css';

interface CardProps {
  char: Character;
}

export default function Card({ char }: CardProps): ReactNode {
  return (
    <div className="card-wrapper">
      <img className="card-img" src={char.image} alt={char.name} />

      <div className="card-description">
        <h2 className="card-title">{char.name || 'n/a'}</h2>
        <ul className="card-list">
          <li>
            <b>Status: </b>
            {char.status || 'n/a'}
          </li>
          <li>
            <b>Species: </b>
            {char.species || 'n/a'}
          </li>
          <li>
            <b>Type: </b>
            {char.type || 'n/a'}
          </li>
          <li>
            <b>Gender: </b>
            {char.gender || 'n/a'}
          </li>
          <li>
            <b>Origin: </b>
            {char.origin.name || 'n/a'}
          </li>
          <li>
            <b>Location: </b>
            {char.location.name || 'n/a'}
          </li>
        </ul>
      </div>
    </div>
  );
}
