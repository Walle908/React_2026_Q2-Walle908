import { type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { ErrorMessage } from '../../constants/constants';
import Card from '../Card/Card';
import ErrorButton from '../ErrorButton/ErrorButton';
import './ResultSection.css';

interface ResultSectionProps {
  chars: Character[];
  errorMessage: ErrorMessage;
}

export default function ResultSection({ chars, errorMessage }: ResultSectionProps): ReactNode {
  return (
    <section className="result-section">
      <div className="cards-wrapper">
        {chars.length > 0
          ? chars.map((char) => <Card key={char.id} char={char} />)
          : errorMessage !== ErrorMessage.NO_ERROR && (
              <h2 className="bad-result">{errorMessage}</h2>
            )}
      </div>
      <ErrorButton />
    </section>
  );
}
