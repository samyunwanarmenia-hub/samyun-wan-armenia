import type { Metadata } from 'next';
import { statsData } from '@/data/stats';
import HeroSection from '@/components/HeroSection';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import LayoutClientProvider from '@/components/LayoutClientProvider';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const RootPage = () => {
  return (
    <LayoutClientProvider initialLang="hy">
      <HeroSection stats={statsData} />
      <ProductShowcaseSection />
    </LayoutClientProvider>
  );
};

export default RootPage;
