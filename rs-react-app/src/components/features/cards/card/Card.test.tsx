import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type FormDataPayload } from '@/store/formSlice';
import { mockPayload } from '@/test-utils/mocks';
import Card from './Card';

describe('Card Component', () => {
  it('должен успешно рендерить карточку с бэджем "Latest" и загруженным изображением', () => {
    render(<Card data={mockPayload} isLatest={true} />);

    expect(screen.getByText('Nick')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('nick@domain.io')).toBeInTheDocument();
    expect(screen.getByText('Latest')).toBeInTheDocument();

    const img = screen.getByRole('img', { name: 'Nick' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'data:image/png;base64,mockData');
    expect(screen.getByText('✓ Terms & Conditions Accepted')).toBeInTheDocument();
  });

  it('должен корректно рендерить обычную карточку без изображения и с отклоненным соглашением', () => {
    const customData: FormDataPayload = {
      ...mockPayload,
      image: '',
      terms: false,
    };

    render(<Card data={customData} isLatest={false} />);

    expect(screen.queryByText('Latest')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();

    expect(screen.getByText('No Image')).toBeInTheDocument();
    expect(screen.getByText('✗ Terms Declined')).toBeInTheDocument();
  });
});
