import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader Component', () => {
  it('should render the loader element with correct classname', () => {
    const { container } = render(<Loader />);

    const loaderElement = container.querySelector('.loader');

    expect(loaderElement).toBeInTheDocument();
  });
});
