import ProductShowcaseSection from '@/components/ProductShowcaseSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'products');

const ProductsPage = () => {
  return (
    <ProductShowcaseSection />
  );
};

export default ProductsPage;
