import { useState, type ReactNode } from 'react';
import './ErrorButton.css';

interface ErrorBtnProps {
  children?: ReactNode;
}

export default function ErrorButton({ children }: ErrorBtnProps): ReactNode {
  const [isError, setError] = useState(false);

  const onClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error('Something went wrong...');
  }

  return (
    <button className="button error-button" onClick={onClick}>
      {children || 'Generate Error'}
    </button>
  );
}
