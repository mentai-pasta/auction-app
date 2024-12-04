import React, { InputHTMLAttributes } from "react";

interface AvatarProps {
    imageUrl?: string;
    online?: boolean;
    placeholder?: string;
    rounded?: boolean;
};

/**
 * daisyUI使用のAvatar
 * 
 * @example
 * export default function Home() {
 *     return (
 *         <>
 *             <Avatar 
 *                 online=true
 *                 placeholder="Jimbo"/>
 *         </>
 *     );
 * }
 */
export const Avatar: React.FC<AvatarProps> = ({ 
    online,
    placeholder,
    imageUrl,
    rounded = false
}) => {
    let onlineClass = '';
    if (online != null) {
        onlineClass = online? 'online' :'offline';
    }

    return (
        <div className={`avatar ${onlineClass} ${placeholder? 'placeholder': ''}`}>
            <div className={`bg-neutral text-neutral-content w-16 rounded-full ${rounded? 'rounded-full': 'rounded-md'}`}>
                {placeholder? (
                    <span className={`text-xl text-white`}>{placeholder}</span>
                ): (
                    <img src={imageUrl} alt="" />
                )}
            </div>
        </div>
    );
}