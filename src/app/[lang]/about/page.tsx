"use client";

import AboutSection from '@/components/AboutSection';

const AboutPage = () => {
  return (
    <div className="mb-8 bg-red-100 border-l-4 border-red-600 p-4 text-red-800 font-bold rounded text-center max-w-2xl mx-auto">
      Мы — <b>единственный официальный дистрибьютор Samyun Wan в Армении</b>! Только у нас вы можете купить <b>оригинальный продукт</b> с проверкой QR-кода на упаковке. Осторожно: другие сайты продают подделки! Это может быть опасно для вашего здоровья, не рискуйте!
    </div>
    <AboutSection />
  );
};

export default AboutPage;