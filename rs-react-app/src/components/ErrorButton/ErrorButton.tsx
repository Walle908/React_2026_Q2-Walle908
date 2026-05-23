import { useState, type ReactNode } from 'react';
import { Button } from '../Button/Button';

export default function ErrorButton(): ReactNode {
  const [isError, setError] = useState(false);

  const onClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error('Something went wrong...');
  }

  return (
    <Button variant="error" onClick={onClick}>
      Generate Error
    </Button>
  );
}
