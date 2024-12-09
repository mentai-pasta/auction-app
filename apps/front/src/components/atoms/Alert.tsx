import React, { InputHTMLAttributes } from 'react';

interface AlertProps {
    alertType?: 'alert' | 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info';
    label?: string;
    // daisyUIのbtnプロパティ
    btnType?: 'btn-success' | 'btn-error' | 'btn-warning' | 'btn-info';
    btnLabel?: string;
    btnDisplay?: boolean;
    onClick?: () => void;
};

/**
 * daisyUI使用のAlert
 * 
 * @example
 * export default function Home() {
 *     return (
 *             <Alert  type='alert-error' label='testText' btnType="btn-success" btnLabel="testButton" btnDisplay={false}> 
 *     );
 * }
 */

export const Alert: React.FC<AlertProps> = ({
    alertType,
    label,
    btnType,
    btnLabel,
    btnDisplay = false,
    onClick,
}) => {
    let btnHide = '';
    btnHide = btnDisplay ? 'block' : 'hidden';

    return (
        <div role='alert' className={`alert ${alertType}`}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 shrink-0 stroke-current'
                fill='none'
                viewBox='0 0 24 24'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
            <span>{label}</span>
            <div>
                <button className={`btn ${btnType} ${btnHide}`} onClick={onClick}> {btnLabel}</button>
            </div>
        </div >
    );
}