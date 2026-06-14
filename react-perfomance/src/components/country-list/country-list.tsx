import type { Country } from '../../types';
import { CountryCardMemo } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { useMemo, memo } from 'react';
import { List, type RowComponentProps } from 'react-window';

import styles from './country-list.module.css';

interface ListSharedData {
  filteredCountries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

const CARD_HEIGHT = 280;

const Row = ({
  index,
  style,
  filteredCountries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<ListSharedData>): React.JSX.Element => {
  const country = filteredCountries[index];

  return (
    <div style={style}>
      <CountryCardMemo
        key={country.id}
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    });

    if (sortField === 'name') {
      return filtered.sort((a, b) => {
        return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      });
    }

    const populationMap = new Map<string, number>();
    filtered.forEach((c) => {
      const pop = getPopulationForYear(createYearDataMap(c.data), selectedYear) || 0;
      populationMap.set(c.id, pop);
    });

    return filtered.sort((a, b) => {
      const popA = populationMap.get(a.id) || 0;
      const popB = populationMap.get(b.id) || 0;
      return sortOrder === 'asc' ? popA - popB : popB - popA;
    });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowSharedData = useMemo<ListSharedData>(
    () => ({
      filteredCountries,
      selectedYear,
      selectedColumns,
    }),
    [filteredCountries, selectedYear, selectedColumns]
  );

  if (filteredCountries.length === 0) {
    return <div className={styles.noDataMessage}>No countries match filters</div>;
  }

  return (
    <List
      rowCount={filteredCountries.length}
      rowHeight={CARD_HEIGHT}
      rowComponent={Row}
      className={styles.virtualListContainer}
      style={{ height: 560, width: '100%' }}
      rowProps={rowSharedData}
    />
  );
};

export const CountryListMemo = memo(CountryList);
