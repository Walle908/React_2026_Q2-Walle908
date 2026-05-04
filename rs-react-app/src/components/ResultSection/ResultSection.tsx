import { Component, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import { ErrorMessage } from '../../constants/constants';
import Card from '../Card/Card';
import './ResultSection.css';
import '../../index.css';

interface ResultSectionProps {
  chars: Character[];
  errorMessage: ErrorMessage;
}

export default class ResultSection extends Component<ResultSectionProps> {
  override render(): ReactNode {
    const { chars, errorMessage } = this.props;

    return (
      <section>
        <div className="flexRow">
          {chars.length > 0
            ? chars.map((char) => <Card key={char.id} char={char}></Card>)
            : errorMessage !== ErrorMessage.NO_ERROR && (
                <h2 className="badResult">{errorMessage}</h2>
              )}
        </div>
      </section>
    );
  }
}
