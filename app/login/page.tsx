"use client";
import React, { useState, Suspense } from 'react';
import Header from "../header";
import Footer from "../footer";
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? "");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/account');
  };

  return (
    <div className="login-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Source+Serif+4:wght@600&display=swap');
        .login-page { min-height: 100vh; background: linear-gradient(180deg, #142727 0%, #245e5e 93%); font-family: 'Inter', sans-serif; color: white; display: flex; flex-direction: column; }
        .main-content { flex: 1; display: flex; align-items: center; justify-content: center; padding: 80px; }
        .auth-card { width: 534px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
        .auth-card-header { padding: 9px 0; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .auth-card-title { font-size: 20px; font-weight: 600; color: #FFF4D2; line-height: 100px; }
        .auth-card-body { padding: 40px 44px 44px; }
        .input-field { width: 100%; height: 58px; padding: 0 24px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.2); color: white; margin-bottom: 14px; outline: none; box-sizing: border-box; }
        .input-field::placeholder { color: rgba(255,255,255,0.6); }
        .primary-button { width: 100%; height: 56px; border-radius: 9999px; border: none; background: #FFC300; color: #000; font-weight: 600; cursor: pointer; margin-top: 33px; font-size: 16px; }
        .link-text { font-size: 14px; color: rgba(255,255,255,0.7); text-align: center; margin-top: 14px; cursor: pointer; }
        @media (max-width: 768px) { .main-content { padding: 24px; } .auth-card { width: 100%; } .auth-card-body { padding: 24px; } }
      `}</style>

      <Header />
      <main className="main-content">
        <form onSubmit={handleLogin} className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-card-title">Log in</h1>
          </div>
          <div className="auth-card-body">
            <input type="email" className="input-field" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="input-field" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="primary-button">Log in</button>
            <p className="link-text" onClick={() => router.push('/account')}>Continue without logging in</p>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{background: '#142727', height: '100vh'}} />}>
      <LoginContent />
    </Suspense>
  );
}
