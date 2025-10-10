import AboutSection from '@/components/AboutSection';

const AboutPage = () => {
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        Мы — единственный официальный дистрибьютор Samyun Wan в Армении! Только у нас вы можете купить оригинальный продукт с проверкой QR-кода на упаковке. Осторожно: другие сайты продают подделки! Это может быть опасно для вашего здоровья, не рискуйте!
      </div>
      <AboutSection />
    </>
  );
};

export default AboutPage;