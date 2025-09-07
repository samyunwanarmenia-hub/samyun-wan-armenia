import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface AboutLayoutProps {
  children: ReactNode;
  // params: { lang: string }; // Removed as it's only used in generateMetadata
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  return {
    title: t.hero.title + ' - ' + t.nav.about,
    description: t.about.description,
    keywords: `${t.hero.title}, ${t.nav.about}, samyun wan, armenia, official representative, natural ingredients, proven effectiveness, safe to use, fast results`,
    openGraph: {
      title: t.hero.title + ' - ' + t.nav.about,
      description: t.about.description,
      url: `https://samyunwanarmenia.netlify.app/${lang}/about`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-original-600w.jpg', // Generic image for about page
          width: 600,
          height: 600,
          alt: t.nav.about,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/about`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/about',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/about',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/about',
        'x-default': 'https://samyunwanarmenia.netlify.app/about',
      },
    },
  };
}

const AboutLayout = ({ children }: AboutLayoutProps) => {
  return <>{children}</>;
};

export default AboutLayout;