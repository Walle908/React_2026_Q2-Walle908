import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
  it('should render the loader element with correct classname', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader-element');

    expect(loaderElement).toBeInTheDocument();
  });
});
