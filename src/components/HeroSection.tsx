"use client";

import Link from 'next/link';
import {
  Award,
  BadgeCheck,
  FileCheck2,
  Leaf,
  MessageCircle,
  PackageCheck,
  Phone,
  QrCode,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { StatItem } from '../types/global';
import HeroStats from './HeroStats';
import CallToActionButton from './CallToActionButton';
import { productShowcaseData } from '../data/productShowcaseData';
import { useLayoutContext } from '@/context/LayoutContext';
import HeroQrCodeBlock from './HeroQrCodeBlock';
import OptimizedImage from './OptimizedImage';
import { OFFICIAL_CITY, PRIMARY_PHONE } from '@/config/siteConfig';

interface HeroSectionProps {
  stats: StatItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const cleanLabel = (value: string) => value.replace(/✅|❌|🔍|•/g, '').replace(/^\d+\.\s*/, '').trim();

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const { t, currentLang, openOrderModal } = useLayoutContext();
  const shouldReduceMotion = useReducedMotion();
  const mainProduct = productShowcaseData[0];
  const secondaryProduct = productShowcaseData[1];
  const productLabel = t.productShowcase[mainProduct.labelKey];
  const productDescription = t.productShowcase[mainProduct.descKey];
  const productAlt = t.productShowcase[mainProduct.altKey ?? 'weightGainAlt'];
  const secondaryProductAlt = t.productShowcase[secondaryProduct.altKey ?? 'weightLossAlt'];
  const originalLabel = cleanLabel(t.authenticity.originalTitle);
  const phoneLabel = PRIMARY_PHONE.replace(/(\+374)(\d{2})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  const officialLabel =
    currentLang === 'ru'
      ? 'Официальный представитель'
      : currentLang === 'hy'
        ? 'Պաշտոնական ներկայացուցիչ'
        : 'Official representative';
  const verifyLabel =
    currentLang === 'ru'
      ? 'Проверить перед покупкой'
      : currentLang === 'hy'
        ? 'Ստուգել գնելուց առաջ'
        : 'Verify before buying';

  const trustItems = [
    { icon: Award, label: officialLabel, detail: OFFICIAL_CITY },
    { icon: QrCode, label: t.hero.trustQrVerified, detail: t.hero.qrBlockTitle },
    { icon: Phone, label: phoneLabel, detail: t.contact.phoneNumbers.description },
    { icon: Truck, label: t.hero.trustDelivery, detail: t.hero.trustClients },
  ];

  return (
    <section
      id="home"
      className="premium-section relative isolate overflow-hidden border-b border-[var(--border-soft)] bg-[linear-gradient(140deg,var(--background)_0%,color-mix(in_srgb,var(--leaf-mist)_50%,var(--background))_58%,color-mix(in_srgb,var(--gold-light)_42%,var(--background))_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(20,83,45,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(20,83,45,0.045)_1px,transparent_1px),linear-gradient(115deg,transparent_0_42%,rgba(107,143,113,0.10)_42%_43%,transparent_43%_100%)] [background-size:56px_56px,56px_56px,240px_240px] [mask-image:linear-gradient(180deg,black,transparent_84%)]"
        aria-hidden
      />

      <div className="container relative grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.94fr),minmax(430px,0.82fr)] lg:items-center lg:py-16">
        <div className="max-w-3xl space-y-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex flex-wrap gap-2"
          >
            <Link
              href={`/${currentLang}/official`}
              className="premium-link-chip min-h-10 px-3 py-2 text-xs font-bold"
              aria-label={officialLabel}
            >
              <Award className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden />
              {officialLabel}
            </Link>
            <Link
              href={`/${currentLang}/verify/qr`}
              className="premium-link-chip min-h-10 px-3 py-2 text-xs font-bold"
              aria-label={t.hero.qrBlockTitle}
            >
              <QrCode className="h-3.5 w-3.5 text-[var(--cta)]" aria-hidden />
              {verifyLabel}
            </Link>
            <span className="premium-kicker min-h-10 px-3 py-2 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              {t.hero.guarantee}
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.08}
            className="space-y-4"
          >
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-[var(--gold-strong)] [letter-spacing:0]">
              <Leaf className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              {t.hero.tagline}
            </p>
            <h1 className="font-display max-w-[12ch] text-5xl font-black leading-[0.98] text-[var(--text-primary)] [letter-spacing:0] sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="hero-subtitle max-w-2xl text-lg font-semibold leading-[1.65] text-[var(--text-secondary)] sm:text-xl">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.16}
            className="grid gap-3 sm:max-w-2xl sm:grid-cols-3"
          >
            {[
              { icon: BadgeCheck, text: originalLabel },
              { icon: FileCheck2, text: cleanLabel(t.authenticity.originalFeature4) },
              { icon: PackageCheck, text: cleanLabel(t.authenticity.originalFeature2) },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="premium-proof-item">
                <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
                <span className="text-sm font-bold leading-tight text-[var(--text-primary)]">{text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.22}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CallToActionButton
              onClick={() => openOrderModal(mainProduct.labelKey)}
              icon={ShoppingCart}
              variant="primary"
              size="lg"
              interactionEffect="burst"
              gaEvent={{ category: 'Order', action: 'Click_Hero_OrderNow', label: mainProduct.labelKey }}
              ymEvent={{ category: 'Order', action: 'Click_Hero_OrderNow', label: mainProduct.labelKey }}
              className="w-full shadow-[0_14px_30px_rgba(3,105,161,0.24)] sm:w-auto"
            >
              {t.hero.cta}
            </CallToActionButton>
            <CallToActionButton
              href="https://m.me/samyunwanarmenia"
              target="_blank"
              rel="noopener noreferrer"
              icon={MessageCircle}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              gaEvent={{ category: 'Contact', action: 'Click_Hero_Consultation', label: 'Facebook_Messenger' }}
              ymEvent={{ category: 'Contact', action: 'Click_Hero_Consultation', label: 'Facebook_Messenger' }}
            >
              {t.hero.consultation}
            </CallToActionButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="max-w-2xl border-y border-[var(--border-soft)] py-4"
          >
            <HeroStats t={t} stats={stats} startDelay={0.35} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto grid w-full max-w-[580px] gap-4 lg:mx-0"
        >
          <div className="premium-media-stage min-h-[460px] p-4 sm:min-h-[540px] sm:p-6">
            <div className="relative z-20 flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-[17rem]">
                <p className="text-xs font-black uppercase text-[var(--gold-strong)] [letter-spacing:0]">
                  {productLabel}
                </p>
                <h2 className="font-display mt-1 text-xl font-black leading-tight text-[var(--text-primary)] [letter-spacing:0] sm:text-2xl">
                  {productDescription}
                </h2>
              </div>
              <span className="premium-price-badge px-3 py-2 text-sm sm:text-base">
                {mainProduct.price.toLocaleString()} AMD
              </span>
            </div>

            <div className="relative mt-4 min-h-[355px] sm:min-h-[430px]">
              <div className="absolute left-0 top-5 z-30 max-w-[13.5rem] rounded-lg border border-[var(--border-gold)] bg-[color-mix(in_srgb,var(--surface-card)_92%,var(--gold-light))] px-4 py-3 shadow-[0_12px_28px_rgba(12,26,18,0.10)]">
                <div className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                  <QrCode className="h-4 w-4 text-[var(--cta)]" aria-hidden />
                  {t.hero.qrBlockTitle}
                </div>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--text-secondary)]">
                  {verifyLabel}
                </p>
              </div>

              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -9, 0], rotate: [0, 0.4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[330px] w-[270px] sm:h-[420px] sm:w-[340px]"
              >
                <OptimizedImage
                  src={mainProduct.src}
                  alt={productAlt}
                  className="h-full w-full object-contain drop-shadow-[0_28px_28px_rgba(12,26,18,0.24)]"
                  loading="eager"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 78vw, 340px"
                />
              </motion.div>

              <OptimizedImage
                src={secondaryProduct.src}
                alt={secondaryProductAlt}
                className="absolute bottom-7 right-0 z-20 h-24 w-24 rotate-[-7deg] object-contain drop-shadow-[0_18px_20px_rgba(12,26,18,0.18)] sm:bottom-10 sm:right-2 sm:h-32 sm:w-32"
                loading="lazy"
                fetchPriority="low"
                sizes="132px"
              />

              <div className="absolute bottom-3 left-0 z-30 flex max-w-[16rem] items-center gap-3 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-card)_94%,transparent)] p-3 shadow-[0_14px_34px_rgba(12,26,18,0.12)] backdrop-blur-md sm:bottom-5">
                <OptimizedImage
                  src="/optimized/samyun-arm-original-whey-certificate-150w.webp"
                  alt={`${t.hero.title} - ${cleanLabel(t.authenticity.originalFeature4)}`}
                  className="h-16 w-20 shrink-0 rounded-md object-cover object-left-top"
                  loading="lazy"
                  fetchPriority="low"
                  sizes="80px"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[var(--gold-strong)] [letter-spacing:0]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    {cleanLabel(t.authenticity.originalFeature4)}
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-snug text-[var(--text-secondary)]">
                    {cleanLabel(t.authenticity.originalFeature1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <HeroQrCodeBlock delay={0.2} />
        </motion.div>
      </div>

      <div className="container relative pb-8 sm:pb-10">
        <div className="premium-proof-strip grid rounded-lg p-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="premium-proof-item">
              <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-[var(--text-primary)]">{label}</p>
                <p className="truncate text-xs font-semibold text-[var(--text-muted)]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
