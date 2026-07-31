'use client';

import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { unselectAll } from '@/store/reducers/selectedCharactersSlice';
import { type Character } from '@/types/types';
import { generateCsvAction } from '@/app/actions';
import { useTranslations } from 'next-intl';
import styles from './Flyout.module.css';

export default function Flyout() {
  const t = useTranslations('Flyout');
  const dispatch = useAppDispatch();
  const selectedChars = useAppSelector((state) => state.selectedCharacters.selectedChars);

  if (selectedChars.length === 0) return null;

  const handleDownload = async (chars: Character[]) => {
    if (chars.length === 0) return;
    const result = await generateCsvAction(chars);

    if (result.success && result.data) {
      const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${chars.length}_items.csv`;

      a.click();

      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={styles.flyout}>
      <Text as="span" size="md" weight="bold">
        {t('selectedItems', { count: selectedChars.length })}
      </Text>

      <Button onClick={() => dispatch(unselectAll())}>{t('unselect')}</Button>

      <Button onClick={() => handleDownload(selectedChars)}>{t('download')}</Button>
    </div>
  );
}
