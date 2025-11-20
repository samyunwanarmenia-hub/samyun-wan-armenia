import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { productShowcaseData } from '@/data/productShowcaseData';
import { translations } from '@/i18n/translations';
import { SITE_URL } from '@/config/siteConfig';
import { generateBreadcrumbSchema, generateProductSchema } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'products');

const ProductsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.hero.title, url: `${SITE_URL}/${lang}` },
    { name: t.nav.products, url: `${SITE_URL}/${lang}/products` },
  ]);

  const productSchemas = productShowcaseData.map(product => {
    const name = t.productShowcase[product.labelKey];
    const description = t.productShowcase[product.descKey];
    const image = `${SITE_URL}${product.src}`;
    const url = `${SITE_URL}/${lang}/products`;

    const schema = generateProductSchema({
      name,
      description,
      image,
      price: product.price,
      priceCurrency: 'AMD',
      reviews: [],
    });

    return {
      ...schema,
      sku: `SW-${product.labelKey.toUpperCase()}-${lang.toUpperCase()}`,
      mpn: `MPN-${product.labelKey.toUpperCase()}`,
      offers: {
        ...(schema as any).offers,
        url,
        availability: 'https://schema.org/InStock',
      },
      brand: {
        '@type': 'Brand',
        name: 'Samyun Wan',
      },
    };
  });

  const graphSchema =
    productSchemas.length === 1
      ? productSchemas[0]
      : { '@context': 'https://schema.org', '@graph': productSchemas };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <ProductShowcaseSection />
    </>
  );
};

export default ProductsPage;
