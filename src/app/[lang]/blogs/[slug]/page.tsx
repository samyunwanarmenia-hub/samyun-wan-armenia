import { cache } from 'react';
import type { Metadata } from 'next';
import { getBlogPost, getBlogStaticParams } from '@/data/blogs';
import BlogArticleContent from '@/components/BlogArticleContent';
import { buildBlogPostMetadata } from '@/utils/blogMetadata';
import { generateBlogPostingSchema, generateBreadcrumbs } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/config/siteConfig';
import ScriptLD from '@/components/ScriptLD';
import { buildAlternates } from '@/utils/alternateLinks';

const fetchBlogPost = cache((slug: string) => getBlogPost(slug));

interface BlogDetailPageProps {
  params: { lang: string; slug: string };
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = fetchBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const lang: SupportedLang = resolveLang(params.lang);
  const translation = post.translations[lang] || post.translations.hy;
  const alternates = buildAlternates(`/blogs/${params.slug}`);

  return {
    ...buildBlogPostMetadata({
      lang,
      slug: params.slug,
      post,
      translation,
      canonicalPath: alternates.canonical,
    }),
    alternates,
  };
}

export function generateStaticParams() {
  return getBlogStaticParams();
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  const post = fetchBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const lang: SupportedLang = resolveLang(params.lang);
  const translation = post.translations[lang] || post.translations.hy;
  const permalink = `${SITE_URL}/${lang}/blogs/${params.slug}`;
  const inLanguage = lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US';
  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['blogs', params.slug] });
  const heroImageFallback = translation.heroImage || post.heroImage || `${SITE_URL}/optimized/og-image.jpg`;
  const blogPostingSchema = generateBlogPostingSchema({
    headline: translation.title,
    description: translation.summary,
    url: permalink,
    image: heroImageFallback,
    authorName: post.author,
    publisherName: 'Samyun Wan Armenia',
    datePublished: post.publishedAt,
    inLanguage,
    keywords: translation.tags,
  });

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <ScriptLD json={blogPostingSchema} />

      <section className="px-4 py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl space-y-6 lg:space-y-10">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary-600 dark:text-primary-300">
              {post.category}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{translation.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{translation.subtitle}</p>
          </div>

          <BlogArticleContent
            translation={translation}
            publishedAt={post.publishedAt}
            readingTimeMinutes={post.readingTimeMinutes}
            lang={lang}
          />
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
