import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  btnType?:
    | 'btn-primary'
    | 'btn-secondary'
    | 'btn-success'
    | 'btn-neutral'
    | 'btn-warning'
    | 'btn-info'
    | 'btn-ghost'
    | 'btn-accent';
  className?: string;
  asLink?: boolean;
  href?: string;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  isSubmit?: boolean;
}

/**
 * daisyUI使用のButton
 *
 * @example
 * export default function Home() {
 *     return (
 *         <>
 *             <Button btnType='btn-warning' label="runcaaat" onClick={() => console.log('RunCat')} />
 *             <Button asLink href='#' label='これはLink継承のButtonコンポーネントです' btnType='btn-info' onClick={handleClick}/>
 *         </>
 *     );
 * }
 */
export const Button: React.FC<ButtonProps> = ({
  btnType = 'primary',
  label = 'Button',
  className,
  onClick,
  disabled = false,
  asLink = false,
  href = '',
  isSubmit = false,
}) => {
  if (asLink) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`btn ${btnType} ${disabled ? 'btn-disabled' : ''} ${className}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      className={`btn ${btnType} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={isSubmit ? 'submit' : 'button'}
    >
      {label}
    </button>
  );
};
