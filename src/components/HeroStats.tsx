import { TranslationKeys, StatItem } from '../types/global';
import { FaUsers, FaChartLine } from 'react-icons/fa'; // Changed to Font Awesome icons

interface HeroStatsProps {
  t: TranslationKeys;
  stats: StatItem[];
}

const HeroStats: React.FC<HeroStatsProps> = ({ t, stats }) => {
  const getIcon = (key: StatItem['key']) => {
    switch (key) {
      case 'customers':
        return FaUsers;
      case 'experience':
        return FaChartLine;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
      data-aos="fade-up" // AOS animation
      data-aos-delay="700"
    >
      {stats.map((stat, index) => {
        const IconComponent = getIcon(stat.key);
        return (
          <div 
            key={stat.key} 
            className="flex items-center bg-pure-white rounded-xl p-4 shadow-md border border-gray-200" // Updated colors
            data-aos="zoom-in" // AOS animation
            data-aos-delay={`${index * 100 + 800}`}
          >
            {IconComponent && <IconComponent className="w-6 h-6 text-primary-green mr-3" />} {/* Updated colors */}
            <div>
              <p className="text-2xl font-bold text-neutral-dark">{stat.number}</p> {/* Updated colors */}
              <p className="text-sm text-neutral-medium">{t.stats[stat.key]}</p> {/* Updated colors */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;