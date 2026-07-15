"use client";

import Link from 'next/link';
import { Award, CheckCircle2, ExternalLink, Leaf, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Icon } from '@/types/global';
import SectionHeader from './SectionHeader';
import { useLayoutContext } from '@/context/LayoutContext';
import {
  DIRECTOR_NAME,
  OFFICIAL_REGISTRY_LAST_UPDATE,
  OFFICIAL_SPYUR_URL,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
} from '@/config/siteConfig';

type AboutItemKey = 'natural' | 'proven' | 'safe' | 'fast';

const aboutItems: { key: AboutItemKey; icon: Icon; gradient: string }[] = [
  { key: 'natural', icon: Leaf,       gradient: 'linear-gradient(135deg, var(--accent), var(--sage))' },
  { key: 'proven',  icon: Award,      gradient: 'linear-gradient(135deg, var(--gold), var(--gold-strong))' },
  { key: 'safe',    icon: Shield,     gradient: 'linear-gradient(135deg, var(--cta), var(--cta-strong))' },
  { key: 'fast',    icon: TrendingUp, gradient: 'linear-gradient(135deg, var(--accent), var(--gold))' },
];

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

const AboutSection = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const { t, currentLang } = useLayoutContext();

  return (
    <motion.section
      id="about"
      className="premium-section relative py-14 sm:py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container relative z-10">
        <SectionHeader
          title={t.about.title}
          subtitle={t.about.subtitle}
          as={headingLevel}
        />

        <motion.p
          className="mx-auto mb-6 max-w-3xl text-center text-lg leading-relaxed text-[var(--text-secondary)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {t.about.description}
        </motion.p>

        <motion.p
          className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-[var(--text-secondary)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          {t.about.content}
        </motion.p>

        <motion.div
          className="premium-card premium-card-hover mx-auto mb-10 max-w-3xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.22 }}
        >
          <h3 className="mb-5 text-2xl font-black text-[var(--text-primary)]">
            {t.about.whyChooseUsTitle}
          </h3>
          <ul className="space-y-3">
            {[
              t.about.whyChooseUsOriginal,
              t.about.whyChooseUsSafety,
              t.about.whyChooseUsNoAdditives,
              t.about.whyChooseUsTrust,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
                <span className="text-base leading-relaxed text-[var(--text-secondary)]">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="premium-card premium-green mx-auto mb-12 max-w-4xl p-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <h3 className="text-xl font-black text-[var(--text-primary)]">
            Samyun Wan Armenia — պաշտոնական / официальный / official source
          </h3>
          <div className="mt-5 grid gap-5 text-sm leading-relaxed text-[var(--text-secondary)] md:grid-cols-2">
            <div className="space-y-1.5">
              <p><span className="font-bold text-[var(--text-primary)]">Director:</span> {DIRECTOR_NAME}</p>
              <p><span className="font-bold text-[var(--text-primary)]">Phones:</span> {PRIMARY_PHONE} / {SECONDARY_PHONE}</p>
              {OFFICIAL_REGISTRY_LAST_UPDATE && (
                <p><span className="font-bold text-[var(--text-primary)]">Registry update:</span> {OFFICIAL_REGISTRY_LAST_UPDATE}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <p>{t.authenticity.purchaseWarning}</p>
              <p className="font-semibold text-red-600 dark:text-red-300">{t.authenticity.disclaimer}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${currentLang}/official`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
            >
              Official Samyun Wan Armenia
            </Link>
            <a
              href={OFFICIAL_SPYUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-premium)] px-4 py-2 text-sm font-bold text-[var(--accent-strong)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
            >
              Spyur <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <Link
              href={`/${currentLang}/how-to-identify-fake`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-gold)] bg-[var(--gold-soft)] px-4 py-2 text-sm font-bold text-[var(--gold-strong)] transition hover:-translate-y-0.5"
            >
              {t.authenticity.howToDistinguish}
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.key}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="premium-card premium-card-hover group p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg shadow-[0_6px_16px_rgba(21,128,61,0.18)] transition-transform duration-300 group-hover:scale-105"
                  style={{ background: item.gradient }}
                >
                  <item.icon className="h-5 w-5 text-white" aria-hidden />
                </div>
                <h3 className="text-base font-black text-[var(--text-primary)]">
                  {t.about[item.key].title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.about[item.key].desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
