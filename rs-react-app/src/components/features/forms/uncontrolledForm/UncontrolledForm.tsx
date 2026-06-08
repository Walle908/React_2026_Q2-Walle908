import { useState, type ReactNode, type SubmitEvent } from 'react';
import { useDispatch } from 'react-redux';
import Text from '@/components/ui/text/Text';
import InputComponent from '@/components/ui/inputComponent/InputComponent';
import Button from '@/components/ui/button/Button';
import PasswordStrengthIndicator from '@/components/ui/passwordStrengthIndicator/PasswordStrengthIndicator';
import * as yup from 'yup';
import { validationSchema } from '@/schema/validation';
import { useAppSelector } from '@/store/hooks';
import { addSubmission, type FormDataPayload } from '@/store/formSlice';
import convertToBase64 from '@/utils/convertToBase64';
import styles from '../Form.module.css';

type FormErrors = Record<string, string>;
interface UncontrolledFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: UncontrolledFormProps): ReactNode {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordValue, setPasswordValue] = useState('');
  const countries = useAppSelector((state) => state.forms.countries);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
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
      gender: formData.get('gender'),
      image: formData.get('image') as File,
      country: formData.get('country'),
      terms: formData.has('terms'),
    };

    try {
      const validData = await validationSchema.validate(formValues, { abortEarly: false });

      const base64Img = await convertToBase64(formValues.image);

      dispatch(
        addSubmission({
          id: `uncontrolled-${Date.now()}`,
          name: validData.name,
          age: validData.age,
          email: validData.email,
          password: validData.password,
          gender: validData.gender,
          country: validData.country,
          terms: validData.terms,
          image: base64Img,
        } as FormDataPayload)
      );

      form.reset();
      setErrors({});
      setPasswordValue('');
      onClose();
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
        <div className={styles.columnWrapper}>
          <InputComponent
            type="password"
            name="password"
            label="Password"
            error={errors.password}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <PasswordStrengthIndicator value={passwordValue} />
        </div>
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

        <InputComponent
          name="image"
          label="Upload an image (png/jpeg)"
          type="file"
          variant="file"
          error={errors.image}
        />

        <InputComponent
          type="text"
          name="country"
          list="countries"
          label="Country"
          error={errors.country}
        />

        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

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
        <Button type="submit" className={styles.submitBtn}>
          Submit
        </Button>
      </form>
    </div>
  );
}
