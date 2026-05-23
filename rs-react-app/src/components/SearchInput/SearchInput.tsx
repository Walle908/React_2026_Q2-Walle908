import { type ComponentPropsWithoutRef } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps extends ComponentPropsWithoutRef<'input'> {}

export default function SearchInput({ className, value, onChange, ...props }: SearchInputProps) {
  return (
    <input
      type="search"
      placeholder="Search a character..."
      className={`${styles.inputSearch} ${className || ''}`}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
