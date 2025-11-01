import dynamic from 'next/dynamic';

const TestimonialsPageClient = dynamic(() => import('./Client'), { ssr: false });

const TestimonialsPage = () => {
  return <TestimonialsPageClient />;
};

export default TestimonialsPage;
