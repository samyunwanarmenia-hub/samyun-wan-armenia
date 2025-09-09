"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Clock, MapPin, User } from 'lucide-react';
import SectionHeader from './SectionHeader';
import CallToActionButton from './CallToActionButton';
import { useLayoutContext } from '@/context/LayoutContext';
import LoadingSpinner from './LoadingSpinner';
import { showError } from '@/utils/toast';

// Placeholder for order data - in a real app, this would come from an API
interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery: string; // e.g., "2024-08-15"
  deliveryTime: string; // e.g., "16:00 - 18:00"
  currentLocation: string;
  deliveryAgent: string;
}

const mockOrderData: Record<string, OrderStatus> = {
  'ORDER123': {
    id: 'ORDER123',
    status: 'shipped',
    estimatedDelivery: '2024-08-15',
    deliveryTime: '16:00 - 18:00',
    currentLocation: 'Yerevan Distribution Center',
    deliveryAgent: 'Armen Gevorgyan',
  },
  'ORDER456': {
    id: 'ORDER456',
    status: 'processing',
    estimatedDelivery: '2024-08-17',
    deliveryTime: '10:00 - 12:00',
    currentLocation: 'Warehouse',
    deliveryAgent: 'N/A',
  },
  'ORDER789': {
    id: 'ORDER789',
    status: 'delivered',
    estimatedDelivery: '2024-08-10',
    deliveryTime: '14:30',
    currentLocation: 'Customer Address',
    deliveryAgent: 'Anna Petrosyan',
  },
};

const TrackOrderSection = () => {
  const { t } = useLayoutContext();
  const [orderId, setOrderId] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const getStatusTranslation = (status: OrderStatus['status']) => {
    switch (status) {
      case 'pending': return t.trackOrder.statusPending;
      case 'processing': return t.trackOrder.statusProcessing;
      case 'shipped': return t.trackOrder.statusShipped;
      case 'delivered': return t.trackOrder.statusDelivered;
      case 'cancelled': return t.trackOrder.statusCancelled;
      default: return status;
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrderStatus(null);

    if (!orderId.trim()) {
      showError(t.trackOrder.noOrderId);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const foundOrder = mockOrderData[orderId.toUpperCase()];

    if (foundOrder) {
      setOrderStatus(foundOrder);
    } else {
      setError(t.trackOrder.statusNotFound);
    }
    setIsLoading(false);
  };

  return (
    <motion.section
      id="track-order"
      className="relative py-12 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <SectionHeader
          title={t.nav.trackOrder}
          subtitle={t.trackOrder.subtitle}
        />

        <motion.form
          onSubmit={handleTrackOrder}
          className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <motion.input
              type="text"
              className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder={t.trackOrder.orderIdPlaceholder}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              whileFocus={{ scale: 1.01, borderColor: 'var(--primary-600)' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </div>
          <CallToActionButton
            type="submit"
            icon={Search}
            disabled={isLoading}
            size="md"
            interactionEffect="pixels"
            gaEvent={{ category: 'OrderTracking', action: 'Click_TrackOrder' }}
            ymEvent={{ category: 'OrderTracking', action: 'Click_TrackOrder' }}
          >
            {isLoading ? <LoadingSpinner /> : t.trackOrder.trackButton}
          </CallToActionButton>
        </motion.form>

        {isLoading && (
          <motion.div
            className="flex justify-center items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingSpinner />
            <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">{t.trackOrder.statusProcessing}</p>
          </motion.div>
        )}

        {error && !isLoading && (
          <motion.div
            className="p-6 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-2xl shadow-xl border border-red-200 dark:border-red-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-semibold">{error}</p>
          </motion.div>
        )}

        {orderStatus && !isLoading && !error && (
          <motion.div
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center">
              <Package className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              {t.trackOrder.orderStatus}: <span className="ml-2 text-primary-600 dark:text-primary-400">{getStatusTranslation(orderStatus.status)}</span>
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="flex items-center"><Clock className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> <strong>{t.trackOrder.estimatedDelivery}:</strong> {orderStatus.estimatedDelivery}</p>
              <p className="flex items-center"><Clock className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> <strong>{t.trackOrder.deliveryTime}:</strong> {orderStatus.deliveryTime}</p>
              <p className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> <strong>{t.trackOrder.deliveryLocation}:</strong> {orderStatus.currentLocation}</p>
              {orderStatus.deliveryAgent !== 'N/A' && (
                <p className="flex items-center"><User className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> <strong>{t.trackOrder.deliveryAgent}:</strong> {orderStatus.deliveryAgent}</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default TrackOrderSection;