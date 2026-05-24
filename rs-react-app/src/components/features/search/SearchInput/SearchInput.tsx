import { type ComponentPropsWithoutRef } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps = ComponentPropsWithoutRef<'input'>;

export default function SearchInput({ className, onChange, value, ...props }: SearchInputProps) {
  return (
    <input
      className={`${styles.inputSearch} ${className || ''}`}
      onChange={onChange}
      placeholder="Search a character..."
      type="search"
      value={value}
      {...props}
    />
  );
}
