'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../atoms/Button';

interface HeaderProps {
  className?: string;
  userInfo?: {
    message: string;
    customer_id: string;
  } | null;
}

export const Header = ({ className, userInfo }: HeaderProps) => {
  const [isLogin] = useState<boolean>(userInfo !== null);

  const Navigation = () => {
    if (isLogin) {
      return (
        <>
          <Button label="お問い合わせ" btnType="btn-ghost" />
          <div className="avatar placeholder dropdown">
            <div
              className="w-12 rounded-md bg-base-200 btn m-1"
              role="button"
              tabIndex={0}
            >
              <span className="text-sm">TEST</span>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          <Button label="🔔" />
        </>
      );
    }
    return (
      <>
        <Button label="お問い合わせ" btnType="btn-ghost" />
        <Button label="ログイン" btnType="btn-neutral" asLink href="/login" />
        <Button label="新規登録" btnType="btn-primary" asLink href="/register" />
        <Button label="🔔" />
      </>
    );
  };

  return (
    <div className={`navbar bg-base-100 shadow-md rounded-2xl h-16 ${className}`}>
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          KuruMart
        </Link>
      </div>
      <div className="flex-none gap-3">
        <Navigation />
      </div>
    </div>
  );
};
