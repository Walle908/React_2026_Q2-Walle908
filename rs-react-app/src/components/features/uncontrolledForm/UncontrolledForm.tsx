import { useState, type ReactNode, type SyntheticEvent } from 'react';
import Text from '@/components/ui/text/Text';
import InputComponent from '@/components/ui/inputComponent/InputComponent';
import Button from '@/components/ui/button/Button';
import * as yup from 'yup';
import { validationSchema } from '@/schema/validation';
import styles from './UncontrolledForm.module.css';

type FormErrors = Record<string, string>;

export default function UncontrolledForm(): ReactNode {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);

    const formValues = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender') || undefined,
      terms: formData.has('terms'),
      image: formData.get('image') as File,
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      console.log('Form is valid! Submitting data:', formValues);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: FormErrors = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Text as="h1" size="lg" weight="bold" color="accent">
        Uncontrolled form
      </Text>
      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <InputComponent type="text" name="name" label="Name" error={errors.name} />
        <InputComponent
          type="number"
          name="age"
          inputMode="decimal"
          label="Age"
          error={errors.age}
        />
        <InputComponent type="email" name="email" label="Email" error={errors.email} />
        <InputComponent type="password" name="password" label="Password" error={errors.password} />
        <InputComponent
          type="password"
          name="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword}
        />

        <div className={styles.columnWrapper}>
          <Text size="md" weight="bold">
            Gender
          </Text>
          <div className={styles.radioContainer}>
            <InputComponent
              type="radio"
              name="gender"
              label="Male"
              variant="radio"
              isRow={true}
              value="male"
            />
            <InputComponent
              type="radio"
              name="gender"
              label="Female"
              variant="radio"
              isRow={true}
              value="female"
            />
          </div>
          <Text as="span" size="xs" weight="bold" color="error" className={styles.groupError}>
            {errors.gender}
          </Text>
        </div>

        <div className={styles.columnWrapper}>
          <InputComponent
            type="checkbox"
            name="terms"
            label="I accept Terms and Conditions"
            variant="checkbox"
            isRow={true}
          />
          <Text as="span" size="xs" weight="bold" color="error" className={styles.groupError}>
            {errors.terms}
          </Text>
        </div>
        <InputComponent
          name="image"
          label="Upload an image (png/jpeg)"
          type="file"
          variant="file"
          error={errors.image}
        />
        <Button type="submit" className={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </div>
  );
}
