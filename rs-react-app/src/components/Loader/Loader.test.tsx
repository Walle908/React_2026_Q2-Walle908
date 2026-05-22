import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader Component', () => {
  it('should render the loader element with correct classname', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader-element');

    expect(loaderElement).toBeInTheDocument();
  });
});
