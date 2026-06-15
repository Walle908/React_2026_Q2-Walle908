import { type ReactNode } from 'react';
import Text from '../text/Text';
import styles from './PasswordStrengthIndicator.module.css';

interface PasswordStrengthIndicatorProps {
  value: string;
}

const getPasswordStrength = (password: string) => {
  const result = {
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecial: false,
  };

  if (!password) return { ...result, percent: 0 };

  result.hasNumber = /\d/.test(password);
  result.hasUppercase = /\p{Lu}/u.test(password);
  result.hasLowercase = /\p{Ll}/u.test(password);
  result.hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/]/.test(password);

  const score = [
    result.hasNumber,
    result.hasUppercase,
    result.hasLowercase,
    result.hasSpecial,
  ].filter(Boolean).length;

  return {
    ...result,
    percent: score * 25,
  };
};

export default function PasswordStrengthIndicator({
  value,
}: PasswordStrengthIndicatorProps): ReactNode {
  const strength = getPasswordStrength(value);

  const getProgressBarColor = (percent: number) => {
    if (percent === 0) return '#6b6b6b';
    if (percent <= 25) return '#e63946';
    if (percent <= 50) return '#ff9f1c';
    if (percent <= 75) return '#ffdf1c';
    return '#2e7d32';
  };

  const currentColor = getProgressBarColor(strength.percent);

  return (
    <div className={styles.strengthContainer}>
      <div className={styles.progressLabel}>
        <Text as="span" size="xs" weight="bold">
          Password Strength:
        </Text>
        <Text as="span" size="xs" weight="bold">
          {strength.percent}%
        </Text>
      </div>

      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{
            width: `${strength.percent}%`,
            backgroundColor: currentColor,
          }}
        />
      </div>

      <div className={styles.rulesContainer}>
        <Text
          as="span"
          size="xxs"
          weight="bold"
          className={strength.hasNumber ? styles.validRule : styles.invalidRule}>
          <Text as="span" size="xxs" weight="bold" className={styles.iconBox}>
            {strength.hasNumber ? '✓' : '•'}
          </Text>
          Number
        </Text>
        <Text
          as="span"
          size="xxs"
          weight="bold"
          className={strength.hasUppercase ? styles.validRule : styles.invalidRule}>
          <Text as="span" size="xxs" weight="bold" className={styles.iconBox}>
            {strength.hasUppercase ? '✓' : '•'}
          </Text>
          Uppercase
        </Text>
        <Text
          as="span"
          size="xxs"
          weight="bold"
          className={strength.hasLowercase ? styles.validRule : styles.invalidRule}>
          <Text as="span" size="xxs" weight="bold" className={styles.iconBox}>
            {strength.hasLowercase ? '✓' : '•'}
          </Text>
          Lowercase
        </Text>
        <Text
          as="span"
          size="xxs"
          weight="bold"
          className={strength.hasSpecial ? styles.validRule : styles.invalidRule}>
          <Text as="span" size="xxs" weight="bold" className={styles.iconBox}>
            {strength.hasSpecial ? '✓' : '•'}
          </Text>
          Special Char
        </Text>
      </div>
    </div>
  );
}
