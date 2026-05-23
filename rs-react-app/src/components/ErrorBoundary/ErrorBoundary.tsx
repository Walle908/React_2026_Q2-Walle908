import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '@components/Button/Button';
import Text from '@components/Text/Text';
import { ErrorMessage } from '@constants/constants';
import styles from './ErrorBoundary.module.css';

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
        <div className={styles.errorBlock}>
          <Text as="h1" className={styles.errorMessage}>
            {ErrorMessage.BOUNDARY_ERROR}
          </Text>
          <Button onClick={this.onClick} variant="reset">
            Reset error
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
