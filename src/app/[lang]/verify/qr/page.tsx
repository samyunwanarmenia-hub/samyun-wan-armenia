import { QR_VERIFICATION_URL } from '@/config/siteConfig';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const QrVerifyPage = () => {
  redirect(QR_VERIFICATION_URL);
};

export default QrVerifyPage;
