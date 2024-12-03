import React from 'react';

type ButtonType = 'login' | 'auction' | 'register' | 'cancel';
type ButtonSize = 'small' | 'medium' | 'large';

const defaultLabels: Record<ButtonType, string> = {
    login: 'ログイン',
    register: '新規登録',
    bid: '落札',
    cancel: 'キャンセル',
};

interface ButtonProps {
    type: ButtonType;
    label?: string;
    onClick?: () => void;
    size?: ButtonSize;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    label,
    onClick,
    size = 'medium',
    disabled = false,
}) => {
    const variantClass = {
        login: 'btn-neutral',
        auction: 'btn-accent',
        register: 'btn-secondary',
        cancel: 'btn-error',
    }[type];

    const sizeClass = {
        small: 'btn-sm',
        medium: 'btn-md',
        large: 'btn-lg',
    }[size];

    return (
        <button
            className={`btn ${variantClass} ${sizeClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label || defaultLabels[type]}
        </button>
    );
};

export default Button;