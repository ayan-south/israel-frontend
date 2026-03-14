'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import img from "../../assets/banner.jpeg";
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();


  const isTrack =
    pathname?.includes('/track-visa') || pathname?.includes('/track-visa-status');

  const navLinks = [
    {
      href: '/home',
      label: 'Home',
      className: pathname === '/home' || pathname === '/' ? 'active' : '',
    },
    {
      href: '/track-visa',
      label: 'Track Visa',
      className: pathname === '/track-visa' ? 'active' : '',
    },
    {
      href: '/track-visa-status',
      label: 'Track Visa Status',
      className: pathname === '/track-visa-status' ? 'active' : '',
    },
    {
      href: '/about',
      label: 'About',
      className: pathname === '/about' ? 'active' : '',
    },
  ];

  return (
    <>
     

      {/* ── TOP BANNER ── */}
      <div className="pub-banner">
        Israel police visa immigration services
      </div>

      {/* ── HERO SECTION ── */}
      <div className="pub-hero">
        <Image
  src={img}
  fill
  style={{ objectFit: "cover" }}
/>
        <div className="pub-hero-watermark">ISRAEL</div>
        <div className="pub-hero-card">
          <h1>Israel Visa</h1>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="pub-nav">
        {navLinks.map((l) => (
          <Link key={l.href + l.label} href={l.href} className={l.className}>
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}