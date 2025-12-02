"use client"; // This is a client component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavbarProps } from '@/types/global';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { useLayoutContext } from '@/context/LayoutContext';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang } = useLayoutContext();
  const { getHomePath } = useNavigationUtils(currentLang);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navSurfaceClass = scrolled
    ? 'bg-white/90 dark:bg-slate-900/90 shadow-lg border-b border-white/40 dark:border-white/10'
    : 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border-b border-white/40 dark:border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]';

  const safeAreaStyle = {
    paddingTop: 'calc(env(safe-area-inset-top) + 20px)',
    paddingLeft: 'max(env(safe-area-inset-left), 10px)',
    paddingRight: 'max(env(safe-area-inset-right), 10px)',
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[120] transition-all duration-100 ${navSurfaceClass}`}
      style={safeAreaStyle}
    >
      <div className="container">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 md:gap-6 min-h-[68px]">
          <Link href={getHomePath()} className="flex items-center min-w-0 justify-self-start">
            <span className="block text-[clamp(17px,3.4vw,22px)] font-bold leading-snug tracking-[-0.01em] text-primary-800 dark:text-primary-200 whitespace-normal max-w-[280px] drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
              {t.hero.title}
            </span>
          </Link>

          <div className="flex items-center justify-end gap-2 justify-self-end">
            <div className="hidden md:flex items-center justify-end gap-3 rounded-full border border-white/40 dark:border-white/10 bg-white/70 dark:bg-slate-800/60 px-3 py-1.5 shadow-sm backdrop-blur">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <MobileNav scrolled={scrolled} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
