'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">認証エラー</h1>
        <p className="text-white/80 mb-6">
          {error === 'CredentialsSignin' && 'メールアドレスまたはパスワードが正しくありません。'}
          {error === 'AccessDenied' && 'アクセスが拒否されました。'}
          {!error && '認証中にエラーが発生しました。'}
        </p>
        <Link
          href="/auth/signin"
          className="block w-full text-center bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
        >
          ログインページに戻る
        </Link>
      </div>
    </div>
  );
} 