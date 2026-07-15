"use client";

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  as?: 'h1' | 'h2';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  as = 'h2',
}) => {
  const TitleTag = as;

  return (
    <motion.div
      className={`mx-auto mb-10 max-w-4xl text-center sm:mb-12 ${className ?? ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto mb-5 flex items-center justify-center" aria-hidden>
        <span className="h-1 w-14 rounded-sm bg-[linear-gradient(90deg,var(--accent),var(--gold))] sm:w-16" />
      </div>

      <TitleTag
        className={`mb-4 font-black text-[var(--text-primary)] [letter-spacing:0] ${titleClassName ?? ''}`}
      >
        {title}
      </TitleTag>

      {subtitle && (
        <p
          className={`mx-auto max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] ${subtitleClassName ?? ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
