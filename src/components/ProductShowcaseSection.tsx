"use client";

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import { productShowcaseData } from '@/data/productShowcaseData';
import CallToActionButton from './CallToActionButton';
import OptimizedImage from './OptimizedImage';

const ProductShowcaseSection = () => {
  const { t, openOrderModal } = useLayoutContext();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.section
      id="products"
      className="relative bg-[var(--surface-main)] py-16 sm:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container space-y-8">
        <SectionHeader title={t.nav.products} />

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{t.productShowcase.seoHeading}</h2>
            <h3 className="text-sm font-medium text-[var(--brand-primary)] dark:text-emerald-200">
              {t.productShowcase.seoSubheading}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.productShowcase.seoParagraph}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productShowcaseData.map((product, index) => {
            const label = t.productShowcase[product.labelKey];
            const description = t.productShowcase[product.descKey];
            const altText = t.productShowcase[product.altKey ?? 'weightGainAlt'];

            return (
              <motion.article
                key={product.labelKey}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.05 * index }}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-[0_6px_26px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                <OptimizedImage
                  src={product.src}
                  alt={altText}
                  className="mx-auto h-40 w-full max-w-[240px] object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{label}</h3>
                    <span className="text-sm font-semibold text-[var(--brand-primary)] dark:text-emerald-200">
                      {product.price.toLocaleString()} AMD
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
                </div>
                <CallToActionButton
                  onClick={() => openOrderModal(product.labelKey)}
                  variant="primary"
                  size="md"
                  gaEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                  ymEvent={{ category: 'Order', action: 'Click_Product_Card', label: product.labelKey }}
                  className="mt-4 w-full"
                >
                  {t.hero.cta}
                </CallToActionButton>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductShowcaseSection;
