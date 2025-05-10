'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        router.push('/auth/signin');
      } else {
        const data = await response.json();
        setError(data.message || '登録中にエラーが発生しました。');
      }
    } catch (error) {
      setError('登録中にエラーが発生しました。');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="glass-card p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          新規登録
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              ユーザー名
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="city-input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="city-input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="city-input w-full"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            登録
          </button>
        </form>
        <p className="mt-4 text-center text-white/60">
          すでにアカウントをお持ちの方は
          <a href="/auth/signin" className="text-blue-400 hover:text-blue-300">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
} 