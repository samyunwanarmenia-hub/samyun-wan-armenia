import type { Metadata } from 'next';
import { translations } from '@/i18n/translations';

import { getBlogPost, getBlogStaticParams } from '@/data/blogs';
import BlogArticleContent from '@/components/BlogArticleContent';
import { buildBlogPostMetadata } from '@/utils/blogMetadata';
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/config/siteConfig';

interface BlogDetailPageProps {
  params: { lang: string; slug: string };
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const lang: SupportedLang = resolveLang(params.lang);
  const translation = post?.translations[lang];

  return buildBlogPostMetadata({
    lang,
    slug: params.slug,
    post,
    translation,
  });
}

export function generateStaticParams() {
  return getBlogStaticParams();
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  const post = getBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const lang: SupportedLang = resolveLang(params.lang);
  const tLang = translations[lang] || translations.hy;
  const translation = post.translations[lang];
  const permalink = `${SITE_URL}/${lang}/blogs/${params.slug}`;
  const breadcrumbData = generateBreadcrumbSchema([
    { name: tLang.hero.title, url: `${SITE_URL}/${lang}` },
    { name: tLang.article.title, url: `${SITE_URL}/${lang}/blogs` },
    { name: translation.title, url: permalink },
  ]);
  const blogPostingSchema = generateBlogPostingSchema({
    headline: translation.title,
    description: translation.summary,
    url: permalink,
    image: translation.heroImage,
    authorName: post.author,
    publisherName: 'Samyun Wan Armenia',
    datePublished: post.publishedAt,
    inLanguage: lang,
    keywords: translation.tags,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

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
