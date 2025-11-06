import { Suspense } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';

import QrVerifyClient, { QrVerifyPageProps } from './QrVerifyClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SuspenseFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <LoadingSpinner />
  </div>
);

const QrVerifyPage = (props: QrVerifyPageProps) => (
  <Suspense fallback={<SuspenseFallback />}>
    <QrVerifyClient {...props} />
  </Suspense>
);

export default QrVerifyPage;
