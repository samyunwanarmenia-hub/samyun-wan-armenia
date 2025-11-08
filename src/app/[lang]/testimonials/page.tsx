import dynamic from 'next/dynamic';

import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'testimonials');

const TestimonialsPageClient = dynamic(() => import('./Client'), { ssr: false });

const TestimonialsPage = () => {
  return <TestimonialsPageClient />;
};

export default TestimonialsPage;
