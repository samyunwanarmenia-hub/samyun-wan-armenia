import { Metadata } from 'next';
import { translations } from '@/i18n/translations';
import { generateMetadata as generatePageMetadata } from '@/utils/pageMetadata';
import { SITE_URL } from '@/config/siteConfig';
import { resolveLang, type SupportedLang } from '@/config/locales';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang];

  const pageTitle = `${t.hero.title} | Terms & Conditions`;
  const pageDescription =
    'Условия использования официального сайта Samyun Wan Armenia. Правила заказа, доставки и проверки оригинальности продукции.';
  const pageImage = `${SITE_URL}/api/og/${lang}?title=${encodeURIComponent(pageTitle)}`;

  return generatePageMetadata({
    lang,
    titleKey: 'terms.title',
    descriptionKey: 'terms.description',
    keywords: [`${t.hero.title}`, 'terms', 'Samyun Wan Armenia'],
    pagePath: 'terms',
    image: pageImage,
    imageAlt: pageTitle,
    titleOverride: pageTitle,
    descriptionOverride: pageDescription,
  });
}

const TermsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TermsLayout;
