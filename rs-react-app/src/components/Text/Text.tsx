import type { HTMLAttributes, ReactNode } from 'react';

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

export default function Text({ children, as = 'p', className, ...props }: TextProps): ReactNode {
  const Tag = as;

  return (
    <Tag className={className || ''} {...props}>
      {children}
    </Tag>
  );
}
