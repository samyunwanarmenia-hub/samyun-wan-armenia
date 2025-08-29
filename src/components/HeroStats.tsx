import { motion } from 'framer-motion';
import { TranslationKeys, StatItem, IntersectionObserverVisibility } from '../types/global';

interface HeroStatsProps {
  t: TranslationKeys;
  stats: StatItem[];
  isVisible: IntersectionObserverVisibility;
}

const statItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const HeroStats: React.FC<HeroStatsProps> = ({ t, stats, isVisible }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"> {/* Reduced gap-6 to gap-4 */}
      {stats.map((stat: StatItem, index: number) => (
        <motion.div 
          key={index} 
          className="text-center"
          variants={statItemVariants}
          initial="hidden"
          animate={isVisible['home'] ? "visible" : "hidden"}
          transition={{ delay: index * 0.1 + 0.8 }} // Staggered animation for stats
        >
          <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-0.5"> {/* Reduced text-2xl/3xl to text-xl/2xl, mb-1 to mb-0.5 */}
            {stat.number}
          </div>
          <div className="text-xs text-gray-700">{t.stats[stat.key]}</div> {/* Reduced text-sm to text-xs */}
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;