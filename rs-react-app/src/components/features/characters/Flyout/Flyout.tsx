'use client';

import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { unselectAll } from '@/store/reducers/selectedCharactersSlice';
import { useTranslations } from 'next-intl';
import styles from './Flyout.module.css';

export default function Flyout() {
  const t = useTranslations('Flyout');
  const dispatch = useAppDispatch();
  const selectedChars = useAppSelector((state) => state.selectedCharacters.selectedChars);

  if (selectedChars.length === 0) return null;

  const selectedIds = selectedChars.map((c) => c.id).join(',');

  const downloadUrl = `/api/export?ids=${selectedIds}`;

  return (
    <div className={styles.flyout}>
      <Text as="span" size="md" weight="bold">
        {t('selectedItems', { count: selectedChars.length })}
      </Text>

      <Button onClick={() => dispatch(unselectAll())}>{t('unselect')}</Button>

      <a className={styles.link} href={downloadUrl} download>
        {t('download')}
      </a>
    </div>
  );
}
