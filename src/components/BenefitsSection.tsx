"use client";

import { motion } from 'framer-motion';
import { benefitsItemsData } from '../data/benefitsItems';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

const BenefitsSection = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const { t } = useLayoutContext();

  return (
    <motion.section
      id="benefits"
      className="premium-section relative py-14 sm:py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container relative z-10">
        <SectionHeader
          title={t.benefits.title}
          subtitle={t.benefits.subtitle}
          as={headingLevel}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefitsItemsData.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="premium-card premium-card-hover group relative overflow-hidden border-t-4 border-t-[var(--accent)] p-6"
            >
              <div className="relative z-10 space-y-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg shadow-[0_6px_18px_rgba(21,128,61,0.18)] transition-transform duration-300 group-hover:scale-105"
                  style={{ background: benefit.gradient }}
                >
                  <benefit.icon className="h-5 w-5 text-white" aria-hidden />
                </div>

                <h3 className="benefits-title text-lg font-black text-[var(--text-primary)] [letter-spacing:0]">
                  {t.benefits[benefit.key].title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t.benefits[benefit.key].desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;
