import type { Metadata } from 'next';

import OfficialVerificationSection from '@/components/OfficialVerificationSection';
import { SITE_URL } from '@/config/siteConfig';

export const metadata: Metadata = {
  title: 'Official verification | Samyun Wan Armenia',
  description:
    'Legal proofs, registry links, and messaging channels that confirm Samyun Wan Armenia as the official brand representative.',
  alternates: {
    canonical: `${SITE_URL}/official`,
  },
};

const OfficialPage = () => {
  return <OfficialVerificationSection />;
};

export default OfficialPage;
