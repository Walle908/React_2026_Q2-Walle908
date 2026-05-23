import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getOneChar } from '@api/api';
import { type Character } from '@appTypes/types';
import { ErrorMessage, SearchParams } from '@constants/constants';

interface CardDetailedState {
  char: Character | null;
  errorMessage: ErrorMessage;
  isLoading: boolean;
}

export default function useCharacterDetails() {
  const [cardState, setCardState] = useState<CardDetailedState>({
    char: null,
    errorMessage: ErrorMessage.NO_ERROR,
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

        if (data === null) {
          setCardState({ char: null, errorMessage: ErrorMessage.CHAR_NOT_FOUND, isLoading: false });
          return;
        }

        setCardState({ char: data, errorMessage: ErrorMessage.NO_ERROR, isLoading: false });
      } catch {
        setCardState({ char: null, errorMessage: ErrorMessage.SERVER_ERROR, isLoading: false });
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
    closeCard,
    errorMessage: cardState.errorMessage,
    isLoading: cardState.isLoading,
  };
}
