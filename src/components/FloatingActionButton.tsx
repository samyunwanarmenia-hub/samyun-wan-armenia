"use client";

import { useState } from 'react';
import { motion } from 'framer-motion'; // Removed AnimatePresence as it's not used
import { MessageCircle, Phone, PhoneCall } from 'lucide-react'; // Removed LifeBuoy as it's not used
import { ContactModalType } from '../types/global';
import { useLayoutContext } from '@/context/LayoutContext';

interface FloatingActionButtonProps {
  openContactModal: (type: ContactModalType) => void;
  openCallbackRequestModal: () => void;
}

const FloatingActionButton = ({ openContactModal, openCallbackRequestModal }: FloatingActionButtonProps) => {
  const { t } = useLayoutContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);

    // Analytics for opening/closing FAB menu
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', isOpen ? 'Close_FAB_Menu' : 'Open_FAB_Menu', {
        event_category: 'FAB_Interaction',
        event_label: isOpen ? 'Closed' : 'Opened',
      });
    }
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103962073, 'reachGoal', isOpen ? 'Close_FAB_Menu' : 'Open_FAB_Menu', {
        category: 'FAB_Interaction',
        label: isOpen ? 'Closed' : 'Opened',
      });
    }
  };

  const handleMenuItemClick = (action: () => void, gaEventLabel: string, ymEventLabel: string) => {
    action();
    setIsOpen(false); // Close menu after clicking an item

    // Analytics for menu item click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'Click_FAB_MenuItem', {
        event_category: 'FAB_Interaction',
        event_label: gaEventLabel,
      });
    }
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(103962073, 'reachGoal', 'Click_FAB_MenuItem', {
        category: 'FAB_Interaction',
        label: ymEventLabel,
      });
    }
  };

  const menuItemsData = [
    {
      label: t.contactModal.callUsButton,
      icon: Phone,
      action: () => openContactModal('call'),
      positionClass: 'fab-action-1',
      gaLabel: 'Call_FAB_Menu',
      ymLabel: 'Call_FAB_Menu',
    },
    {
      label: t.contactModal.whatsapp,
      icon: MessageCircle,
      action: () => openContactModal('message'),
      positionClass: 'fab-action-2',
      gaLabel: 'WhatsApp_FAB_Menu',
      ymLabel: 'WhatsApp_FAB_Menu',
    },
    {
      label: t.contactModal.callbackButton,
      icon: PhoneCall,
      action: openCallbackRequestModal,
      positionClass: 'fab-action-3',
      gaLabel: 'Callback_FAB_Menu',
      ymLabel: 'Callback_FAB_Menu',
    },
  ];

  return (
    <div className="fab-wrapper">
      <input
        type="checkbox"
        id="fab-checkbox"
        className="fab-checkbox"
        checked={isOpen}
        onChange={handleToggle}
      />
      <label className="fab" htmlFor="fab-checkbox">
        <span className="fab-dots fab-dots-1" />
        <span className="fab-dots fab-dots-2" />
        <span className="fab-dots fab-dots-3" />
      </label>

      <div className="fab-wheel">
        {menuItemsData.map((item, index) => (
          <motion.div
            key={index}
            className={`fab-action ${item.positionClass}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
              delay: isOpen ? index * 0.07 : (menuItemsData.length - 1 - index) * 0.03, // Ускоренная задержка
              type: "spring",
              stiffness: 550, // Увеличена жесткость
              damping: 18 // Слегка уменьшено демпфирование
            }}
            onClick={() => handleMenuItemClick(item.action, item.gaLabel, item.ymLabel)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FloatingActionButton;