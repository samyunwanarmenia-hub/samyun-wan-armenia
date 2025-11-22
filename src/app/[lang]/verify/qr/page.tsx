import { QR_VERIFICATION_URL } from '@/config/siteConfig';
import { translations } from '@/i18n/translations';
import { generateBreadcrumbs } from '@/utils/schemaUtils';
import { resolveLang, type SupportedLang } from '@/config/locales';
import ScriptLD from '@/components/ScriptLD';

export const dynamic = 'force-dynamic';
export const revalidate = false;

const QrVerifyPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const t = translations[lang] || translations.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['verify', 'qr'] });

  return (
    <>
      <ScriptLD json={breadcrumbData} />
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
