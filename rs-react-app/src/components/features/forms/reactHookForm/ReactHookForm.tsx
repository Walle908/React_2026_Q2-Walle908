import { type ReactNode, type SubmitEvent } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { addSubmission, type FormDataPayload } from '@/store/formSlice';
import { validationSchema, type FormValidFields } from '@/schema/validation';
import convertToBase64 from '@/utils/convertToBase64';
import InputComponent from '@/components/ui/inputComponent/InputComponent';
import Text from '@/components/ui/text/Text';
import Button from '@/components/ui/button/Button';
import PasswordStrengthIndicator from '@/components/ui/passwordStrengthIndicator/PasswordStrengthIndicator';
import styles from '../Form.module.css';

interface ReactHookFormProps {
  onClose: () => void;
}

export default function ReactHookForm({ onClose }: ReactHookFormProps): ReactNode {
  const dispatch = useDispatch();
  const countries = useAppSelector((state) => state.forms.countries);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValidFields>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      terms: false,
    },
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });
  const isButtonDisabled = !isValid || Object.keys(errors).length > 0 || isSubmitting;

  const onSubmit: SubmitHandler<FormValidFields> = async (data) => {
    try {
      const fileList = data.image as unknown as FileList;
      const file = fileList && fileList.length > 0 ? fileList[0] : null;

      if (!file) return;

      const base64Img = await convertToBase64(file);
      const formPayload: FormDataPayload = {
        id: `controlled-${Date.now()}`,
        name: data.name,
        age: Number(data.age),
        email: data.email,
        password: data.password,
        country: data.country,
        gender: data.gender,
        terms: data.terms,
        image: base64Img,
      };

      dispatch(addSubmission(formPayload));
      reset();
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid || Object.keys(errors).length > 0 || isSubmitting) {
      return;
    }

    handleSubmit(onSubmit)(e);
  };

  return (
    <div className={styles.container}>
      <Text as="h1" size="lg" weight="bold" color="accent" className={styles.title}>
        React Hook Form (Controlled)
      </Text>

      <form className={styles.formContainer} onSubmit={handleFormSubmit} noValidate>
        <InputComponent
          type="text"
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <InputComponent
          type="number"
          inputMode="decimal"
          label="Age"
          error={errors.age?.message}
          {...register('age')}
        />

        <InputComponent
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className={styles.columnWrapper}>
          <InputComponent
            type="password"
            label="Password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordStrengthIndicator value={passwordValue} />
        </div>

        <InputComponent
          type="password"
          label="Confirm password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className={styles.columnWrapper}>
          <Text size="md" weight="bold">
            Gender
          </Text>
          <div className={styles.radioContainer}>
            <InputComponent
              type="radio"
              label="Male"
              variant="radio"
              isRow={true}
              value="male"
              {...register('gender')}
            />
            <InputComponent
              type="radio"
              label="Female"
              variant="radio"
              isRow={true}
              value="female"
              {...register('gender')}
            />
          </div>
          <Text as="span" size="xs" weight="bold" color="error" className={styles.groupError}>
            {errors.gender?.message}
          </Text>
        </div>

        <InputComponent
          label="Upload an image (png/jpeg)"
          type="file"
          variant="file"
          error={errors.image?.message}
          {...register('image')}
        />

        <InputComponent
          type="text"
          list="countries-controlled"
          label="Country"
          placeholder="Type to search country..."
          error={errors.country?.message}
          {...register('country')}
        />

        <datalist id="countries-controlled">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        <div className={styles.columnWrapper}>
          <InputComponent
            type="checkbox"
            label="I accept Terms and Conditions"
            variant="checkbox"
            isRow={true}
            {...register('terms')}
          />
          <Text as="span" size="xs" weight="bold" color="error" className={styles.groupError}>
            {errors.terms?.message}
          </Text>
        </div>

        <Button type="submit" className={styles.submitBtn} disabled={isButtonDisabled}>
          Submit
        </Button>
      </form>
    </div>
  );
}
