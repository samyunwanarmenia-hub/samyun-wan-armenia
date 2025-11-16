import type { Metadata } from "next";
import { buildPageMetadata } from "@/utils/pageMetadata";

import { statsData } from "@/data/stats";
import HeroSection from "@/components/HeroSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import LayoutClientProvider from "@/components/LayoutClientProvider";

export const generateMetadata = async (): Promise<Metadata> =>
  buildPageMetadata("hy", "home", { canonicalPath: "/", type: "website" });

const RootPage = () => {
  return (
    <LayoutClientProvider initialLang="hy">
      <HeroSection stats={statsData} />
      <ProductShowcaseSection />
    </LayoutClientProvider>
  );
};

export default RootPage;
