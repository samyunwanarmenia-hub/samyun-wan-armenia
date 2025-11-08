"use client";

import { Instagram, Facebook, MessageCircle, Send, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { useLayoutContext } from '@/context/LayoutContext';
import useNavigationUtils from '@/hooks/useNavigationUtils';
import { navigationSections } from '@/data/navigationSections';
import CallToActionButton from './CallToActionButton';
import AnimatedArrow from './AnimatedArrow';
import InteractiveDiv from './InteractiveDiv';
import type { TranslationKeys } from '@/types/global';

const Footer = () => {
  const { t, currentLang, openAuthenticityModal, openContactModal } = useLayoutContext();
  const { getHomePath, getSectionPath } = useNavigationUtils(currentLang);

  const aboutLinks = navigationSections.filter(section =>
    ['about', 'benefits', 'testimonials', 'contact'].includes(section.id),
  );
  const productLinks = navigationSections.filter(section => ['products', 'faq'].includes(section.id));

  type MessengerLink = {
    href: string;
    label: string;
    icon: LucideIcon;
    accent: string;
  };

  const messengerLinks: MessengerLink[] = [
    {
      href: 'https://wa.me/37495653666',
      label: 'WhatsApp +374 95 653 666',
      icon: MessageCircle,
      accent: '#25D366',
    },
    {
      href: 'https://wa.me/37496653666',
      label: 'WhatsApp +374 96 653 666',
      icon: MessageCircle,
      accent: '#128C7E',
    },
    {
      href: 'https://t.me/samyunwanarmenia',
      label: 'Telegram samyunwanarmenia',
      icon: Send,
      accent: '#0088CC',
    },
  ];

  const socialLinks = [
    {
      href: 'https://www.instagram.com/samyunwanarmenia',
      label: 'Instagram Samyun Wan Armenia',
      bg: '#E1306C',
      icon: <Instagram className="w-6 h-6" />,
    },
    {
      href: 'https://www.facebook.com/samyunwanarmenia',
      label: 'Facebook Samyun Wan Armenia',
      bg: '#1877F2',
      icon: <Facebook className="w-6 h-6" />,
    },
  ];

  const combinedSocialLinks = [
    ...socialLinks,
    ...messengerLinks.map(link => ({
      href: link.href,
      label: link.label,
      bg: link.accent,
      icon: <link.icon className="w-6 h-6" />,
    })),
  ];


  return (
    <footer className="relative z-30 w-full min-h-[50vh] flex flex-col justify-end items-center pt-20 pb-8 px-4 md:px-8 text-gray-300 dark:text-gray-400">
      <div className="absolute inset-0 backdrop-blur-xl z-[-5] [mask-image:linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0)_100%)] [-webkit-mask-image:linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_10%,rgba(0,0,0,0.8)_20%,rgba(0,0,0,1)_30%,rgb(0,0,0)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-[-7]" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          <div className="flex flex-col items-start justify-start p-5 rounded-xl bg-gray-100 dark:bg-gray-950 shadow-lg text-gray-700 dark:text-gray-200">
            <Link href={getHomePath()} className="flex items-center mb-4" aria-label={t.hero.title}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
                {t.hero.title}
              </h2>
            </Link>

            <p
              className="text-sm leading-relaxed mb-4 whitespace-pre-line text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: t.footer.legalAndWarning }}
            />

            <div className="flex items-center gap-3 mb-6">
              <CallToActionButton
                onClick={openAuthenticityModal}
                variant="ghost"
                size="sm"
                gaEvent={{ category: 'Footer', action: 'Click_HowToDistinguish_Button' }}
                ymEvent={{ category: 'Footer', action: 'Click_HowToDistinguish_Button' }}
              >
                {t.footer.howToDistinguishButton}
              </CallToActionButton>
              <AnimatedArrow />
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              {combinedSocialLinks.map(link => (
                <InteractiveDiv
                  key={link.href}
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-600 rounded-md flex items-center justify-center text-white"
                  aria-label={link.label}
                  whileHoverScale={1.15}
                  hoverShadow="none"
                  hoverY={0}
                  style={{ backgroundColor: link.bg }}
                >
                  {link.icon}
                </InteractiveDiv>
              ))}
            </div>

            <p className="text-xs leading-relaxed text-red-600 dark:text-red-300">{t.footer.caution}</p>

          </div>

          <div className="flex flex-col items-start justify-start p-5 rounded-xl bg-gray-100 dark:bg-gray-950 shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">{t.footer.about}</h3>
            <ul className="space-y-2 text-sm w-full">
              {aboutLinks.map(section => (
                <li key={section.id}>
                  <InteractiveDiv
                    as="a"
                    href={getSectionPath(section.id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                    aria-label={t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                    whileHoverScale={1.02}
                  >
                    {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                  </InteractiveDiv>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-lg my-4 text-gray-800 dark:text-white">{t.footer.support}</h3>
            <div className="flex flex-col gap-3 w-full">
              <InteractiveDiv
                as="button"
                onClick={() => openContactModal('call')}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-primary-500 rounded-md text-primary-600 dark:text-primary-300"
                whileHoverScale={1.03}
              >
                <MessageCircle className="w-5 h-5" />
                {t.contact.callNowButton}
              </InteractiveDiv>
              <InteractiveDiv
                as="a"
                href="https://wa.me/37495653666"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-green-500 rounded-md text-green-600"
                whileHoverScale={1.03}
                style={{ backgroundColor: '#25D36610' }}
              >
                <Send className="w-5 h-5" />
                WhatsApp
              </InteractiveDiv>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start p-5 rounded-xl bg-gray-100 dark:bg-gray-950 shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">{t.footer.products}</h3>
            <ul className="space-y-2 text-sm w-full">
              {productLinks.map(section => (
                <li key={section.id}>
                  <InteractiveDiv
                    as="a"
                    href={getSectionPath(section.id)}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                    aria-label={t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                    whileHoverScale={1.02}
                  >
                    {t.nav[section.labelKey as keyof TranslationKeys['nav']]}
                  </InteractiveDiv>
                </li>
              ))}
            </ul>

            <div className="w-full flex flex-col sm:flex-row sm:justify-between mt-4">
              <Link href={`/${currentLang}/privacy`} className="text-xs text-gray-400 hover:text-primary-400 underline" aria-label="Privacy Policy">
                {currentLang === 'hy'
                  ? 'Գաղտնիության քաղաքականություն'
                  : currentLang === 'ru'
                    ? 'Политика конфиденциальности'
                    : 'Privacy Policy'}
              </Link>
              <Link href={`/${currentLang}/terms`} className="text-xs text-gray-400 hover:text-primary-400 underline mt-1 sm:mt-0" aria-label="Terms & Conditions">
                {currentLang === 'hy'
                  ? 'Օգտագործման պայմաններ'
                  : currentLang === 'ru'
                    ? 'Пользовательское соглашение'
                    : 'Terms & Conditions'}
              </Link>
            </div>

            <div className="mt-4">
              <span className="text-xs text-red-500 block font-semibold">{t.footer.caution}</span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-700 pt-4">
          © 2025 Samyun Wan Armenia. {t.footer.allRightsReserved}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
