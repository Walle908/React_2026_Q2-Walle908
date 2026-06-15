import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

describe('PasswordStrengthIndicator Component', () => {
  it('должен корректно обрабатывать пустой пароль (0%)', () => {
    render(<PasswordStrengthIndicator value="" />);

    expect(screen.getByText('0%')).toBeInTheDocument();

    const bulletIcons = screen.getAllByText('•');
    expect(bulletIcons).toHaveLength(4);
  });

  it('должен корректно обрабатывать слабый пароль (25%)', () => {
    render(<PasswordStrengthIndicator value="password" />);

    expect(screen.getByText('25%')).toBeInTheDocument();

    expect(screen.getByText('✓')).toBeInTheDocument();

    expect(screen.getAllByText('•')).toHaveLength(3);
  });

  it('должен корректно обрабатывать средний пароль (50%)', () => {
    render(<PasswordStrengthIndicator value="password123" />);

    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getAllByText('✓')).toHaveLength(2);
    expect(screen.getAllByText('•')).toHaveLength(2);
  });

  it('должен корректно обрабатывать хороший пароль (75%)', () => {
    render(<PasswordStrengthIndicator value="Password123" />);

    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getAllByText('✓')).toHaveLength(3);
    expect(screen.getAllByText('•')).toHaveLength(1);
  });

  it('должен корректно обрабатывать сильный пароль (100%)', () => {
    render(<PasswordStrengthIndicator value="Password123!" />);

    expect(screen.getByText('100%')).toBeInTheDocument();

    const checkmarkIcons = screen.getAllByText('✓');
    expect(checkmarkIcons).toHaveLength(4);

    expect(screen.queryByText('•')).not.toBeInTheDocument();
  });
});
