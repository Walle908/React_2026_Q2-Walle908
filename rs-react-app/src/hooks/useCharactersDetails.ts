import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { getOneChar } from '../api/api';
import { type Character } from '../types/types';
import { SearchParams } from '../constants/constants';

interface CardDetailedState {
  char: Character | null;
  isLoading: boolean;
}

export default function useCharacterDetails() {
  const [cardState, setCardState] = useState<CardDetailedState>({
    char: null,
    isLoading: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get(SearchParams.DETAILS);

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      setCardState((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const data = await getOneChar(id);
        setCardState({ isLoading: false, char: data || null });
      } catch (err) {
        console.error(`Error while searching: ${err}`);
        setCardState({ isLoading: false, char: null });
      }
    };

    fetchCharacter();
  }, [id]);

  const closeCard = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SearchParams.DETAILS);
    setSearchParams(newParams);
  };

  return {
    character: cardState.char,
    isLoading: cardState.isLoading,
    closeCard,
  };
}
