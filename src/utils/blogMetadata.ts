import { Metadata } from 'next';

import { generateCommonMetadata } from '@/utils/metadataUtils';
import { translations } from '@/i18n/translations';
import { resolveLang as normalizeLang } from '@/config/locales';
import { BlogPost, BlogTranslation } from '@/data/blogs';

interface BlogMetadataOptions {
  lang: string;
  slug: string;
  post: BlogPost;
  translation: BlogTranslation;
}

export const buildBlogPostMetadata = ({
  lang,
  slug,
  post,
  translation,
}: BlogMetadataOptions): Metadata => {
  const normalizedLang = normalizeLang(lang);
  const t = translations[normalizedLang] || translations.hy;
  const keywords = [...translation.tags, ...post.tags].join(', ');
  const canonicalPath = `/${normalizedLang}/blogs/${slug}`;

  return generateCommonMetadata({
    lang: normalizedLang,
    t,
    pagePath: `blogs/${slug}`,
    title: translation.title,
    description: translation.summary,
    keywords,
    image: translation.heroImage,
    imageAlt: translation.heroImageAlt,
    type: 'article',
    canonicalPath,
  });
};
