import { Component, type ReactNode } from 'react';
import './ErrorButton.css';

interface ErrorBtnProps {
  children?: ReactNode;
}

interface ErrorBtnState {
  isError: boolean;
}

export default class ErrorButton extends Component<ErrorBtnProps, ErrorBtnState> {
  constructor(props: ErrorBtnProps) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  onClick = () => {
    this.setState({ isError: true });
  };

  override render(): ReactNode {
    const { isError } = this.state;
    if (isError) {
      throw new Error('Something went wrong...');
    }
    return (
      <button className="button error-button" onClick={this.onClick}>
        Generate Error
      </button>
    );
  }
}
