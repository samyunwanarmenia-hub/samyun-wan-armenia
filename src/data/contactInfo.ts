import { MapPin, Phone, Clock } from 'lucide-react';
import { ContactInfoItem } from '../types/global';

export const contactInfoData: ContactInfoItem[] = [
  { key: 'address', icon: MapPin, titleKey: 'address', details: '1 Teryan St, Yerevan, Armenia<br />(Citadel Office)', color: 'from-red-600 to-orange-500' },
  { 
    key: 'phone', 
    icon: Phone, 
    titleKey: 'phone', 
    details: 'Կապվեք մեզ հետ հեռախոսով կամ WhatsApp-ով', // This will be replaced by t.contact.phoneNumbers.description in the component
    color: 'from-green-600 to-blue-500' 
  },
  { key: 'hours', icon: Clock, titleKey: 'hours', details: 'Mon - Sat: 9:00 - 18:00<br />Sunday: 10:00 - 16:00', color: 'from-purple-600 to-pink-500' }
];