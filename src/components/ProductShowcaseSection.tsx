"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Leaf,
  PackageCheck,
  QrCode,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import { productShowcaseData } from '@/data/productShowcaseData';
import CallToActionButton from './CallToActionButton';
import OptimizedImage from './OptimizedImage';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const cleanLabel = (value: string) => value.replace(/✅|❌|🔍|•/g, '').replace(/^\d+\.\s*/, '').trim();

const ProductShowcaseSection = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const { t, currentLang, openOrderModal } = useLayoutContext();
  const officialLabel =
    currentLang === 'ru'
      ? 'Официальный Samyun Wan Armenia'
      : currentLang === 'hy'
        ? 'Պաշտոնական Samyun Wan Armenia'
        : 'Official Samyun Wan Armenia';

  const proofLinks = [
    {
      href: `/${currentLang}/official`,
      icon: BadgeCheck,
      label: officialLabel,
      detail: cleanLabel(t.authenticity.originalFeature2),
    },
    {
      href: `/${currentLang}/verify/qr`,
      icon: QrCode,
      label: t.hero.qrBlockTitle,
      detail: cleanLabel(t.authenticity.originalFeature1),
    },
    {
      href: `/${currentLang}/how-to-identify-fake`,
      icon: ShieldAlert,
      label: t.authenticity.howToDistinguish,
      detail: t.authenticity.fakeWarning,
    },
  ];

  return (
    <motion.section
      id="products"
      className="premium-section relative py-14 sm:py-16 lg:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container space-y-8">
        <SectionHeader
          title={t.productShowcase.seoHeading}
          subtitle={t.productShowcase.seoParagraph}
          as={headingLevel}
          titleClassName="max-w-4xl mx-auto"
        />

        <div className="grid gap-3 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-card)_72%,transparent)] p-3 shadow-sm lg:grid-cols-3">
          {proofLinks.map(({ href, icon: Icon, label, detail }) => (
            <Link key={href} href={href} className="premium-proof-item transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-premium)]">
              <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-[var(--text-primary)]">{label}</span>
                <span className="block truncate text-xs font-semibold text-[var(--text-muted)]">{detail}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {productShowcaseData.map((product, index) => {
            const label = t.productShowcase[product.labelKey];
            const description = t.productShowcase[product.descKey];
            const altText = t.productShowcase[product.altKey ?? 'weightGainAlt'];
            const isGain = product.labelKey === 'weightGainLabel';

            return (
              <motion.article
                key={product.labelKey}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="product-card premium-card premium-card-hover group grid min-h-[520px] overflow-hidden md:grid-cols-[minmax(0,0.88fr),minmax(230px,0.72fr)]"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,var(--accent),var(--gold))]" aria-hidden />

                <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-6 lg:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-[var(--gold-strong)] [letter-spacing:0]">
                        <Leaf className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
                        {isGain ? t.benefits.weight.title : t.productShowcase.weightLossDesc}
                      </p>
                      <h3 className="product-title font-display mt-2 text-2xl font-black leading-tight text-[var(--text-primary)] [letter-spacing:0] sm:text-3xl">
                        {label}
                      </h3>
                    </div>
                    <span className="premium-price-badge shrink-0 self-start px-3 py-2 text-sm">
                      {product.price.toLocaleString()} AMD
                    </span>
                  </div>

                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {description}
                  </p>

                  <div className="grid gap-2 text-xs font-bold sm:grid-cols-3">
                    {[
                      { icon: QrCode, text: 'QR' },
                      { icon: BadgeCheck, text: cleanLabel(t.authenticity.originalTitle) },
                      { icon: FileCheck2, text: cleanLabel(t.authenticity.originalFeature4) },
                    ].map(({ icon: Icon, text }) => (
                      <span
                        key={text}
                        className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-[var(--border-premium)] bg-[var(--accent-soft)] px-2.5 py-1.5 text-center text-[var(--accent-strong)]"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {text}
                      </span>
                    ))}
                  </div>

                  <div className="premium-warning-note rounded-md px-3 py-2 text-xs font-semibold leading-relaxed">
                    {t.authenticity.disclaimer}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
                    <CallToActionButton
                      onClick={() => openOrderModal(product.labelKey)}
                      variant="primary"
                      size="md"
                      gaEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                      ymEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                      className="w-full sm:flex-1"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {t.hero.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </CallToActionButton>
                    <Link
                      href={`/${currentLang}/verify/qr`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border-cta)] bg-[var(--cta-soft)] px-4 py-2 text-sm font-black text-[var(--cta-strong)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--cta-soft)_75%,white)]"
                    >
                      <QrCode className="h-4 w-4" aria-hidden />
                      {t.hero.qrBlockTitle}
                    </Link>
                  </div>
                </div>

                <div className="relative order-first flex min-h-[270px] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,color-mix(in_srgb,var(--leaf-mist)_64%,var(--surface-card)),var(--surface-card))] p-5 md:order-none md:min-h-full md:p-6">
                  <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(115deg,transparent_0_44%,rgba(20,83,45,0.08)_44%_45%,transparent_45%_100%),linear-gradient(90deg,rgba(20,83,45,0.04)_1px,transparent_1px)] [background-size:180px_180px,46px_46px]" aria-hidden />
                  <div className="absolute right-4 top-4 z-20 flex max-w-[11rem] items-center gap-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--gold-soft)] px-3 py-1.5 text-center text-xs font-black leading-tight text-[var(--gold-strong)]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    {cleanLabel(t.authenticity.originalFeature2)}
                  </div>
                  <OptimizedImage
                    src={product.src}
                    alt={altText}
                    className="relative z-10 h-64 w-full max-w-[280px] object-contain drop-shadow-[0_24px_28px_rgba(12,26,18,0.18)] transition-transform duration-500 group-hover:scale-105 sm:h-72 md:max-w-[300px]"
                    loading="lazy"
                    fetchPriority="low"
                    sizes="(max-width: 768px) 76vw, 300px"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="grid gap-4 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--leaf-mist)_44%,var(--surface-card))] p-4 shadow-sm md:grid-cols-[auto,minmax(0,1fr),auto] md:items-center">
          <div className="premium-icon h-12 w-12">
            <PackageCheck className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-[var(--text-primary)]">
              {cleanLabel(t.authenticity.verificationTitle)}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.authenticity.purchaseWarning}
            </p>
          </div>
          <Link
            href={`/${currentLang}/how-to-identify-fake`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border-gold)] bg-[var(--gold-soft)] px-5 py-2.5 text-sm font-black text-[var(--gold-strong)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--gold-soft)_70%,white)]"
          >
            <ShieldAlert className="h-4 w-4" aria-hidden />
            {t.authenticity.howToDistinguish}
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;
