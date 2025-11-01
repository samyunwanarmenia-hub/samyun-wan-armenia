"use client";

import { useState, useCallback, useEffect } from 'react';
import { UseReviewFormHookParams } from '@/types/global';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';

export const useReviewForm = ({ t, onReviewSubmitted, initialName = '' }: UseReviewFormHookParams) => {
  const [name, setName] = useState<string>(initialName);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) {
      showError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!supabase) {
        throw new Error('Reviews service is not configured.');
      }
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            name: name.trim(),
            text: reviewText.trim(),
            rating: 5,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        showSuccess(t.testimonials.thankYou);
        if (!initialName) {
          setName('');
        }
        setReviewText('');
        onReviewSubmitted(data);
      }

    } catch (error: unknown) {
      console.error("Error submitting review:", error instanceof Error ? error.message : error);
      showError(error instanceof Error ? error.message : "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, reviewText, t, onReviewSubmitted, initialName]);

  return {
    name,
    setName,
    reviewText,
    setReviewText,
    isSubmitting,
    handleSubmit,
  };
};
