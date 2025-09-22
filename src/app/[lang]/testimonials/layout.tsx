import { translations } from '@/i18n/translations';
import { Metadata } from 'next';
import { baseTestimonials } from '@/data/testimonials';
import { generateReviewStructuredData } from '@/utils/structuredDataUtils';
import { TestimonialsLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils'; // Import the new utility

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as keyof typeof translations;
  const t = translations[lang] || translations.hy; // Fallback to Armenian

  const reviewKeywords = baseTestimonials.map(item => {
    if (lang === 'hy') return item.name;
    if (lang === 'ru') return item.nameRu;
    return item.nameEn;
  }).join(', ');

  const pageTitle = t.hero.title + ' - ' + t.testimonials.title;
  const pageDescription = t.testimonials.formSubtitle;
  const pageKeywords = `${t.hero.title}, ${t.testimonials.title}, samyun wan, armenia, ${reviewKeywords}, отзывы, Samyun Wan отзывы, customer reviews, weight gain reviews`;
  const pageImage = 'https://samyunwanarmenia.netlify.app/optimized/samyun-wan-armenia-original-600w.jpg'; // Generic image for testimonials
  const pageImageAlt = t.testimonials.title;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'testimonials',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
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