import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { getOneChar } from '../api/api';
import { type Character } from '../types/types';
import { SearchParams, ErrorMessage } from '../constants/constants';

interface CardDetailedState {
  char: Character | null;
  isLoading: boolean;
  errorMessage: ErrorMessage;
}

export default function useCharacterDetails() {
  const [cardState, setCardState] = useState<CardDetailedState>({
    char: null,
    isLoading: false,
    errorMessage: ErrorMessage.NO_ERROR,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get(SearchParams.DETAILS);

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      setCardState((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const data = await getOneChar(id);

        if (data === null) {
          setCardState({ isLoading: false, char: null, errorMessage: ErrorMessage.CHAR_NOT_FOUND });
          return;
        }

        setCardState({ isLoading: false, char: data, errorMessage: ErrorMessage.NO_ERROR });
      } catch {
        setCardState({ isLoading: false, char: null, errorMessage: ErrorMessage.ANOTHER_ERROR });
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
    char: cardState.char,
    isLoading: cardState.isLoading,
    errorMessage: cardState.errorMessage,
    closeCard,
  };
}
