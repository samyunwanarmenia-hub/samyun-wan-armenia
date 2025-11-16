import type { Metadata } from 'next';

import BlogPreviewCard from '@/components/BlogPreviewCard';
import { translations } from '@/i18n/translations';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { getBlogPreviews } from '@/data/blogs';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { SITE_URL } from '@/config/siteConfig';

export const generateMetadata = ({ params }: { params: { lang: string } }): Metadata =>
  buildPageMetadata(params.lang, 'blogs');

const BlogsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;
  const previews = getBlogPreviews(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.article.title, url: `${SITE_URL}/${lang}/blogs` },
  ]);

  const featured = previews[0];
  const articleSchema = generateArticleSchema({
    headline: t.article.metaTitle,
    description: t.article.metaDescription,
    image: featured?.heroImage ?? `${SITE_URL}/optimized/og-image.jpg`,
    url: `${SITE_URL}/${lang}/blogs`,
    authorName: 'Samyun Wan Armenia',
    datePublished: featured?.publishedAt ?? new Date().toISOString(),
    publisherName: 'Samyun Wan Armenia',
    inLanguage: lang,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <section className="space-y-6 px-4 py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary-600 dark:text-primary-300">
            {t.article.subtitle}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t.article.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t.article.intro}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {previews.map(preview => (
            <BlogPreviewCard key={preview.slug} preview={preview} lang={lang} />
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogsPage;
