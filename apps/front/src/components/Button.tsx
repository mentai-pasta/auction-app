import React from 'react';

type ButtonType = 'login' | 'register' | 'bid' | 'next' | 'back' | 'cancel';
type ButtonSize = 'small' | 'medium' | 'large';

const defaultLabels: Record<ButtonType, string> = {
    login: 'ログイン',
    register: '新規登録',
    bid: '入札する',
    next: '次の車両へ',
    back: '前の車両へ',
    cancel: 'キャンセル',
};

interface ButtonProps {
    type: ButtonType;
    label?: string;
    onClick?: () => void;
    size?: ButtonSize;
    disabled?: boolean;
}
/**
 * ボタンコンポーネント
 * @param type ボタンの種類
 * @param onClick クリック時のコールバック
 * @param size ボタンのサイズ
 * @param disabled ボタンの無効化
 */

/** 
 *  <Button type="login(typeName)" onClick={() => console.log('clicked')} />
 *  
 */
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
        bid: 'btn-neutral',
        next: 'btn-primary',
        back: 'btn-neutral',
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