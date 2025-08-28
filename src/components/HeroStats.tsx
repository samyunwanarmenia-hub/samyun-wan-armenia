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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat: StatItem, index: number) => (
        <motion.div 
          key={index} 
          className="text-center"
          variants={statItemVariants}
          initial="hidden"
          animate={isVisible['home'] ? "visible" : "hidden"}
          transition={{ delay: index * 0.1 + 0.8 }} // Staggered animation for stats
        >
          <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div> {/* Changed text color to gray-900 */}
          <div className="text-sm text-gray-700">{t.stats[stat.key]}</div> {/* Changed text color to gray-700 */}
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;