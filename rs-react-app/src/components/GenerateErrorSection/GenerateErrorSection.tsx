import { Component, type ReactNode } from 'react';
import '../../index.css';

export default class GenerateErrorSection extends Component {
  override render(): ReactNode {
    return (
      <>
        <section>
          <button className="button">Generate Error</button>
        </section>
      </>
    );
  }
}
