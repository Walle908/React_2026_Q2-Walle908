import type { ReactNode } from 'react';
import Text from '@/components/ui/text/Text';
import InputComponent from '@/components/ui/inputComponent/InputComponent';
import Button from '@/components/ui/button/Button';
import styles from './UncontrolledForm.module.css';

export default function UncontrolledForm(): ReactNode {
  return (
    <div className={styles.container}>
      <Text as="h1" size="lg" weight="bold" color="accent">
        Uncontrolled form
      </Text>
      <form className={styles.formContainer}>
        <InputComponent label="Name" type="text" />
        <InputComponent label="Age" type="number" />
        <InputComponent label="Email" type="email" />
        <InputComponent label="Password" type="password" />
        <InputComponent label="Confirm password" type="password" />

        <div className={styles.radioWrapper}>
          <Text size="md" weight="bold">
            Gender
          </Text>
          <div className={styles.radioContainer}>
            <InputComponent label="Male" type="radio" variant="radio" isRow={true} value="male" />
            <InputComponent
              label="Female"
              type="radio"
              variant="radio"
              isRow={true}
              value="female"
            />
          </div>
        </div>

        <InputComponent
          label="I accept Terms and Conditions"
          type="checkbox"
          variant="checkbox"
          isRow={true}
        />

        <InputComponent label="Upload an image (png/jpeg)" type="file" variant="file" />
        <Button type="submit" className={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </div>
  );
}
