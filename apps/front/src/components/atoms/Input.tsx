import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputSize?: 'input-xs' | 'input-sm' | 'input-md' | 'input-lg';
  variant?:
  | 'input-bordered'
  | 'input-ghost'
  | 'input-primary'
  | 'input-secondary'
  | 'input-accent'
  | 'input-info'
  | 'input-success'
  | 'input-warning'
  | 'input-error';
}

/**
 * daisyUI使用のInput
 *
 * @example
 * export default function Home() {
 *     return (
 *         <>
 *             <Input
 *                 variant="input-bordered"
 *                 inputSize="input-md"
 *                 label="E-mail"
 *                 placeholder="emailを入力"/>
 *         </>
 *     );
 * }
 */
export const Input: React.FC<InputProps> = ({
  label,
  variant = 'input-bordered',
  inputSize = 'input-md',
  ...input
}) => {
  // ラベル指定のない場合はラベル要素ごと消す
  const Label: React.FC = () => {
    if (label) {
      return (
        <div className="label">
          <div className="label-text">{label}</div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <label htmlFor="form-control w-full">
      <Label />
      <input className={`input ${variant} ${inputSize} w-full`} {...input} />
    </label>
  );
};