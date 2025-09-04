"use client"; // This is a client component

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavbarProps, TranslationKeys } from '@/types/global';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLayoutContext } from '@/context/LayoutContext';
import { navigationSections } from '@/data/navigationSections'; // Import centralized data
import { useAuth } from '@/components/AuthSessionProvider'; // Import useAuth
import { supabase } from '@/integrations/supabase/client'; // Import supabase client
import { useRouter } from 'next/navigation'; // Import useRouter

const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLang, getLinkClasses } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);
  const { user, isLoading } = useAuth(); // Get user and isLoading from AuthContext
  const router = useRouter();

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${currentLang}/auth/login`); // Redirect to login page after logout
  };

  // Filter navigation sections based on authentication status
  const filteredNavigationSections = navigationSections.filter(section => {
    if (section.id === 'profile') {
      return user; // Only show profile link if user is logged in
    }
    return true; // Show other links always
  });

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-lg dark:bg-gray-800/95 dark:shadow-xl py-2' : 'bg-white/85 dark:bg-gray-900/85 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href={getHomePath()} className="flex items-center">
              <span className="text-gray-900 dark:text-gray-50 text-xl font-bold">
                {t.hero.title}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {filteredNavigationSections.map((section) => (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.1, color: '#22c55e' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={section.id === 'home' ? getHomePath() : getSectionPath(section.id)}
                  className={getLinkClasses(section.id)}
                >
                  {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth/User Info and Language Selector and Theme Toggle for Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link href={getSectionPath('profile')} className="text-gray-700 dark:text-gray-300 text-sm hover:text-primary-600 transition-colors">
                      Hello, {user.user_metadata?.first_name || user.email?.split('@')[0] || 'User'}!
                    </Link>
                    <motion.button
                      onClick={handleLogout}
                      className="px-3 py-1.5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => router.push(`/${currentLang}/auth/login`)}
                    className="px-3 py-1.5 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                )}
              </>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;