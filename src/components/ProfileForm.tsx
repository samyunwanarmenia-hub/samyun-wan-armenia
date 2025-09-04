"use client";

import { useState, useEffect, useCallback } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthSessionProvider';
import { useLayoutContext } from '@/context/LayoutContext';
import { showSuccess, showError } from '@/utils/toast';
import CallToActionButton from './CallToActionButton';
import OptimizedImage from './OptimizedImage';
import { Profile } from '@/types/global';

const ProfileForm: React.FC = () => {
  const { t, currentLang } = useLayoutContext(); // Get currentLang here
  const { user, isLoading: isAuthLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error;
      }

      if (data) {
        // Construct a complete Profile object with all required fields
        const completeProfile: Profile = {
          id: user.id, // Get id from the authenticated user
          first_name: data.first_name,
          last_name: data.last_name,
          avatar_url: data.avatar_url,
          updated_at: null, // Set to null as it's not fetched in this select query
        };
        setProfile(completeProfile);
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
        setAvatarUrl(data.avatar_url || '');
      } else {
        // If no profile exists, initialize with user's email part and user.id
        setFirstName(user.email?.split('@')[0] || '');
        setLastName('');
        setAvatarUrl('');
        setProfile({ // Also set profile state for consistency
          id: user.id,
          first_name: user.email?.split('@')[0] || null,
          last_name: null,
          avatar_url: null,
          updated_at: null,
        });
      }
    } catch (error: unknown) {
      console.error('Error fetching profile:', error);
      showError(t.profile?.fetchError || 'Failed to fetch profile.');
    } finally {
      setIsLoading(false);
    }
  }, [user, t]);

  useEffect(() => {
    if (user && !isAuthLoading) {
      fetchProfile();
    } else if (!user && !isAuthLoading) {
      setIsLoading(false); // Not logged in, so not loading profile
    }
  }, [user, isAuthLoading, fetchProfile]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const updates = {
        id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        avatar_url: avatarUrl.trim(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        onConflict: 'id',
      });

      if (error) {
        throw error;
      }

      showSuccess(t.profile?.updateSuccess || 'Profile updated successfully!');
      // Update user_metadata in auth.users table as well
      await supabase.auth.updateUser({
        data: { first_name: firstName.trim(), last_name: lastName.trim(), avatar_url: avatarUrl.trim() }
      });

    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      showError(t.profile?.updateError || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  }, [user, firstName, lastName, avatarUrl, t]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="loader" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          {t.profile?.notLoggedIn || 'Not Logged In'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {t.profile?.notLoggedIn || 'Please log in to view your profile.'}
        </p>
        <CallToActionButton
          onClick={() => window.location.href = `/${currentLang}/auth/login`} // Use currentLang directly
          variant="primary"
          size="md"
        >
          {t.auth?.signInButton || 'Sign In'}
        </CallToActionButton>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
          {t.nav?.profile || 'My Profile'}
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
          {t.profile?.description || 'Manage your profile details.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            {avatarUrl ? (
              <OptimizedImage
                src={avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary-500 shadow-md mb-4"
                sizes="96px"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4">
                <User className="w-12 h-12" />
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>

          <div>
            <label htmlFor="firstName" className="block text-gray-900 dark:text-gray-50 text-sm font-bold mb-2">
              {t.profile?.firstNameLabel || 'First Name'}
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder={t.profile?.firstNamePlaceholder || 'Enter your first name'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-900 dark:text-gray-50 text-sm font-bold mb-2">
              {t.profile?.lastNameLabel || 'Last Name'}
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder={t.profile?.lastNamePlaceholder || 'Enter your last name'}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="avatarUrl" className="block text-gray-900 dark:text-gray-50 text-sm font-bold mb-2">
              {t.profile?.avatarLabel || 'Avatar URL'}
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                id="avatarUrl"
                className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
                placeholder={t.profile?.avatarPlaceholder || 'Enter your avatar URL'}
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t.profile?.avatarHint || 'Use a public image URL.'}
            </p>
          </div>

          <CallToActionButton
            type="submit"
            disabled={isSubmitting}
            size="md"
            className="w-full"
            interactionEffect="pixels"
          >
            {isSubmitting ? (t.profile?.saving || 'Saving...') : (t.profile?.updateButton || 'Update Profile')}
          </CallToActionButton>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;