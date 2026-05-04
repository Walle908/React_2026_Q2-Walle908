import { Component, type ReactNode } from 'react';
import './GenerateErrorSection.css';
import '../../index.css';

export default class GenerateErrorSection extends Component {
  override render(): ReactNode {
    return (
      <>
        <section className="error-section">
          <button className="button">Generate Error</button>
        </section>
      </>
    );
  }
}
