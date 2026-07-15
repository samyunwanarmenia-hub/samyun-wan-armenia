"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavbarProps } from '@/types/global';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { useLayoutContext } from '@/context/LayoutContext';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { navigationSections, type NavSection } from '@/data/navigationSections';
import { ShieldCheck } from 'lucide-react';

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navSurfaceClass = scrolled
    ? 'bg-[color-mix(in_srgb,var(--surface-glass)_94%,transparent)] shadow-[0_4px_22px_rgba(20,83,45,0.10)] border-b border-[var(--border-premium)] backdrop-blur-xl'
    : 'bg-[color-mix(in_srgb,var(--surface-glass)_86%,transparent)] border-b border-[var(--border-soft)] backdrop-blur-md';

  const primaryIds: Array<NavSection['id']> = ['home', 'about', 'products', 'official', 'blogs', 'faq'];
  const primarySections = primaryIds
    .map(id => navigationSections.find(s => s.id === id))
    .filter((s): s is NavSection => Boolean(s));
  const contactSection = navigationSections.find(s => s.id === 'contact');
  const trackOrderSection = navigationSections.find(s => s.id === 'track-order');

  return (
    <header
      className={`sticky inset-x-0 top-0 z-[120] transition-all duration-200 ${navSurfaceClass}`}
      role="banner"
    >
      <div className="container flex min-h-[64px] items-center justify-between gap-4 py-2.5">

        {/* Logo */}
        <Link
          href={getHomePath()}
          className="group flex min-w-0 shrink-0 items-center gap-3"
          aria-label={t.hero.title}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--accent),var(--gold))] text-xs font-black text-white shadow-[0_8px_18px_rgba(21,128,61,0.22)] ring-1 ring-white/20"
            aria-hidden
          >
            SW
          </span>
          <div className="hidden min-w-0 sm:block">
            <span className="block truncate text-base font-black tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] sm:text-lg">
              Samyun Wan
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--accent)]">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              Official Armenia
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-card)_82%,transparent)] px-1.5 py-1.5 shadow-sm lg:flex"
          aria-label="Primary navigation"
        >
          {primarySections.map(section => (
            <Link
              key={section.id}
              href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
              className={`rounded-md px-3.5 py-1.5 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${getLinkClasses?.(section.id) ?? ''}`}
            >
              {t.nav[section.labelKey]}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {trackOrderSection && (
            <Link
              href={getSectionPath(trackOrderSection.id)}
              className="hidden items-center gap-1.5 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-card)_82%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--border-premium)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)] md:inline-flex"
            >
              {t.nav[trackOrderSection.labelKey]}
            </Link>
          )}
          {contactSection && (
            <Link
              href={getSectionPath(contactSection.id)}
              className="hidden items-center gap-1.5 rounded-lg bg-[linear-gradient(135deg,var(--cta),var(--cta-strong))] px-5 py-2 text-sm font-bold text-white shadow-[0_6px_18px_rgba(3,105,161,0.26)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(3,105,161,0.34)] active:scale-[0.98] sm:inline-flex"
            >
              {t.nav[contactSection.labelKey]}
            </Link>
          )}
          <LanguageSwitcher />
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
