import { type ReactNode } from 'react';
import { type FormDataPayload } from '@/store/formSlice';
import Text from '@/components/ui/text/Text';
import styles from './Card.module.css';

interface CardProps {
  data: FormDataPayload;
  isLatest: boolean;
}

export default function Card({ data, isLatest }: CardProps): ReactNode {
  return (
    <div className={`${styles.card} ${isLatest ? styles.latestCard : ''}`}>
      {isLatest && (
        <Text as="span" size="xxs" weight="bold" className={styles.badge}>
          Latest
        </Text>
      )}

      {data.image ? (
        <div className={styles.imageWrapper}>
          <img src={data.image} alt={data.name} className={styles.avatar} />
        </div>
      ) : (
        <div className={styles.imagePlaceholder}>
          <Text as="span" size="xxs" weight="bold">
            No Image
          </Text>
        </div>
      )}

      <div className={styles.info}>
        <Text size="md" weight="bold" className={styles.name}>
          {data.name}
        </Text>
        <div className={styles.metadata}>
          <Text size="sm">
            <strong>Age:</strong> {data.age}
          </Text>
          <Text size="sm">
            <strong>Gender:</strong> {data.gender}
          </Text>
          <Text size="sm">
            <strong>Email:</strong> {data.email}
          </Text>
          <Text size="sm">
            <strong>Country:</strong> {data.country}
          </Text>
        </div>
        <Text
          size="sm"
          weight="bold"
          className={`${styles.terms} ${data.terms ? styles.accepted : styles.declined}`}>
          {data.terms ? '✓ Terms & Conditions Accepted' : '✗ Terms Declined'}
        </Text>
      </div>
    </div>
  );
}
