"use client";

import { Phone, MessageCircle, MapPin, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactInfoData } from '../data/contactInfo';
import CallToActionButton from './CallToActionButton';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import type { TranslationKeys } from '@/types/global';
import {
  OFFICIAL_FACEBOOK_URL,
  OFFICIAL_GOOGLE_MAPS_URL,
  OFFICIAL_INSTAGRAM_URL,
} from '@/config/siteConfig';

interface ContactSectionProps {
  translations?: TranslationKeys;
  headingLevel?: 'h1' | 'h2';
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const ContactSection = ({ translations, headingLevel = 'h2' }: ContactSectionProps) => {
  const { t: ctx, currentLang, openContactModal } = useLayoutContext();
  const t = translations ?? ctx;

  return (
    <motion.section
      id="contact"
      className="premium-section relative py-16 sm:py-24"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 0% 50%, rgba(21,128,61,0.06), transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(217,119,6,0.06), transparent 50%)',
        }}
        aria-hidden
      />

      <div className="container relative z-10">
        <SectionHeader title={t.contact.title} as={headingLevel} />

        {/* Info cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {contactInfoData.map((item, index) => (
            <motion.div
              key={item.key}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="premium-card premium-card-hover group flex flex-col items-center gap-4 p-6 text-center"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg shadow-[0_6px_18px_rgba(21,128,61,0.18)] transition-transform duration-300 group-hover:scale-105"
                style={{ background: item.color }}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-[var(--text-primary)]">
                  {t.contact[item.titleKey]}
                </h3>
                <p
                  className="text-sm leading-relaxed text-[var(--text-secondary)]"
                  dangerouslySetInnerHTML={{
                    __html: item.key === 'phone' ? t.contact.phoneNumbers.description : item.details,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hours + address strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-5 grid gap-4 sm:grid-cols-2"
        >
          <div className="premium-card flex items-start gap-4 p-5">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
            <div>
              <p className="text-sm font-black text-[var(--text-primary)]">
                {currentLang === 'ru' ? 'Режим работы' : currentLang === 'hy' ? 'Աշ. ժամ' : 'Working hours'}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {currentLang === 'ru' ? 'Пн–Сб: 9:00–23:00' : 'Mon–Sat: 9:00–23:00'}<br />
                {currentLang === 'ru' ? 'Вс: 10:00–18:00' : 'Sun: 10:00–18:00'}
              </p>
            </div>
          </div>
          <div className="premium-card flex items-start gap-4 p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" aria-hidden />
            <div>
              <p className="text-sm font-black text-[var(--text-primary)]">
                {currentLang === 'ru' ? 'Адрес офиса' : currentLang === 'hy' ? 'Հասցե' : 'Office address'}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                ул. Терян 1, Ереван<br />
                <span className="text-xs">(Citadel Office)</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.32 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <CallToActionButton
            onClick={() => openContactModal('call')}
            icon={Phone}
            variant="primary"
            size="md"
            gaEvent={{ category: 'Contact', action: 'Click_ContactSection_CallNow' }}
            ymEvent={{ category: 'Contact', action: 'Click_ContactSection_CallNow' }}
          >
            {t.contact.callNowButton}
          </CallToActionButton>
          <CallToActionButton
            onClick={() => openContactModal('message')}
            icon={MessageCircle}
            variant="secondary"
            size="md"
            gaEvent={{ category: 'Contact', action: 'Click_ContactSection_WhatsApp' }}
            ymEvent={{ category: 'Contact', action: 'Click_ContactSection_WhatsApp' }}
          >
            {t.contact.whatsappButton}
          </CallToActionButton>
        </motion.div>

        {/* Social follow block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.38 }}
          className="premium-card premium-green mt-8 p-6 text-center"
        >
          <p className="text-base font-black text-[var(--text-primary)]">
            {t.hero.facebookFollow}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
            {currentLang === 'ru'
              ? 'Следите за официальными страницами Samyun Wan Armenia в соцсетях.'
              : 'Follow official Samyun Wan Armenia profiles on social media.'}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={OFFICIAL_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-5 py-2 text-sm font-bold text-white shadow-[0_6px_18px_rgba(21,128,61,0.28)] transition hover:-translate-y-[2px]"
            >
              Facebook <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-premium)] bg-[var(--surface-card)] px-5 py-2 text-sm font-bold text-[var(--accent-strong)] transition hover:-translate-y-[2px] hover:bg-[var(--accent-soft)]"
            >
              Instagram <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={OFFICIAL_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--surface-card)] px-5 py-2 text-sm font-bold text-[var(--text-primary)] transition hover:-translate-y-[2px] hover:border-[var(--border-premium)]"
            >
              Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={`/${currentLang}/official`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--gold-soft)] px-5 py-2 text-sm font-bold text-[var(--gold-strong)] transition hover:-translate-y-[2px]"
            >
              Official details <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
