"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useLayoutContext } from '@/context/LayoutContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const LoginPage = () => {
  const { t, currentLang } = useLayoutContext();
  const router = useRouter();
  const redirectTo = `/${currentLang}`; // Redirect to the home page of the current language

  const appearance = {
    theme: ThemeSupa,
    variables: {
      default: {
        colors: {
          brand: 'hsl(var(--primary-600))', // Tailwind primary-600
          brandAccent: 'hsl(var(--primary-500))', // Tailwind primary-500
          brandButtonText: 'white',
          defaultButtonBackground: 'hsl(var(--gray-200))',
          defaultButtonBackgroundHover: 'hsl(var(--gray-300))',
          defaultButtonBorder: 'hsl(var(--gray-300))',
          defaultButtonText: 'hsl(var(--gray-800))',
          inputBackground: 'hsl(var(--gray-100))',
          inputBorder: 'hsl(var(--gray-200))',
          inputBorderHover: 'hsl(var(--primary-300))',
          inputBorderFocus: 'hsl(var(--primary-600))',
          inputText: 'hsl(var(--gray-900))',
          inputLabelText: 'hsl(var(--gray-700))',
          messageText: 'hsl(var(--gray-700))',
          messageBackground: 'hsl(var(--primary-100))',
          messageBorder: 'hsl(var(--primary-200))',
          anchorTextColor: 'hsl(var(--primary-600))',
          anchorTextHoverColor: 'hsl(var(--primary-700))',
        },
        radii: {
          borderRadiusButton: '0.5rem', // rounded-lg
          buttonBorderRadius: '0.5rem',
          inputBorderRadius: '0.5rem',
        },
      },
      dark: {
        colors: {
          brand: 'hsl(var(--primary-400))', // Tailwind primary-400 for dark mode
          brandAccent: 'hsl(var(--primary-300))', // Tailwind primary-300 for dark mode
          brandButtonText: 'white',
          defaultButtonBackground: 'hsl(var(--gray-700))',
          defaultButtonBackgroundHover: 'hsl(var(--gray-600))',
          defaultButtonBorder: 'hsl(var(--gray-600))',
          defaultButtonText: 'hsl(var(--gray-50))',
          inputBackground: 'hsl(var(--gray-700))',
          inputBorder: 'hsl(var(--gray-600))',
          inputBorderHover: 'hsl(var(--primary-700))',
          inputBorderFocus: 'hsl(var(--primary-400))',
          inputText: 'hsl(var(--gray-50))',
          inputLabelText: 'hsl(var(--gray-300))',
          messageText: 'hsl(var(--gray-50))',
          messageBackground: 'hsl(var(--primary-900))',
          messageBorder: 'hsl(var(--primary-800))',
          anchorTextColor: 'hsl(var(--primary-400))',
          anchorTextHoverColor: 'hsl(var(--primary-300))',
        },
      },
    },
  };

  // Convert Tailwind CSS colors to HSL for Supabase Auth UI
  // This is a simplified example; a more robust solution would parse tailwind.config.js
  // For now, we'll define them directly.
  const getHSL = (colorName: string) => {
    // These values are approximations based on your tailwind.config.js
    const colors: { [key: string]: string } = {
      'primary-600': '100 30% 49%', // Example HSL for #6c906c
      'primary-500': '100 30% 62%', // Example HSL for #86b486
      'primary-400': '100 30% 70%', // Example HSL for #9fc49f
      'primary-300': '100 30% 78%', // Example HSL for #b8d4b8
      'primary-100': '100 30% 92%', // Example HSL for #eaf4ea
      'primary-900': '100 30% 13%', // Example HSL for #1e241e
      'primary-800': '100 30% 25%', // Example HSL for #384838
      'primary-700': '100 30% 37%', // Example HSL for #526c52
      'gray-100': '220 14% 96%',
      'gray-200': '220 13% 91%',
      'gray-300': '220 12% 83%',
      'gray-50': '220 14% 99%',
      'gray-700': '220 12% 43%',
      'gray-800': '220 12% 28%',
      'gray-900': '220 12% 18%',
    };
    return colors[colorName] || '0 0% 0%'; // Default to black if not found
  };

  // Dynamically set CSS variables for Supabase Auth UI
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-600', getHSL('primary-600'));
    root.style.setProperty('--primary-500', getHSL('primary-500'));
    root.style.setProperty('--primary-400', getHSL('primary-400'));
    root.style.setProperty('--primary-300', getHSL('primary-300'));
    root.style.setProperty('--primary-100', getHSL('primary-100'));
    root.style.setProperty('--primary-900', getHSL('primary-900'));
    root.style.setProperty('--primary-800', getHSL('primary-800'));
    root.style.setProperty('--primary-700', getHSL('primary-700'));
    root.style.setProperty('--gray-100', getHSL('gray-100'));
    root.style.setProperty('--gray-200', getHSL('gray-200'));
    root.style.setProperty('--gray-300', getHSL('gray-300'));
    root.style.setProperty('--gray-50', getHSL('gray-50'));
    root.style.setProperty('--gray-700', getHSL('gray-700'));
    root.style.setProperty('--gray-800', getHSL('gray-800'));
    root.style.setProperty('--gray-900', getHSL('gray-900'));
  }, [currentLang]);


  // Handle auth state changes for redirection
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push(redirectTo);
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push(redirectTo);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, redirectTo]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-8">
          {t.nav.home}
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={appearance}
          theme="light" // Default to light, ThemeProvider will handle dark class on html
          providers={[]} // No third-party providers unless specified
          redirectTo={redirectTo}
          localization={{
            variables: {
              sign_in: {
                email_label: t.auth?.emailLabel || 'Email address',
                password_label: t.auth?.passwordLabel || 'Your Password',
                email_input_placeholder: t.auth?.emailPlaceholder || 'Enter your email address',
                password_input_placeholder: t.auth?.passwordPlaceholder || 'Enter your password',
                button_label: t.auth?.signInButton || 'Sign In',
                social_provider_text: t.auth?.socialSignIn || 'Sign in with {{provider}}',
                link_text: t.auth?.signInLink || 'Already have an account? Sign In',
              },
              sign_up: {
                email_label: t.auth?.emailLabel || 'Email address',
                password_label: t.auth?.passwordLabel || 'Create a Password',
                email_input_placeholder: t.auth?.emailPlaceholder || 'Enter your email address',
                password_input_placeholder: t.auth?.passwordPlaceholder || 'Create a password',
                button_label: t.auth?.signUpButton || 'Sign Up',
                social_provider_text: t.auth?.socialSignUp || 'Sign up with {{provider}}',
                link_text: t.auth?.signUpLink || 'Don\'t have an account? Sign Up',
              },
              forgotten_password: {
                email_label: t.auth?.emailLabel || 'Email address',
                password_label: t.auth?.passwordLabel || 'Your Password',
                email_input_placeholder: t.auth?.emailPlaceholder || 'Enter your email address',
                button_label: t.auth?.sendInstructions || 'Send reset instructions',
                link_text: t.auth?.forgotPasswordLink || 'Forgot your password?',
              },
              update_password: {
                password_label: t.auth?.newPasswordLabel || 'New Password',
                password_input_placeholder: t.auth?.newPasswordPlaceholder || 'Enter your new password',
                button_label: t.auth?.updatePasswordButton || 'Update Password',
              },
              magic_link: {
                email_input_placeholder: t.auth?.emailPlaceholder || 'Enter your email address',
                button_label: t.auth?.sendMagicLink || 'Send Magic Link',
                link_text: t.auth?.magicLinkText || 'Login with magic link',
              },
              verify_otp: {
                email_input_placeholder: t.auth?.emailPlaceholder || 'Enter your email address',
                phone_input_placeholder: t.auth?.phonePlaceholder || 'Enter your phone number',
                token_input_placeholder: t.auth?.tokenPlaceholder || 'Enter your OTP token',
                email_input_label: t.auth?.emailLabel || 'Email address',
                phone_input_label: t.auth?.phoneLabel || 'Phone number',
                token_input_label: t.auth?.tokenLabel || 'Token',
                button_label: t.auth?.verifyOtpButton || 'Verify Token',
                // Removed link_text as it's not supported here
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;