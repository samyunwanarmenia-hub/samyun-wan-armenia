"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner'; // Assuming you have a LoadingSpinner component

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/hy', '/ru', '/en', '/hy#about', '/ru#about', '/en#about', '/hy#benefits', '/ru#benefits', '/en#benefits', '/hy/products', '/ru/products', '/en/products', '/hy#testimonials', '/ru#testimonials', '/en#testimonials', '/hy#faq', '/ru#faq', '/en#faq', '/hy#contact', '/ru#contact', '/en#contact', '/hy/verify/qr', '/ru/verify/qr', '/en/verify/qr'];
  const authRoutes = ['/hy/auth/login', '/ru/auth/login', '/en/auth/login'];

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
      const isAuthRoute = authRoutes.includes(pathname);

      if (user && isAuthRoute) {
        // If user is logged in and tries to access auth page, redirect to home
        const langPrefix = pathname.split('/')[1];
        router.replace(`/${langPrefix}`);
      } else if (!user && !isPublicRoute && !isAuthRoute) {
        // If user is not logged in and tries to access a protected route, redirect to login
        const langPrefix = pathname.split('/')[1];
        router.replace(`/${langPrefix}/auth/login`);
      }
    }
  }, [user, isLoading, pathname, router, publicRoutes, authRoutes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthSessionProvider');
  }
  return context;
};