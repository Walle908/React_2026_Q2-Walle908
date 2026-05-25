import Button from '@/components/ui/Button/Button';
import Text from '@/components/ui/Text/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { unselectAll } from '@/store/reducers/selectedCharactersSlice';
import { type Character } from '@/types/types';
import styles from './Flyout.module.css';

export default function Flyout() {
  const dispatch = useAppDispatch();
  const selectedChars = useAppSelector((state) => state.selectedCharacters.selectedChars);

  if (selectedChars.length === 0) return null;

  const handleDownload = (chars: Character[]) => {
    if (selectedChars.length === 0) return;
    const headers = ['Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location', 'URL'];

    const charsInfo = chars.map((c) => [
      c.name,
      c.status,
      c.species,
      c.type,
      c.gender,
      c.origin.name,
      c.location.name,
      c.url,
    ]);

    const csvContent = [headers, ...charsInfo].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${chars.length}_items.csv`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.flyout}>
      <Text as="span" size="md" weight="bold">
        {selectedChars.length} items selected
      </Text>

      <Button onClick={() => dispatch(unselectAll())}>Unselect all</Button>

      <Button onClick={() => handleDownload(selectedChars)}>Download</Button>
    </div>
  );
}
