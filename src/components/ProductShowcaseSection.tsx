"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Leaf, QrCode, ShieldAlert } from 'lucide-react';

import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import { productShowcaseData } from '@/data/productShowcaseData';
import CallToActionButton from './CallToActionButton';
import OptimizedImage from './OptimizedImage';

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const ProductShowcaseSection = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const { t, currentLang, openOrderModal } = useLayoutContext();

  return (
    <motion.section
      id="products"
      className="premium-section relative py-12 sm:py-16 lg:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container space-y-8">
        <SectionHeader title={t.nav.products} as={headingLevel} />

        <div className="grid gap-6 rounded-lg border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-card)_72%,transparent)] px-4 py-5 shadow-sm sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,0.95fr),minmax(320px,0.7fr)] lg:items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-black leading-tight text-[var(--text-primary)] [letter-spacing:0] sm:text-3xl lg:text-4xl">
              {t.productShowcase.seoHeading}
            </h2>
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
              <Leaf className="h-4 w-4 text-[var(--accent)]" aria-hidden />
              <h3 className="text-sm font-semibold text-[var(--text-secondary)]">
                {t.productShowcase.seoSubheading}
              </h3>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              {t.productShowcase.seoParagraph}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
              <Link href={`/${currentLang}/official`} className="premium-link-chip px-3 py-2 text-xs font-semibold">
                <BadgeCheck className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden /> Official Samyun Wan Armenia
              </Link>
              <Link href={`/${currentLang}/verify/qr`} className="premium-link-chip px-3 py-2 text-xs font-semibold">
                <QrCode className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden /> {t.hero.qrBlockTitle}
              </Link>
              <Link href={`/${currentLang}/how-to-identify-fake`} className="premium-link-chip px-3 py-2 text-xs font-semibold">
                <ShieldAlert className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden /> {t.authenticity.howToDistinguish}
              </Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {productShowcaseData.map((product, index) => {
            const label       = t.productShowcase[product.labelKey];
            const description = t.productShowcase[product.descKey];
            const altText     = t.productShowcase[product.altKey ?? 'weightGainAlt'];

            return (
              <motion.article
                key={product.labelKey}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="product-card premium-card premium-card-hover group relative grid overflow-hidden md:min-h-[390px] md:grid-cols-[minmax(0,0.86fr),minmax(230px,0.74fr)]"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,var(--accent),var(--gold))]" aria-hidden />

                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="product-title text-xl font-black leading-tight text-[var(--text-primary)] [letter-spacing:0] sm:text-2xl">
                      {label}
                    </h3>
                    <span className="shrink-0 self-start rounded-lg bg-[var(--accent-strong)] px-3 py-1.5 text-sm font-black text-white shadow-sm">
                      {product.price.toLocaleString()} AMD
                    </span>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className="flex items-center gap-1 rounded-md border border-[var(--border-premium)] bg-[var(--accent-soft)] px-2.5 py-1 text-[var(--accent-strong)]">
                      <QrCode className="h-3 w-3" aria-hidden /> QR
                    </span>
                    <span className="flex items-center gap-1 rounded-md border border-[var(--border-gold)] bg-[var(--gold-soft)] px-2.5 py-1 text-[var(--gold-strong)]">
                      <BadgeCheck className="h-3 w-3" aria-hidden />
                      {t.authenticity.originalTitle.replace(/[✅•]/g, '').trim()}
                    </span>
                  </div>

                  <p className="rounded-md border border-red-200/70 bg-red-50/70 px-3 py-2 text-xs font-medium leading-relaxed text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
                    {t.authenticity.disclaimer}
                  </p>

                  <CallToActionButton
                    onClick={() => openOrderModal(product.labelKey)}
                    variant="primary"
                    size="md"
                    gaEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                    ymEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                    className="mt-auto w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t.hero.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </CallToActionButton>
                </div>

                <div className="relative order-first flex min-h-[230px] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,color-mix(in_srgb,var(--muted-surface)_65%,var(--surface-card)),var(--surface-card))] p-5 md:order-none md:min-h-full md:p-6">
                  <OptimizedImage
                    src={product.src}
                    alt={altText}
                    className="relative z-10 h-52 w-full max-w-[250px] object-contain drop-shadow-[0_18px_24px_rgba(20,83,45,0.15)] transition-transform duration-500 group-hover:scale-105 sm:h-56 md:max-w-[260px]"
                    loading="lazy"
                    fetchPriority="low"
                    sizes="(max-width: 768px) 70vw, 260px"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;
