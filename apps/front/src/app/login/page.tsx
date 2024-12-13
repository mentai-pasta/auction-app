'use client';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { useEffect, useState } from 'react';

export default function Home() {
    return (
        <>
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-neutral text-white p-8 rounded-lg shadow-lg w-480">
                    <h2 className="text-center text-xl font-semibold mb-4">ログイン</h2>
                    <form className="flex flex-col space-y-4">
                        <Input name="loginId" label="ログインID" placeholder="ログインID" />
                        <Input name="password" label="パスワード" placeholder="パスワード" />
                        <Button btnType="btn-primary" label="ログイン" />
                    </form>
                    <p className="text-center text-sm mt-4">
                        アカウントをお持ちでない方はこちら
                    </p>
                </div>
            </main>
        </>
    );
}