"use client"; // This is a client component

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavbarProps, TranslationKeys } from '@/types/global';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { useLayoutContext } from '@/context/LayoutContext';
import { navigationSections } from '@/data/navigationSections';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import InteractiveDiv from './InteractiveDiv';

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

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
    : 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]';

  const safeAreaStyle = {
    paddingTop: 'calc(env(safe-area-inset-top) + 10px)',
    paddingLeft: 'max(1rem, env(safe-area-inset-left))',
    paddingRight: 'max(1rem, env(safe-area-inset-right))',
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navSurfaceClass}`}
      style={safeAreaStyle}
    >
      <div className="mx-auto max-w-6xl px-0 sm:px-2">
        <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[auto,1fr,auto] md:gap-8 min-h-[64px]">
          <Link href={getHomePath()} className="flex items-center min-w-0">
            <span className="truncate text-lg sm:text-xl font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-50">
              {t.hero.title}
            </span>
          </Link>

          <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            {navigationSections.map((section) => (
              <li key={section.id}>
                <InteractiveDiv
                  whileHoverScale={1.06}
                  whileTapScale={0.96}
                  hoverY={0}
                  hoverShadow="none"
                >
                  <Link
                    href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                    className={`${getLinkClasses(section.id)} text-sm lg:text-[15px] font-medium leading-none tracking-tight px-2 py-2 rounded-md`}
                  >
                    {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                  </Link>
                </InteractiveDiv>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center justify-end gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <MobileNav scrolled={scrolled} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
