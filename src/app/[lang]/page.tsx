import { translations } from '@/i18n/translations';
import HomePageClient from '@/components/HomePageClient';

const LangPage = async ({ params }: { params: { lang: string } }) => {
  const currentLang = params.lang as keyof typeof translations;
  const t = translations[currentLang] || translations.hy;

  // Testimonials are now fetched and managed on the dedicated testimonials page.
  // The logic for fetching from Supabase and combining with baseTestimonials is removed from here.

  return <HomePageClient t={t} currentLang={currentLang} />;
};

export default LangPage;