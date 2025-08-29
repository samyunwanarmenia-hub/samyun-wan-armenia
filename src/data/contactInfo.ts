import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa'; // Changed to Font Awesome icons
import { ContactInfoItem } from '../types/global';

export const contactInfoData: ContactInfoItem[] = [
  { key: 'address', icon: FaMapMarkerAlt, titleKey: 'address', details: '1 Teryan St, Yerevan, Armenia<br />(Citadel Office)', color: 'from-warm-accent to-red-500' }, // Updated color
  { 
    key: 'phone', 
    icon: FaPhone, 
    titleKey: 'phone', 
    details: 'Կապվեք մեզ հետ հեռախոսով կամ WhatsApp-ով',
    color: 'from-primary-green to-secondary-green' // Updated color
  },
  { key: 'hours', icon: FaClock, titleKey: 'hours', details: 'Mon - Sat: 9:00 - 18:00<br />Sunday: 10:00 - 16:00', color: 'from-blue-500 to-indigo-500' } // Updated color
];