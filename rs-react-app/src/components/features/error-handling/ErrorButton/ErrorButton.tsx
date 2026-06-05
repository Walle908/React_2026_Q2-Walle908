import { type ReactNode, useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { ErrorMessage } from '@/constants/constants';

export default function ErrorButton(): ReactNode {
  const [isError, setError] = useState(false);

  const onClick = () => {
    setError(true);
  };

  if (isError) {
    throw new Error(ErrorMessage.BOUNDARY_ERROR);
  }

  return (
    <Button color="error" onClick={onClick}>
      Generate Error
    </Button>
  );
}
