import { Component, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import './Card.css';
import '../../index.css';

interface CardProps {
  char: Character;
}

export default class Card extends Component<CardProps> {
  override render(): ReactNode {
    const { char } = this.props;

    return (
      <>
        <div className="flexColumn cardWrapper">
          <img className="cardImg" src={char.image} alt={char.name}></img>

          <div className="flexColumn">
            <h2 className="cardTitle">{char.name ? char.name : 'n/a'}</h2>
            <ul className="cardList">
              <li>
                <b>Status: </b>
                {char.status ? char.status : 'n/a'}
              </li>
              <li>
                <b>Species: </b>
                {char.species ? char.species : 'n/a'}
              </li>
              <li>
                <b>Type: </b>
                {char.type ? char.type : 'n/a'}
              </li>
              <li>
                <b>Gender: </b>
                {char.gender ? char.gender : 'n/a'}
              </li>
              <li>
                <b>Origin: </b>
                {char.origin.name ? char.origin.name : 'n/a'}
              </li>
              <li>
                <b>Location: </b>
                {char.location.name ? char.location.name : 'n/a'}
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
