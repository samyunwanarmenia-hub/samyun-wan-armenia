import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { productShowcaseData } from '@/data/productShowcaseData';
import { translations } from '@/i18n/translations';
import { SITE_URL } from '@/config/siteConfig';
import { generateProductSchema, buildBreadcrumbItems } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { baseTestimonials } from '@/data/testimonials';
import { getSeoKeywords } from '@/config/seoKeywords';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';
import ProductSchema from '@/components/ProductSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const generateMetadata = ({ params }: { params: { lang: string } }) => {
  const alternates = buildAlternates('/products');
  return {
    ...buildPageMetadata(params.lang, 'products', { canonicalPath: alternates.canonical }),
    alternates,
  };
};

export const revalidate = 60 * 60 * 12;

const ProductsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbItems = buildBreadcrumbItems({ lang, segments: ['products'] });

  const aggregateRating = (() => {
    if (!Array.isArray(baseTestimonials) || baseTestimonials.length === 0) {
      return null;
    }

    const total = baseTestimonials.reduce((sum, review) => sum + (review.rating || 0), 0);
    return {
      '@type': 'AggregateRating',
      ratingValue: (total / baseTestimonials.length).toFixed(2),
      reviewCount: baseTestimonials.length.toString(),
      bestRating: '5',
      worstRating: '1',
    };
  })();

  const priceValidUntil = (() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    return date.toISOString().split('T')[0];
  })();

  const productsPageUrl = `${SITE_URL}/${lang}/products`;
  const seoKeywords = getSeoKeywords(lang);

  const localizedProducts = productShowcaseData.map(product => ({
    ...product,
    name: t.productShowcase[product.labelKey],
    description: t.productShowcase[product.descKey],
  }));

  const productSchemas = localizedProducts.map(product => {
    const image = `${SITE_URL}${product.src}`;
    const url = productsPageUrl;
    const productId = `${productsPageUrl}#${product.labelKey}`;

    const schema = generateProductSchema({
      name: product.name,
      description: product.description,
      image,
      price: product.price,
      priceCurrency: 'AMD',
      reviews: [],
      keywords: seoKeywords,
    });
    const { offers, ...schemaWithoutOffers } = schema;

    return {
      ...schemaWithoutOffers,
      '@id': productId,
      inLanguage: lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
      sku: `SW-${product.labelKey.toUpperCase()}-${lang.toUpperCase()}`,
      mpn: `MPN-${product.labelKey.toUpperCase()}`,
      offers: {
        ...offers,
        url,
        priceValidUntil,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
      ...(aggregateRating ? { aggregateRating } : {}),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': productsPageUrl,
      },
      brand: {
        '@type': 'Brand',
        name: 'Samyun Wan',
      },
    };
  });

  const productCollectionSchema = {
    '@type': 'ProductCollection',
    '@id': `${productsPageUrl}#collection`,
    name: t.productShowcase.seoHeading ?? t.hero.title,
    description: t.productShowcase.seoParagraph ?? t.hero.subtitle,
    url: productsPageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': productsPageUrl,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.productShowcase.seoHeading ?? t.nav.products,
      itemListElement: productSchemas.map((productSchema, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': productSchema['@id'],
        },
      })),
    },
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [...productSchemas, productCollectionSchema],
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ScriptLD json={graphSchema} />
      {localizedProducts.map(product => (
        <ProductSchema
          key={product.labelKey}
          name={product.name}
          description={product.description}
          price={product.price.toString()}
        />
      ))}
      <ProductShowcaseSection />
    </>
  );
};

export default ProductsPage;
