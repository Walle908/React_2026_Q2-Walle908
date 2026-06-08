import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { useId } from 'react';
import Text from '../text/Text';
import styles from './InputComponent.module.css';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: 'default' | 'checkbox' | 'radio' | 'file';
  error?: string;
  isRow?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  (
    { className = '', variant = 'default', isRow = false, label, error, ...props },
    ref
  ): ReactNode => {
    const variantClass = styles[variant] ? styles[variant] : '';
    const errorClass = error ? styles.error : '';
    const combinedClasses = classNames(variantClass, errorClass, className);

    const containerClass = isRow ? styles.row : styles.column;

    const generatedId = useId();
    const inputId = props.id ?? generatedId;

    return (
      <div className={containerClass}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <input id={inputId} className={combinedClasses} autoComplete="off" ref={ref} {...props} />
        <Text as="span" size="xs" weight="bold" color="error" className={styles.errorText}>
          {error || ''}
        </Text>
      </div>
    );
  }
);

InputComponent.displayName = 'InputComponent';
export default InputComponent;
