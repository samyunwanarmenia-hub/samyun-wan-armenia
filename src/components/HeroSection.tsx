"use client";

import Link from 'next/link';
import {
  Award,
  BadgeCheck,
  MessageCircle,
  PackageCheck,
  QrCode,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import { StatItem } from '../types/global';
import HeroStats from './HeroStats';
import CallToActionButton from './CallToActionButton';
import { productShowcaseData } from '../data/productShowcaseData';
import { useLayoutContext } from '@/context/LayoutContext';
import HeroQrCodeBlock from './HeroQrCodeBlock';
import OptimizedImage from './OptimizedImage';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  stats: StatItem[];
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const { t, currentLang, openOrderModal } = useLayoutContext();
  const mainProduct = productShowcaseData[0];
  const secondaryProduct = productShowcaseData[1];
  const productLabel = t.productShowcase[mainProduct.labelKey];
  const productDescription = t.productShowcase[mainProduct.descKey];
  const productAlt = t.productShowcase[mainProduct.altKey ?? 'weightGainAlt'];
  const secondaryProductAlt = t.productShowcase[secondaryProduct.altKey ?? 'weightLossAlt'];
  const officialLabel =
    currentLang === 'ru'
      ? 'Официальный представитель'
      : currentLang === 'hy'
        ? 'Պաշտոնական ներկայացուցիչ'
        : 'Official representative';
  const scanLabel =
    currentLang === 'ru'
      ? 'Сканируйте перед покупкой'
      : currentLang === 'hy'
        ? 'Սկանավորեք գնելուց առաջ'
        : 'Scan before buying';

  return (
    <section
      id="home"
      className="premium-section relative isolate overflow-hidden border-b border-[var(--border-soft)] bg-[linear-gradient(135deg,var(--background)_0%,var(--surface-elevated)_52%,color-mix(in_srgb,var(--gold-light)_50%,var(--background))_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(20,83,45,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(20,83,45,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(180deg,black,transparent_82%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--gold-light)_72%,transparent))] lg:block" aria-hidden />

      <div className="container relative grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr),minmax(420px,0.86fr)] lg:items-center lg:py-16">
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
              className="premium-link-chip px-3 py-2 text-xs font-bold"
              aria-label={officialLabel}
            >
              <Award className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden />
              {officialLabel}
            </Link>
            <Link
              href={`/${currentLang}/verify/qr`}
              className="premium-link-chip px-3 py-2 text-xs font-bold"
              aria-label={t.hero.qrBlockTitle}
            >
              <QrCode className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              {t.hero.trustQrVerified}
            </Link>
            <span className="premium-kicker px-3 py-2 text-xs">
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
              <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" aria-hidden />
              {t.hero.tagline}
            </p>
            <h1 className="max-w-[13ch] text-[2.6rem] font-black leading-[0.98] text-[var(--text-primary)] [letter-spacing:0] sm:text-6xl lg:text-[4.6rem]">
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
            className="grid gap-3 sm:max-w-xl sm:grid-cols-3"
          >
            {[
              { icon: BadgeCheck, text: t.authenticity.originalTitle.replace(/[✅•]/g, '').trim() },
              { icon: Truck, text: t.hero.trustDelivery },
              { icon: PackageCheck, text: t.hero.trustClients },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex min-h-16 items-center gap-3 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-card)_86%,transparent)] px-4 py-3 shadow-sm"
              >
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
          className="relative mx-auto grid w-full max-w-[560px] gap-4 lg:mx-0"
        >
          <div className="relative overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[linear-gradient(150deg,var(--surface-card)_0%,color-mix(in_srgb,var(--gold-light)_52%,var(--surface-card))_100%)] p-5 shadow-[0_22px_55px_rgba(20,83,45,0.12)] sm:p-7">
            <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--accent-soft)_70%,transparent),transparent)]" aria-hidden />
            <div className="relative z-20 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-[var(--gold-strong)] [letter-spacing:0]">
                  {productLabel}
                </p>
                <h2 className="mt-1 text-xl font-black leading-tight text-[var(--text-primary)] [letter-spacing:0] sm:text-2xl">
                  {productDescription}
                </h2>
              </div>
              <span className="shrink-0 self-start rounded-lg bg-[var(--accent-strong)] px-3 py-2 text-sm font-black text-white shadow-sm">
                {mainProduct.price.toLocaleString()} AMD
              </span>
            </div>

            <div className="relative mt-4 min-h-[315px] sm:min-h-[390px]">
              <OptimizedImage
                src={mainProduct.src}
                alt={productAlt}
                className="absolute bottom-0 left-1/2 z-10 h-[300px] w-[245px] -translate-x-1/2 object-contain drop-shadow-[0_24px_26px_rgba(20,83,45,0.20)] sm:h-[370px] sm:w-[300px] lg:left-[54%]"
                loading="eager"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 78vw, 340px"
              />

              <OptimizedImage
                src={secondaryProduct.src}
                alt={secondaryProductAlt}
                className="absolute bottom-2 right-0 z-20 h-24 w-24 rotate-[-6deg] object-contain drop-shadow-[0_18px_20px_rgba(20,83,45,0.18)] sm:bottom-4 sm:right-1 sm:h-32 sm:w-32"
                loading="lazy"
                fetchPriority="low"
                sizes="132px"
              />

              <div className="absolute left-0 top-3 z-20 max-w-[13.5rem] rounded-lg border border-[var(--border-gold)] bg-[color-mix(in_srgb,var(--surface-card)_94%,var(--gold-light))] px-4 py-3 shadow-[0_12px_28px_rgba(20,83,45,0.10)] sm:top-7">
                <div className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                  <QrCode className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                  {t.hero.qrBlockTitle}
                </div>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--text-secondary)]">
                  {scanLabel}
                </p>
              </div>
            </div>
          </div>

          <HeroQrCodeBlock delay={0.2} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
