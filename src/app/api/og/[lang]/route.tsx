import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { translations } from '@/i18n/translations';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { SITE_URL } from '@/config/siteConfig';

export const runtime = 'edge';
export const revalidate = 3600;

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(req: NextRequest, { params }: { params: { lang: string } }) {
  const { searchParams } = new URL(req.url);
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const title = searchParams.get('title') || `${t.hero.title} | Samyun Wan Armenia`;
  const subtitle = searchParams.get('subtitle') || t.hero.subtitle || t.hero.tagline || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f7fbe7 0%, #e0f2f1 100%)',
          color: '#0f172a',
          fontFamily: 'Arial, sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              fontWeight: 800,
              color: '#fff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            }}
          >
            SW
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '0.08em', color: '#047857' }}>
              Samyun Wan Armenia
            </span>
            <span style={{ fontSize: '14px', color: '#475569' }}>{SITE_URL.replace('https://', '')}</span>
          </div>
        </div>
        <h1
          style={{
            fontSize: '60px',
            lineHeight: 1.1,
            textAlign: 'center',
            margin: '0 0 20px',
            maxWidth: '1000px',
            fontWeight: 800,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '28px',
            textAlign: 'center',
            color: '#334155',
            maxWidth: '880px',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {subtitle}
        </p>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
