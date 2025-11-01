import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang || 'hy';
  const t = translations[lang as keyof typeof translations] || translations.hy;

  const pageTitle = `${t.hero.title} | Privacy Policy`;
  const pageDescription =
    'Политика конфиденциальности Samyun Wan Armenia. Узнайте, как мы защищаем личные данные клиентов и обеспечиваем безопасные покупки.';
  const pageImage = `${SITE_URL}/optimized/og-image.jpg`;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'privacy',
    title: pageTitle,
    description: pageDescription,
    keywords: `${t.hero.title}, privacy policy, Samyun Wan Armenia`,
    image: pageImage,
    imageAlt: pageTitle,
  });
}

const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PrivacyLayout;
