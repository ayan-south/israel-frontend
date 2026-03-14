'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../assets/logo.jpeg';

const FlagIndia = () => (
  <svg width="24" height="16" viewBox="0 0 24 16">
    <rect width="24" height="5.33" fill="#FF9933" />
    <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
    <rect y="10.67" width="24" height="5.33" fill="#138808" />
    <circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.6" />
    <line x1="12" y1="6" x2="12" y2="10" stroke="#000080" strokeWidth="0.4" />
    <line x1="10" y1="8" x2="14" y2="8" stroke="#000080" strokeWidth="0.4" />
  </svg>
);

const FlagIsrael = () => (
  <svg width="24" height="16" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#FFFFFF" />
    <rect y="2" width="24" height="2.5" fill="#0038B8" />
    <rect y="11.5" width="24" height="2.5" fill="#0038B8" />
    <polygon points="12,5.5 14.6,10 9.4,10" fill="none" stroke="#0038B8" strokeWidth="0.9" />
    <polygon points="12,10.5 9.4,6 14.6,6" fill="none" stroke="#0038B8" strokeWidth="0.9" />
  </svg>
);

export default function Header({ activePage }) {
  const pathname = usePathname();
  const [indiaTime, setIndiaTime] = useState('');
  const [israelTime, setIsraelTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmtT = (tz) =>
        now.toLocaleString('en-GB', {
          timeZone: tz, weekday: 'short', day: '2-digit', month: 'short',
          year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        });
      setIndiaTime(fmtT('Asia/Kolkata'));
      setIsraelTime(fmtT('Asia/Jerusalem'));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isTrack = pathname?.includes('/track-form') || pathname?.includes('/result');

  const navLinks = [
    { href: '/home', label: 'Home', className: pathname === '/home' || pathname === '/' ? 'active' : '' },
    { href: '/unavailable', label: 'Important Information', className: '' },
    { href: '/track-application', label: 'Track your Application', className: `nav-track${isTrack ? ' active' : ''}` },
    { href: '/unavailable', label: 'IVP Centers', className: '' },
    { href: '/unavailable', label: 'Feedback / Complaint', className: '' },
    { href: '/unavailable', label: 'Contact Us', className: '' },
  ];

  return (
    <>
      {/* TOP HEADER */}
      <div className="pub-top" style={{ background: '#f4f4f4', borderBottom: '2px solid #d0d0d0' }}>
        <div className="pub-logo">
          <Image src={logo} alt="Company Logo" width={180} height={60} priority />
        </div>
        <div className="pub-timer">
          <div className="pub-timer-row">
            <span>{indiaTime} IST</span>
            <FlagIndia />
            <span className="country-name">India</span>
          </div>
          <div className="pub-timer-row">
            <span>{israelTime} IST</span>
            <FlagIsrael />
            <span className="country-name">Israel</span>
          </div>
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <nav className="pub-nav" style={{ background: '#9E9E9E' }}>
        {navLinks.map((l) => (
          <Link key={l.href + l.label} href={l.href} className={l.className}>{l.label}</Link>
        ))}

        {/* Hamburger (mobile) */}
        <button
          className={`pub-nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`pub-nav-mobile-menu${menuOpen ? ' open' : ''}`} style={{ background: '#5b5b5b' }}>
        {navLinks.map((l) => (
          <Link key={l.href + l.label} href={l.href} className={l.className}>{l.label}</Link>
        ))}
      </div>
    </>
  );
}