"use client"; // This is a client component

import { Instagram, Facebook, MessageCircle, Send } from 'lucide-react';
import { TranslationKeys } from '../types/global';
import Link from 'next/link';
import { useLayoutContext } from '@/context/LayoutContext';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { navigationSections } from '@/data/navigationSections';
import CallToActionButton from './CallToActionButton'; // Import CallToActionButton
import AnimatedArrow from './AnimatedArrow'; // Import AnimatedArrow
import InteractiveDiv from './InteractiveDiv'; // Import InteractiveDiv

const Footer = () => {
  const { t, currentLang, openAuthenticityModal } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  const aboutLinks = navigationSections.filter(s => ['about', 'benefits', 'testimonials', 'contact'].includes(s.id));
  const productLinks = navigationSections.filter(s => ['products', 'faq'].includes(s.id));

  return (
    <footer className="relative z-30 w-full min-h-[50vh] flex flex-col justify-end items-center pt-20 pb-8 px-4 md:px-8 text-gray-300 dark:text-gray-400">
      {/* Backdrop for blur effect */}
      <div className="absolute inset-0 backdrop-blur-xl z-[-5] [mask-image:linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0)_100%)] [-webkit-mask-image:linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0)_100%)]"></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-[-7]"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {/* Column 1: Legal Info, Warning, and Social Media */}
          <div className="flex flex-col items-start justify-start p-4 md:p-6 rounded-xl bg-gray-100 dark:bg-gray-950 shadow-lg"> {/* Changed bg-gray-900 to bg-gray-100 for light mode */}
            <Link href={getHomePath()} className="flex items-center mb-4" aria-label={t.hero.title}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] sm:max-w-none"> {/* Changed text-gray-900 to text-gray-800 for light mode */}
                {t.hero.title}
              </h2>
            </Link>
            
            {/* Official Certification / Verified Badge & Trust Area */}
            <div className="flex flex-col w-full items-center mb-4 mt-2">
              <span className="text-xs text-green-400 mb-2 font-semibold">
                {currentLang === "hy"
                  ? "Պաշտոնական կայք / Սերտիֆիկացված ներկայացուցիչ"
                  : currentLang === "ru"
                  ? "Официальный сайт / Проверенный дистрибьютор"
                  : "Official Site / Verified Distributor"}
              </span>
              <span className="text-xs text-gray-400">
                {currentLang === "hy"
                  ? "Հաստատեք պաշտոնական էջերը՝ "
                  : currentLang === "ru"
                  ? "Проверьте официальные страницы: "
                  : "Verify official social profiles:"}
                <a href="https://www.facebook.com/samyunwanarmenia" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline ml-1" aria-label="Facebook Samyun Wan Armenia (Official)">Facebook</a>,
                <a href="https://t.me/samyunwanarmenia" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline ml-1" aria-label="Telegram Samyun Wan Armenia (Official)">Telegram</a>
              </span>
            </div>
            {/* Legal Info / Warning Section */}
            <p 
              className="text-sm leading-relaxed mb-4 whitespace-pre-line text-gray-600 dark:text-gray-300" // Changed text-gray-700 to text-gray-600 for light mode
              dangerouslySetInnerHTML={{ __html: t.footer.legalAndWarning }}
            />
            
            <div className="relative flex items-center"> {/* Container for button and arrow */}
              <CallToActionButton
                onClick={openAuthenticityModal}
                variant="ghost"
                size="sm"
                className="mt-2 mb-4"
                gaEvent={{ category: 'Footer', action: 'Click_HowToDistinguish_Button' }}
                ymEvent={{ category: 'Footer', action: 'Click_HowToDistinguish_Button' }}
              >
                {t.footer.howToDistinguishButton}
              </CallToActionButton>
              <AnimatedArrow className="ml-2 mt-2 mb-4" /> {/* Position arrow next to button */}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 dark:bg-gray-600 my-4" /> {/* Adjusted divider color for light mode */}

            {/* Official Links Section */}
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{t.footer.officialLinksIntro.split('\n')[0]}</h3> {/* Changed text-gray-900 to text-gray-800 for light mode */}
            <p className="text-sm leading-relaxed mb-4 whitespace-pre-line text-gray-600 dark:text-gray-300"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
              {t.footer.officialLinksIntro.split('\n')[1]}
            </p>

            <div className="flex space-x-3 mb-4">
              <InteractiveDiv
                as="a"
                href="https://www.instagram.com/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                aria-label="Follow us on Instagram"
                whileHoverScale={1.2}
                hoverShadow="none"
                hoverY={0}
                style={{ backgroundColor: '#E1306C' }} // Apply specific color directly
              >
                <Instagram className="w-6 h-6" />
              </InteractiveDiv>
              <InteractiveDiv
                as="a"
                href="https://www.facebook.com/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                aria-label="Follow us on Facebook"
                whileHoverScale={1.2}
                hoverShadow="none"
                hoverY={0}
                style={{ backgroundColor: '#1877F2' }} // Apply specific color directly
              >
                <Facebook className="w-6 h-6" />
              </InteractiveDiv>
              <InteractiveDiv
                as="a"
                href="https://t.me/samyunwanarmenia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                aria-label="Join us on Telegram"
                whileHoverScale={1.2}
                hoverShadow="none"
                hoverY={0}
                style={{ backgroundColor: '#0088CC' }} // Apply specific color directly
              >
                <Send className="w-6 h-6" />
              </InteractiveDiv>
              <InteractiveDiv
                as="a"
                href="https://wa.me/37496653666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-center text-white"
                aria-label="Chat with us on WhatsApp"
                whileHoverScale={1.2}
                hoverShadow="none"
                hoverY={0}
                style={{ backgroundColor: '#25D366' }} // Apply specific color directly
              >
                <MessageCircle className="w-6 h-6" />
              </InteractiveDiv>
            </div>
            <p className="text-xs leading-relaxed text-red-600 dark:text-red-300"> {/* Adjusted text-red-400 to text-red-600 for light mode */}
              {t.footer.officialLinksDisclaimer}
            </p>

            {/* Privacy Policy & Terms Links */}
            <div className="w-full flex flex-col sm:flex-row sm:justify-between mt-4">
              <Link href={`/${currentLang}/privacy`} className="text-xs text-gray-400 hover:text-primary-400 underline" aria-label="Privacy Policy">
                {currentLang === "hy" ? "Գաղտնիության քաղաքականություն" : currentLang === "ru" ? "Политика конфиденциальности" : "Privacy Policy"}
              </Link>
              <Link href={`/${currentLang}/terms`} className="text-xs text-gray-400 hover:text-primary-400 underline mt-1 sm:mt-0 ml-0 sm:ml-3" aria-label="Terms & Conditions">
                {currentLang === "hy" ? "Օգտագործման կանոններ" : currentLang === "ru" ? "Пользовательское соглашение" : "Terms & Conditions"}
              </Link>
            </div>
            {/* Impersonator Info */}
            <div className="mt-4">
              <span className="text-xs text-red-500 block font-semibold">
                {currentLang === "hy"
                  ? "Զգուշացում. Կան կեղծ և չարաբաստիկ էջեր, որոնք ներկայացնում են որպես պաշտոնական: Ձեզ միայն այս կայքի և վերը նշված սոցիալական էջերի միջոցով է ուղարկվելու օրիգինալ ապրանք:"
                  : currentLang === "ru"
                  ? "Внимание: Существуют фальшивые и мошеннические сайты, выдающие себя за официальных поставщиков. Только этот сайт и указанные соцсети являются официальными."
                  : "Warning: Fake and scam websites impersonate the brand. Only this site and the social accounts above are official."}
              </span>
            </div>
          </div>

          {/* Column 2: About Links */}
          <div className="flex flex-col items-start justify-start p-4 md:p-6 rounded-xl bg-gray-100 dark:bg-gray-950 shadow-lg"> {/* Changed bg-gray-900 to bg-gray-100 for light mode */}
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">{t.footer.about}</h3> {/* Changed text-gray-900 to text-gray-800 for light mode */}
            <ul className="space-y-2 text-sm">
              {aboutLinks.map((section) => (
                <li key={section.id}>
                  <InteractiveDiv
                    whileHoverScale={1.05}
                    hoverY={0}
                    hoverShadow="none"
                    className="inline-block" // Ensure div doesn't take full width
                  >
                    <Link href={getSectionPath(section.id)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors" aria-label={t.nav[section.labelKey as keyof TranslationKeys['nav']]}> {/* Changed text-gray-700 to text-gray-600 for light mode */}
                      {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                    </Link>
                  </InteractiveDiv>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Links */}
          <div className="flex flex-col items-start justify-start p-4 md:p-6 rounded-xl bg-gray-100 dark:bg-gray-950 shadow-lg"> {/* Changed bg-gray-900 to bg-gray-100 for light mode */}
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">{t.footer.products}</h3> {/* Changed text-gray-900 to text-gray-800 for light mode */}
            <ul className="space-y-2 text-sm">
              {productLinks.map((section) => (
                <li key={section.id}>
                  <InteractiveDiv
                    whileHoverScale={1.05}
                    hoverY={0}
                    hoverShadow="none"
                    className="inline-block"
                  >
                    <Link href={getSectionPath(section.id)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors" aria-label={t.nav[section.labelKey as keyof TranslationKeys['nav']]}> {/* Changed text-gray-700 to text-gray-600 for light mode */}
                      {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                    </Link>
                  </InteractiveDiv>
                </li>
              ))}
              <li>
                <InteractiveDiv
                  as="button"
                  onClick={openAuthenticityModal}
                  className="hover:text-primary-500 transition-colors text-sm text-left"
                  whileHoverScale={1.05}
                  hoverY={0}
                  hoverShadow="none"
                >
                  {t.footer.productAuthenticity}
                </InteractiveDiv>
              </li>
              <li>
                <InteractiveDiv
                  whileHoverScale={1.05}
                  hoverY={0}
                  hoverShadow="none"
                  className="inline-block"
                >
                  <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors" aria-label={t.footer.productUsage}> {/* Changed text-gray-700 to text-gray-600 for light mode */}
                    {t.footer.productUsage}
                  </Link>
                </InteractiveDiv>
              </li>
            </ul>
          </div>
        </div>

<div className="border-t border-gray-300 dark:border-gray-600 pt-6 text-center"> {/* Adjusted border color for light mode */}
          <p className="text-sm text-gray-600 dark:text-gray-300"> {/* Changed text-gray-700 to text-gray-600 for light mode */}
            © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved} | {t.footer.officialRepresentative}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
