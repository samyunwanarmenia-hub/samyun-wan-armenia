import { LEGAL_COPY, buildPageMetadata } from '@/utils/pageMetadata';
import { resolveLang, type SupportedLang } from '@/config/locales';
import LegalPageLayout from '@/components/LegalPageLayout';
import { generateBreadcrumbs } from '@/utils/schemaUtils';
import ScriptLD from '@/components/ScriptLD';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'terms');

const PLACEHOLDER_NOTICE: Record<SupportedLang, string> = {
  hy: 'Կայքում ներկայացված տեղեկանքը տեղեկատվական է և չի հանդիսանում բժշկական խորհրդատվություն։ Մինչ ընդունելը խորհրդակցեք բժշկի հետ։ Հակացուցված է հղիության, կրծքով կերակրման, մինչև 18 տարեկանի կամ քրոնիկ հիվանդությունների դեպքում առանց բժշկի.',
  ru: 'Информация на сайте не является медрекомендацией. Перед приемом проконсультируйтесь с врачом. Противопоказано при беременности, ГВ, до 18 лет и при хронических заболеваниях без одобрения врача.',
  en: 'Site info is not medical advice. Consult your doctor before use. Contraindicated during pregnancy, breastfeeding, under 18, or with chronic conditions without physician approval.',
};

const TermsPage = ({ params }: { params: { lang: string } }) => {
  const lang: SupportedLang = resolveLang(params.lang);
  const copy = LEGAL_COPY[lang] ?? LEGAL_COPY.hy;
  const notice = PLACEHOLDER_NOTICE[lang] ?? PLACEHOLDER_NOTICE.hy;

  const breadcrumbData = generateBreadcrumbs({ lang, segments: ['terms'] });

  return (
    <>
      <ScriptLD json={breadcrumbData} />
      <LegalPageLayout
        title={copy.termsTitle}
        description={copy.termsDescription}
        notice={notice}
        type="terms"
      />
    </>
  );
};

export default TermsPage;
