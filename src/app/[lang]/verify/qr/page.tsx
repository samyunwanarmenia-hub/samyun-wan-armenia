import { QR_VERIFICATION_URL, SITE_URL } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbSchema } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = false;

const QrVerifyPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: t.hero.title, url: `${SITE_URL}/${lang}` },
    { name: t.authenticity.qrScanInstructions, url: `${SITE_URL}/${lang}/verify/qr` },
  ]);

  // Perform an immediate server redirect to the canonical QR verification URL
  redirect(QR_VERIFICATION_URL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
        <div className="max-w-xl rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-900">{t.authenticity.qrScanInstructions}</h1>
          <p className="mt-3 text-gray-600">{t.authenticity.waitingForLink}</p>
          <a
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
            href={QR_VERIFICATION_URL}
          >
            {t.authenticity.verifyButton}
          </a>
        </div>
      </main>
    </>
  );
};

export default QrVerifyPage;
