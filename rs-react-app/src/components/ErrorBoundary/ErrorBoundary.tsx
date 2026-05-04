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
        <div className="errorBlock flexColumn">
          <h2 className="errorMessage">Someting went wrong...</h2>
          <button className="button" onClick={this.onClick}>
            Reset error
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
