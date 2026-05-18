import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router';
import { getOneChar } from '../../api/api';
import CardDetailed from './CardDetailed';
import { mockCharacter, emptyMockCharacter } from '../../__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'react-router';

vi.mock('../../api/api', () => ({
  getOneChar: vi.fn(),
}));

describe('CardDetailed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Очищаем историю вызовов перед каждым тестом
  });

  it('should render character details correctly when all data is provided', async () => {
    vi.mocked(getOneChar).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<CardDetailed />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toBe(mockCharacter.image);
    });

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockCharacter.image);
    expect(image.alt).toBe(mockCharacter.name);

    const title = screen.getByRole('heading', { level: 2, name: mockCharacter.name });
    expect(title).toBeInTheDocument();

    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.type)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  it('should display "n/a" fallback text when properties are empty strings or missing', async () => {
    vi.mocked(getOneChar).mockResolvedValue(emptyMockCharacter);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<CardDetailed />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: 'n/a' })).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { level: 2, name: 'n/a' })).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item.textContent).toContain('n/a');
    });
  });

  it('should handle API failure and display fallback UI', async () => {
    vi.mocked(getOneChar).mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<CardDetailed />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: /The character's info is not found/i })
      ).toBeInTheDocument();
    });
  });

  it('should do nothing and render empty state if details id is missing in URL', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CardDetailed />} />
        </Routes>
      </MemoryRouter>
    );

    expect(getOneChar).not.toHaveBeenCalled();
    expect(
      screen.getByRole('heading', { level: 2, name: /The character's info is not found/i })
    ).toBeInTheDocument();
  });

  it('should remove details parameter from URL when Close button is clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(getOneChar).mockResolvedValue(mockCharacter);

    let currentParams: URLSearchParams | undefined;
    function TestComponent() {
      const [searchParams] = useSearchParams();
      currentParams = searchParams;
      return <CardDetailed />;
    }

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: mockCharacter.name })
      ).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(currentParams?.has('details')).toBe(false);
  });
});
