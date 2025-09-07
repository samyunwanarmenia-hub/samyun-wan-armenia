"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, PhoneCall, Menu, X } from 'lucide-react';
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
      gaLabel: 'Call_FAB_Menu',
      ymLabel: 'Call_FAB_Menu',
      angle: 0,
      ariaLabel: t.contactModal.callUsButton,
    },
    {
      label: t.contactModal.whatsapp,
      icon: MessageCircle,
      action: () => openContactModal('message'),
      gaLabel: 'WhatsApp_FAB_Menu',
      ymLabel: 'WhatsApp_FAB_Menu',
      angle: 45,
      ariaLabel: t.contactModal.whatsapp,
    },
    {
      label: t.contactModal.callbackButton,
      icon: PhoneCall,
      action: openCallbackRequestModal,
      gaLabel: 'Callback_FAB_Menu',
      ymLabel: 'Callback_FAB_Menu',
      angle: 90,
      ariaLabel: t.contactModal.callbackButton,
    },
  ];

  const radius = 80;

  return (
    <div className="fab-wrapper">
      <motion.button
        className="fab"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="fab-wheel"
        aria-label={isOpen ? t.nav.close : t.nav.open}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={isOpen ? 'x' : 'menu'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute' }}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <motion.div
        id="fab-wheel"
        className="fab-wheel"
        initial={{ scale: 0 }}
        animate={isOpen ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 20 }}
      >
        {menuItemsData.map((item, index) => {
          const angleRad = (item.angle * Math.PI) / 180;
          const xOffset = -radius * Math.sin(angleRad);
          const yOffset = -radius * Math.cos(angleRad);

          return (
            <motion.div
              key={index}
              className="fab-action"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={isOpen ? { opacity: 1, scale: 1, x: xOffset, y: yOffset } : { opacity: 0, scale: 0, x: 0, y: 0 }}
              transition={{
                delay: isOpen ? index * 0.05 : (menuItemsData.length - 1 - index) * 0.02,
                type: "spring",
                stiffness: 600,
                damping: 20
              }}
              onClick={() => handleMenuItemClick(item.action, item.gaLabel, item.ymLabel)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={item.ariaLabel}
            >
              <item.icon className="w-6 h-6" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;