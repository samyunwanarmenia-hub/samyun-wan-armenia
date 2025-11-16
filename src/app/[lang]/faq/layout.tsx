import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { FaqLayoutProps } from '@/types/global';
import { generateCommonMetadata } from '@/utils/metadataUtils';
import { SITE_URL } from '@/config/siteConfig';
import { generateFaqStructuredData } from '@/utils/structuredDataUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} - ${t.nav.faq}`;
  const pageDescription = t.faq.q1;
  const pageKeywords = [
    t.hero.title,
    t.nav.faq,
    'Samyun Wan Armenia FAQ',
    'Samyun Wan հարցեր',
    'Samyun Wan вопросы',
  ].join(', ');
  const pageImage = `${SITE_URL}/optimized/samyun-wan-product-600w.jpg`;
  const pageImageAlt = t.nav.faq;

  return generateCommonMetadata({
    lang,
    t,
    pagePath: 'faq',
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    imageAlt: pageImageAlt,
  });
}

const FaqLayout = ({ children, params }: FaqLayoutProps) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];
  const faqStructuredData = generateFaqStructuredData(t, lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {children}
    </>
  );
};

export default FaqLayout;
