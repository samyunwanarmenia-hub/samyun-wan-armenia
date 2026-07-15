import { MapPin, Phone, Clock } from 'lucide-react';
import { ContactInfoItem } from '../types/global';
import { CONTACT_ADDRESS_HTML, CONTACT_HOURS_HTML } from '@/config/siteConfig';

export const contactInfoData: ContactInfoItem[] = [
  {
    key: 'address',
    icon: MapPin,
    titleKey: 'address',
    details: CONTACT_ADDRESS_HTML,
    color: 'linear-gradient(135deg, var(--gold), var(--gold-strong))',
  },
  { 
    key: 'phone', 
    icon: Phone, 
    titleKey: 'phone', 
    details: '', // This will be replaced by t.contact.phoneNumbers.description in the component
    color: 'linear-gradient(135deg, var(--cta), var(--cta-strong))',
  },
  {
    key: 'hours',
    icon: Clock,
    titleKey: 'hours',
    details: CONTACT_HOURS_HTML,
    color: 'linear-gradient(135deg, var(--accent), var(--sage))',
  },
];
