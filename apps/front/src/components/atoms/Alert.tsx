import React from 'react';

interface AlertProps {
  alertType?: 'alert' | 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info';
  children?: React.ReactNode;
  // daisyUIのbtnプロパティ
  btnType?: 'btn-success' | 'btn-error' | 'btn-warning' | 'btn-info';
  btnLabel?: string;
  btnDisplay?: boolean;
  onClick?: () => void;
}

/**
 * daisyUI使用のAlert
 *
 *
 * @example
 * export default function Home() {
 *     return (
 *             <Alert type='alert-error' btnType="btn-success" btnLabel="testButton" btnDisplay>
 *                 <p>テストアラート</p>
 *             </Alert>
 *     );
 * }
 */

export const Alert: React.FC<AlertProps> = ({
  alertType,
  children,
  btnType = 'btn-info',
  btnLabel = 'Button',
  btnDisplay = false,
  onClick,
}) => {
  /** ボタン表示がない場合はボタン要素ごと消す */
  const AlertButton = () => {
    return btnDisplay ? (
      <button className={`btn ${btnType}`} onClick={onClick}>
        {btnLabel}
      </button>
    ) : (
      <></>
    );
  };

  return (
    <div role="alert" className={`alert ${alertType} flex items-center`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-base-content h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div className="text-left">{children}</div>
      <AlertButton />
    </div>
  );
};
