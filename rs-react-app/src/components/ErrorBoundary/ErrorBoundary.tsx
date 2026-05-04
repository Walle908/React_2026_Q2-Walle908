import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface ErrorProps {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  onClick = () => {
    this.setState({ hasError: false });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-block">
          <h2 className="error-message">Someting went wrong...</h2>
          <button className="button reset-button" onClick={this.onClick}>
            Reset error
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
