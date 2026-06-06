import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { useId } from 'react';
import styles from './InputComponent.module.css';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: 'default' | 'checkbox' | 'radio' | 'file';
  isRow?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ className = '', label, variant = 'default', isRow = false, id, ...props }, ref): ReactNode => {
    const variantClass = styles[variant] ? styles[variant] : '';
    const combinedClasses = classNames(variantClass, className);

    const containerClass = isRow ? styles.row : styles.column;

    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={containerClass}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <input id={inputId} className={combinedClasses} autoComplete="off" ref={ref} {...props} />
      </div>
    );
  }
);

InputComponent.displayName = 'InputComponent';

export default InputComponent;
