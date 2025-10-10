import { Metadata } from 'next';
import { translations } from '@/i18n/translations';

// --- SEO/Meta for Privacy Page ---
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang || 'hy';
  const t = translations[lang] || translations.hy;
  // Short, clear SEO statement under 155 chars
  const seoDescription = lang === 'hy' ?
    'Samyun Wan Armenia պաշտոնական գաղտնիության քաղաքականություն. Ձեր տվյալները պաշտպանված են: Օրիգինալ/ընդունված ապրանքներ Երեւանում.' :
    lang === 'ru' ?
      'Официальная политика конфиденциальности Samyun Wan Armenia. Ваши данные защищены. Оригинальный товар. Доставка по всей Армении.' :
      'Official Privacy Policy of Samyun Wan Armenia – Official Distributor. Your data is protected. Original product & delivery in Armenia.';
  const baseUrl = 'https://samyunwanarmenia.netlify.app';
  const pageUrl = `${baseUrl}/${lang}/privacy`;
  // Provide explicit canonical/alternate/hreflang
  const alternatesLanguages = {
    'hy-AM': `${baseUrl}/hy/privacy`,
    'ru-RU': `${baseUrl}/ru/privacy`,
    'en-US': `${baseUrl}/en/privacy`,
    'x-default': `${baseUrl}/hy/privacy`,
  };
  return {
    title: `${t.hero.title} – Official Distributor | Privacy Policy`,
    description: seoDescription,
    openGraph: {
      title: `${t.hero.title} – Official Distributor | Privacy Policy`,
      description: seoDescription,
      url: pageUrl,
      type: 'website',
      siteName: 'Samyun Wan Armenia – Official',
      images: [
        {
          url: `${baseUrl}/optimized/og-image.jpg`,
          width: 1200, height: 630,
          alt: `${t.hero.title} – Official Distributor`,
        }
      ],
      locale: lang === 'hy' ? 'hy_AM' : lang === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.hero.title} – Official Distributor | Privacy Policy`,
      description: seoDescription,
      images: [`${baseUrl}/optimized/og-image.jpg`],
      creator: '@samyunwanarmenia',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: pageUrl,
      languages: alternatesLanguages,
    },
  };
}

const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PrivacyLayout;
