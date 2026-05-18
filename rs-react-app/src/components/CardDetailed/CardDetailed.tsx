import { useState, useEffect, type ReactNode } from 'react';
import { type Character } from '../../types/types';
import Loader from '../Loader/Loader';
import { useSearchParams } from 'react-router';
import { getOneChar } from '../../api/api';
import { SearchParams } from '../../constants/constants';
import './CardDetailed.css';

interface CardDetailedState {
  char: Character | null;
  isLoading: boolean;
}

export default function CardDetailed(): ReactNode {
  const [pageState, setPageState] = useState<CardDetailedState>({
    char: null,
    isLoading: false,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get(SearchParams.DETAILS);

  useEffect(() => {
    if (!id) return;

    const fetchCharacter = async () => {
      setPageState((prevState) => ({ ...prevState, isLoading: true }));

      try {
        const data = await getOneChar(id);
        setPageState({
          isLoading: false,
          char: data || null,
        });
      } catch (err) {
        console.error(`Error while searching: ${err}`);
        setPageState({
          isLoading: false,
          char: null,
        });
      }
    };

    fetchCharacter();
  }, [id]);

  function closeCard() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SearchParams.DETAILS);
    setSearchParams(newParams);
  }

  return (
    <>
      {pageState.isLoading ? (
        <Loader />
      ) : pageState.char ? (
        <div className="card-wrapper">
          <img className="card-img" src={pageState.char.image} alt={pageState.char.name} />

          <div className="card-description">
            <h2 className="card-title">{pageState.char.name || 'n/a'}</h2>
            <ul className="card-list">
              <li>
                <b>Status: </b>
                {pageState.char.status || 'n/a'}
              </li>
              <li>
                <b>Species: </b>
                {pageState.char.species || 'n/a'}
              </li>
              <li>
                <b>Type: </b>
                {pageState.char.type || 'n/a'}
              </li>
              <li>
                <b>Gender: </b>
                {pageState.char.gender || 'n/a'}
              </li>
              <li>
                <b>Origin: </b>
                {pageState.char.origin.name || 'n/a'}
              </li>
              <li>
                <b>Location: </b>
                {pageState.char.location.name || 'n/a'}
              </li>
            </ul>
          </div>
          <button className="button close-button" onClick={closeCard}>
            Close
          </button>
        </div>
      ) : (
        <h2>The character&apos;s info is not found</h2>
      )}
    </>
  );
}
