import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { baseTestimonials } from '@/data/testimonials';
import { generateReviewStructuredData } from '@/utils/structuredDataUtils';

interface TestimonialsLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: TestimonialsLayoutProps): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const reviewKeywords = baseTestimonials.map(item => {
    if (lang === 'hy') return item.name;
    if (lang === 'ru') return item.nameRu;
    return item.nameEn;
  }).join(', ');

  return {
    title: t.hero.title + ' - ' + t.testimonials.title,
    description: t.testimonials.formSubtitle,
    keywords: `${t.hero.title}, ${t.testimonials.title}, samyun wan, armenia, ${reviewKeywords}, отзывы, Samyun Wan отзывы, customer reviews, weight gain reviews`,
    openGraph: {
      title: t.hero.title + ' - ' + t.testimonials.title,
      description: t.testimonials.formSubtitle,
      url: `https://samyunwanarmenia.netlify.app/${lang}/testimonials`,
      images: [
        {
          url: 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-original-600w.jpg', // Generic image for testimonials
          width: 600,
          height: 600,
          alt: t.testimonials.title,
        },
      ],
    },
    alternates: {
      canonical: `https://samyunwanarmenia.netlify.app/${lang}/testimonials`,
      languages: {
        'hy-AM': 'https://samyunwanarmenia.netlify.app/hy/testimonials',
        'ru-RU': 'https://samyunwanarmenia.netlify.app/ru/testimonials',
        'en-US': 'https://samyunwanarmenia.netlify.app/en/testimonials',
        'x-default': 'https://samyunwanarmenia.netlify.app/testimonials',
      },
    },
  };
}

const TestimonialsLayout = ({ children, params }: TestimonialsLayoutProps) => {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy;
  const reviewStructuredData = baseTestimonials.map(testimonial => 
    generateReviewStructuredData(t, testimonial, lang)
  );

  return (
    <>
      {reviewStructuredData.map((data, index) => (
        <script
          key={`review-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      {children}
    </>
  );
};

export default TestimonialsLayout;