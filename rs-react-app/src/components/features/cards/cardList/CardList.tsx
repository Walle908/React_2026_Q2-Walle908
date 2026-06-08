import { type ReactNode } from 'react';
import { useAppSelector } from '@/store/hooks';
import Text from '@/components/ui/text/Text';
import Card from '../card/Card';
import styles from './CardList.module.css';

export default function CardList(): ReactNode {
  const submissions = useAppSelector((state) => state.forms.submissions);

  if (!submissions || submissions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text size="lg">No submissions found. Fill out a form to see it here!</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Text as="h2" size="lg" weight="bold" className={styles.title}>
        Submitted Forms
      </Text>

      <div className={styles.list}>
        {submissions.map((submission, index) => {
          const isLatest = index === submissions.length - 1;

          return <Card key={submission.id} data={submission} isLatest={isLatest} />;
        })}
      </div>
    </div>
  );
}
