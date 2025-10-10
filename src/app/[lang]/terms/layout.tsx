import { Metadata } from 'next';
import { translations } from '@/i18n/translations';

// --- SEO/Meta for Terms Page ---
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang || 'hy';
  const t = translations[lang] || translations.hy;
  // Short, clear SEO description under 155 chars
  const seoDescription = lang === 'hy' ?
    'Samyun Wan Armenia պաշտոնական օգտագործման կանոններ. Օրիգինալ/ընդունված ապրանքներ և պաշտոնական պայմանագրեր.' :
    lang === 'ru' ?
      'Официальные условия использования Samyun Wan Armenia. Оригинальная продукция и политика. Доставка по Армении.' :
      'Official Terms & Conditions for Samyun Wan Armenia – Official Distributor. Authentic product, legal conditions, Armenia delivery.';
  const baseUrl = 'https://samyunwanarmenia.netlify.app';
  const pageUrl = `${baseUrl}/${lang}/terms`;
  // Language alternates for hreflang
  const alternatesLanguages = {
    'hy-AM': `${baseUrl}/hy/terms`,
    'ru-RU': `${baseUrl}/ru/terms`,
    'en-US': `${baseUrl}/en/terms`,
    'x-default': `${baseUrl}/hy/terms`,
  };
  return {
    title: `${t.hero.title} – Official Distributor | Terms & Conditions`,
    description: seoDescription,
    openGraph: {
      title: `${t.hero.title} – Official Distributor | Terms & Conditions`,
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
      title: `${t.hero.title} – Official Distributor | Terms & Conditions`,
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

const TermsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TermsLayout;
