import TrackOrderSection from '@/components/TrackOrderSection';
import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'track-order');

const TrackOrderPage = () => {
  return (
    <TrackOrderSection />
  );
};

export default TrackOrderPage;
