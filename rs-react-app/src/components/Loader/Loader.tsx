import { Component, type ReactNode } from 'react';
import './Loader.css';

export default class Loader extends Component {
  override render(): ReactNode {
    return <div className="loader"></div>;
  }
}
