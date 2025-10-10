import { translations } from '@/i18n/translations';
import { statsData } from '@/data/stats'; // Import statsData directly
import HeroSection from '@/components/HeroSection';
import ProductShowcaseSection from '@/components/ProductShowcaseSection';

const LangPage = async ({ params }: { params: { lang: string } }) => {
  const currentLang = params.lang as keyof typeof translations;
  const _t = translations[currentLang] || translations.hy;

  return (
    <>
      <div className="mb-8 bg-red-100 border-l-4 border-red-600 p-4 text-red-800 font-bold rounded text-center max-w-2xl mx-auto">
        Вы находитесь на <b>единственном официальном сайте Samyun Wan Armenia</b>. Мы — единственный дистрибьютор оригинального Samyun Wan с гарантией QR-кода от производителя. Другие сайты либо подделывают оригинал, либо являются мошенниками. Не доверяйте сторонним источникам! Проверить подлинность заказа и упаковки — только у нас. Контакт: +37495653666
      </div>
      <HeroSection stats={statsData} />
      <ProductShowcaseSection />
    </>
  );
};

export default LangPage;