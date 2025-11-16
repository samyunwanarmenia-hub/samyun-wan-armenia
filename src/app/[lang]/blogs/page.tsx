import type { Metadata } from 'next';

import BlogPreviewCard from '@/components/BlogPreviewCard';
import { translations } from '@/i18n/translations';
import { buildPageMetadata } from '@/utils/pageMetadata';
import { getBlogPreviews } from '@/data/blogs';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { SITE_URL } from '@/config/siteConfig';
import { BLOGS_PAGE_CONTENT } from '@/data/blogs/blogsPageContent';
import Link from 'next/link';

export const generateMetadata = ({ params }: { params: { lang: string } }): Metadata =>
  buildPageMetadata(params.lang, 'blogs');

const BlogsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;
  const previews = getBlogPreviews(lang);
  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.article.title, url: `${SITE_URL}/${lang}/blogs` },
  ]);

  const articleData = BLOGS_PAGE_CONTENT[lang];
  const articleTitle = articleData?.title ?? t.article.title;
  const articleSubtitle = articleData?.subtitle ?? t.article.subtitle;
  const articleIntroParagraphs =
    articleData?.introParagraphs ?? (t.article.intro ? [t.article.intro] : []);
  const articleSections = articleData?.sections ?? t.article.sections ?? [];
  const articleConclusion = articleData?.conclusion ?? t.article.conclusion;
  const articleCtaLabel = articleData?.ctaLabel ?? t.article.ctaLabel;
  const articleCtaLink = articleData?.ctaLink ?? `/${lang}/contact`;

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

      <section className="space-y-8 px-4 py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary-600 dark:text-primary-300">
            {articleSubtitle}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{articleTitle}</h1>
        </div>

        {articleIntroParagraphs.length ? (
          <div className="mx-auto max-w-5xl space-y-4 text-left text-lg text-gray-600 dark:text-gray-300">
            {articleIntroParagraphs.map((paragraph, index) => (
              <p key={`${lang}-intro-${index}`}>{paragraph}</p>
            ))}
          </div>
        ) : null}

        <div className="mx-auto space-y-6">
          {articleSections.map(section => (
            <article
              key={section.id}
              className="mx-auto max-w-5xl space-y-3 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{section.heading}</h2>
              <p className="text-base text-gray-700 dark:text-gray-300">{section.description}</p>
              {section.bullets?.length ? (
                <ul className="ml-4 list-disc text-gray-700 dark:text-gray-300">
                  {section.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        {articleConclusion ? (
          <p className="mx-auto max-w-4xl text-center text-lg text-gray-700 dark:text-gray-300">
            {articleConclusion}
          </p>
        ) : null}

        {articleCtaLabel && articleCtaLink ? (
          <div className="flex justify-center">
            <Link
              href={articleCtaLink}
              className="rounded-full border border-primary-600 px-6 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-primary-600 transition hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-400"
            >
              {articleCtaLabel}
            </Link>
          </div>
        ) : null}

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
