import type { Country } from '../../types';
import { DataTable } from '../data-table/data-table';
import {
  getPopulationForYear,
  getCo2ForYear,
  createYearDataMap,
} from '../../utils/data-transformers';
import { formatNumber } from '../../utils/format-utils';
import { useMemo, memo } from 'react';

import styles from './country-card.module.css';

type CountryCardProps = {
  country: Country;
  selectedYear: number;
  selectedColumns: string[];
};

const CountryCard = ({ country, selectedYear, selectedColumns }: CountryCardProps) => {
  const yearDataMap = useMemo(() => {
    return createYearDataMap(country.data);
  }, [country.data]);

  const population = useMemo(() => {
    return getPopulationForYear(yearDataMap, selectedYear);
  }, [yearDataMap, selectedYear]);

  const co2 = useMemo(() => {
    return getCo2ForYear(yearDataMap, selectedYear);
  }, [yearDataMap, selectedYear]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{country.id}</h3>
        {country.iso_code && <span className={styles.isoCode}>{country.iso_code}</span>}
      </div>

      <div className={styles.stats}>
        <div>
          Population ({selectedYear}): {formatNumber(population)}
        </div>
        <div>
          CO₂ Emissions ({selectedYear}): {formatNumber(co2)} tonnes
        </div>
      </div>

      <DataTable data={country.data} year={selectedYear} columns={selectedColumns} />
    </div>
  );
};

export const CountryCardMemo = memo(CountryCard, (prevProps, nextProps) => {
  if (prevProps.country !== nextProps.country) {
    return false;
  }

  if (prevProps.selectedYear !== nextProps.selectedYear) {
    return false;
  }

  if (prevProps.selectedColumns.length !== nextProps.selectedColumns.length) {
    return false;
  }

  return prevProps.selectedColumns.every((col, index) => col === nextProps.selectedColumns[index]);
});
