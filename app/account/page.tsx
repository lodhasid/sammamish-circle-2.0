"use client";
import * as React from 'react';
import Header from "../header";
import Footer from "../footer";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState("");
const router = useRouter();

const handleSignUp = () => {
  if (email) {
    // This sends the email to the /register page as a "search parameter"
    router.push(`/register?email=${encodeURIComponent(email)}`);
  } else {
    alert("Please enter a valid email to continue.");
  }
};

const handleLogin = () => {
  if (email) {
    // Pass the email to the login page so it's already filled in
    router.push(`/login?email=${encodeURIComponent(email)}`);
  } else {
    // If they haven't typed anything, just go to the login page
    router.push('/login');
  }
};
  return (
    <div className="signup-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Source+Serif+4:wght@600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .signup-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #142727 0%, #245e5e 93%);
          font-family: 'Inter', -apple-system, Roboto, Helvetica, sans-serif;
          color: white;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          width: 100%;
          height: 73px;
          background: rgba(27, 44, 31, 0);
          backdrop-filter: blur(9.2px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 80px;
          position: relative;
          z-index: 10;
        }

        .navbar-logo {
          font-family: 'Source Serif 4', -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 20px;
          color: #FFF;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .navbar-link {
          font-size: 15px;
          font-weight: 600;
          line-height: 20px;
          color: #FFF;
          text-transform: capitalize;
          text-decoration: none;
          cursor: pointer;
        }

        .main-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px;
        }

        .auth-card {
          width: 534px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.20);
          background: rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(10px);
          padding: 0;
          overflow: hidden;
        }

        .auth-card-header {
          padding: 9px 0;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.20);
        }

        .auth-card-title {
          font-size: 20px;
          font-weight: 600;
          color: #FFF4D2;
          line-height: 100px;
        }

        .auth-card-body {
          padding: 40px 44px 44px;
        }

        .welcome-text {
          font-size: 24px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.70);
          margin-bottom: 16px;
        }

        .input-field {
          width: 100%;
          height: 58px;
          padding: 0 24px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.30);
          background: rgba(255, 255, 255, 0.20);
          color: rgba(255, 255, 255, 0.70);
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          outline: none;
          transition: all 0.3s;
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.70);
        }

        .input-field:focus {
          border-color: rgba(255, 255, 255, 0.50);
          background: rgba(255, 255, 255, 0.25);
        }

        .helper-text {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.70);
          margin-top: 7px;
          padding-left: 15px;
        }

        .primary-button {
          width: 100%;
          height: 56px;
          padding: 18px 0 14px 0;
          border-radius: 9999px;
          border: none;
          background: #FFC300;
          box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.10), 0 10px 15px 0 rgba(0, 0, 0, 0.10);
          color: #000;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 30px;
        }

        .primary-button:hover {
          background: #ffcd1a;
          transform: translateY(-1px);
          box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.15), 0 12px 20px 0 rgba(0, 0, 0, 0.15);
        }

        .divider-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 40px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #FFF;
        }

        .divider-text {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.70);
        }

        .secondary-button {
          width: 100%;
          height: 58px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.30);
          background: rgba(255, 255, 255, 0.20);
          color: rgba(255, 255, 255, 0.70);
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.40);
        }

        .footer {
          width: 100%;
          background: #0C0C0C;
          padding: 64px 80px;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid #1F2937;
        }

        .footer-brand h3 {
          font-size: 20px;
          font-weight: 700;
          line-height: 28px;
          color: #FFF;
          margin-bottom: 16px;
        }

        .footer-brand p {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #9CA3AF;
          max-width: 448px;
        }

        .footer-section h4 {
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          color: #FFF;
          margin-bottom: 16px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links li a {
          font-size: 16px;
          font-weight: 400;
          color: #9CA3AF;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links li a:hover {
          color: #FFF;
        }

        .footer-social h4 {
          font-size: 16px;
          font-weight: 400;
          color: #FFF;
          margin-bottom: 16px;
        }

        .social-icons {
          display: flex;
          gap: 16px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          background: #1F2937;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .social-icon:hover {
          background: #374151;
          transform: translateY(-2px);
        }

        .footer-bottom {
          padding-top: 33;
        }

        .footer-copyright {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: #9CA3AF;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 24px;
            flex-wrap: wrap;
            height: auto;
            padding-top: 20px;
            padding-bottom: 20px;
          }

          .navbar-links {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 16px;
            gap: 16px;
          }

          .main-content {
            padding: 24px;
          }

          .auth-card {
            width: 100%;
            max-width: 534px;
          }

          .auth-card-body {
            padding: 24px;
          }

          .footer {
            padding: 48px 24px;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>

      <Header />
      {/* Main Content */}
      <main className="main-content">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-card-title">Log in or sign up</h1>
          </div>
          <div className="auth-card-body">
            <h2 className="welcome-text">Welcome to Sammamish Circle</h2>
            
            <input 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email" 
  className="input-field" 
  placeholder="Enter your email address"
/>
            <p className="helper-text">Check your email for a confirmation link.</p>

            <button onClick={handleSignUp} className="primary-button">
  Sign up
</button>

            <div className="divider-container">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>

            <button onClick={handleLogin} className="secondary-button">
  Continue with existing account
</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
