"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-container ${hasScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <Link href="/" className="logo-section">
          <h1 className="logo-text">SAMMAMISH CIRCLE</h1>
        </Link>

        <nav className="nav-menu">
          <Link href="/directory" className="nav-link">Directory</Link>
          <Link href="/submit" className="nav-link">Submit a Resource</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/references" className="nav-link">References</Link>
          <Link href="/account" className="nav-link">Account</Link>
          <Link href="/" className="nav-link">ENG
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 8.25L4.625 5.375L3.75 6.25L7.5 10L11.25 6.25L10.375 5.375L7.5 8.25Z" fill="#F5EDED"/>
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
