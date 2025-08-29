import { Helmet } from 'react-helmet-async';
import { SeoHeadProps } from '../types/global'; // Removed TranslationKeys

const SeoHead = ({ t, currentLang, pageTitle, pageDescription, pageKeywords, ogImage }: SeoHeadProps) => {
  const defaultTitle = t.hero.title + ' – ' + t.hero.subtitle;
  const defaultDescription = t.hero.tagline;
  const defaultKeywords = t.hero.title + ', ' + t.hero.subtitle + ', ' + t.hero.tagline;
  const defaultOgImage = "/optimized/og-image.jpg"; // Default optimized OG image

  const title = pageTitle || defaultTitle;
  const description = pageDescription || defaultDescription;
  const keywords = pageKeywords || defaultKeywords;
  const finalOgImage = ogImage || defaultOgImage;

  const baseUrl = "https://samyunwanarmenia.netlify.app"; // Your base URL

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Samyun Wan Armenia, Aleksandr Gevorgyan" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Hreflang for Multilingual */}
      <link rel="alternate" hrefLang="hy" href={`${baseUrl}/hy/`} />
      <link rel="alternate" hrefLang="ru" href={`${baseUrl}/ru/`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />
      <link rel="canonical" href={`${baseUrl}/${currentLang === 'hy' ? '' : currentLang + '/'}`} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}/${currentLang === 'hy' ? '' : currentLang + '/'}`} />
      <meta property="og:image" content={`${baseUrl}${finalOgImage}`} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Samyun Wan Armenia" />
      <meta property="og:locale" content={currentLang === 'hy' ? 'hy_AM' : currentLang === 'ru' ? 'ru_RU' : 'en_US'} />
      {currentLang !== 'hy' && <meta property="og:locale:alternate" content="hy_AM" />}
      {currentLang !== 'ru' && <meta property="og:locale:alternate" content="ru_RU" />}
      {currentLang !== 'en' && <meta property="og:locale:alternate" content="en_US" />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${finalOgImage}`} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@samyunwanarmenia" />
    </Helmet>
  );
};

export default SeoHead;