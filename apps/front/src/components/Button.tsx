import React from 'react';

type ButtonType = 'login' | 'bid' | 'register' | 'next' | 'cancel';
type ButtonSize = 'small' | 'medium' | 'large';

const defaultLabels: Record<ButtonType, string> = {
    login: 'ログイン',
    register: '新規登録',
    bid: '入札する',
    next: '次の車両へ',
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
        register: 'btn-primary',
        next: 'btn-neutral',
        bid: 'btn-neutral',
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