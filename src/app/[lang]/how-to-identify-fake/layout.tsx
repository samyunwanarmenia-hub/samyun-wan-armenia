import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Как отличить оригинальный Samyun Wan от подделки | Официальный дистрибьютор',
  description: 'Узнайте, как отличить оригинальный Samyun Wan от подделки. Только у нас оригинал с QR-кодом!',
  keywords: 'Samyun Wan оригинал, как отличить подделку, QR-код проверка, официальный дистрибьютор',
  openGraph: {
    title: 'Как отличить оригинальный Samyun Wan от подделки',
    description: 'Только у нас оригинал с QR-кодом!',
    type: 'article',
  },
};

const HowToIdentifyFakeLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default HowToIdentifyFakeLayout;
