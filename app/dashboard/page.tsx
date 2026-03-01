"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from 'utils/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login'); // Strategic Shield: No entry for guests
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) return <div className="loading-state">Initializing Protocol...</div>;

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #0a1f1a 0%, #1a3a2e 100%);
          padding: 40px 80px;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
        }

        .welcome-card {
          grid-column: span 2;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
        }

        .resource-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .resource-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .resource-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }

        .status-pill {
          background: #FFC300;
          color: black;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 12px;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .resource-grid { grid-template-columns: 1fr; }
          .dashboard-container { padding: 20px; }
        }
      `}</style>

      <header className="dashboard-header">
        <div>
          <span className="status-pill">COMMUNITY MEMBER</span>
          <h1 style={{fontSize: '32px', fontWeight: '700'}}>Sammamish Circle</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="resource-grid">
        <div className="welcome-card">
          <h2 style={{fontSize: '24px', marginBottom: '8px'}}>Welcome back, Neighbor.</h2>
          <p style={{opacity: 0.7}}>Logged in as: {user.email}</p>
        </div>

        <div className="resource-card">
          <h3 style={{color: '#FFC300'}}>City Directory</h3>
          <p style={{fontSize: '14px', marginTop: '8px', opacity: 0.8}}>Access emergency contacts, schools, and city hall info.</p>
        </div>

        <div className="resource-card">
          <h3 style={{color: '#FFC300'}}>Resource Map</h3>
          <p style={{fontSize: '14px', marginTop: '8px', opacity: 0.8}}>Find recycling centers and public parks in Sammamish.</p>
        </div>

        <div className="resource-card">
          <h3 style={{color: '#FFC300'}}>Community Forum</h3>
          <p style={{fontSize: '14px', marginTop: '8px', opacity: 0.8}}>Join the conversation with other residents.</p>
        </div>
      </div>
    </div>
  );
}