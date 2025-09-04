"use client";

import { useState } from 'react';
import { User, Phone, Send } from 'lucide-react';
import ModalWrapper from './ModalWrapper';
import CallToActionButton from './CallToActionButton';
import { ProductType, CallbackPurpose, CallbackRequestModalProps } from '@/types/global';
import { sendTelegramMessage } from '@/utils/telegramApi';
import { showSuccess, showError } from '@/utils/toast';

const CallbackRequestModal: React.FC<CallbackRequestModalProps> = ({ isOpen, onClose, t, currentLang }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [productType, setProductType] = useState<ProductType>('');
  const [purpose, setPurpose] = useState<CallbackPurpose>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validatePhone = (phoneNumber: string): boolean => {
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name.trim() || !phone.trim() || !productType || !purpose) {
      showError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(phone)) {
      showError(t.callbackRequest.invalidPhone);
      setIsSubmitting(false);
      return;
    }

    const productTypeTranslated = productType === 'weightGain' ? t.callbackRequest.weightGainOption : t.callbackRequest.weightLossOption;
    let purposeTranslated = '';
    if (purpose === 'details') purposeTranslated = t.callbackRequest.purposeDetails;
    else if (purpose === 'orders') purposeTranslated = t.callbackRequest.purposeOrders;
    else if (purpose === 'other') purposeTranslated = t.callbackRequest.purposeOther;

    const telegramMessage = `<b>New Callback Request!</b>\n\n` +
                            `<b>Name:</b> ${name}\n` +
                            `<b>Phone:</b> ${phone}\n` +
                            `<b>Product Type:</b> ${productTypeTranslated}\n` +
                            `<b>Purpose:</b> ${purposeTranslated}\n` +
                            `<b>Language:</b> ${currentLang.toUpperCase()}`;

    try {
      await sendTelegramMessage(telegramMessage);
      showSuccess(t.callbackRequest.successMessage);
      setName('');
      setPhone('');
      setProductType('');
      setPurpose('');
      onClose();

      // Analytics event for successful callback request
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'Submit_CallbackRequest_Success', {
          event_category: 'Callback_Request',
          event_label: `${productTypeTranslated} - ${purposeTranslated}`,
        });
      }
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(103962073, 'reachGoal', 'Submit_CallbackRequest_Success', {
          category: 'Callback_Request',
          label: `${productTypeTranslated} - ${purposeTranslated}`,
        });
      }

    } catch (error: unknown) {
      console.error("Error submitting callback request:", error);
      showError(error instanceof Error ? error.message : "Failed to send callback request. Please try again.");
      // Analytics event for failed callback request
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'Submit_CallbackRequest_Failure', {
          event_category: 'Callback_Request',
          event_label: error instanceof Error ? error.message : 'Unknown Error',
        });
      }
      if (typeof window !== 'undefined' && window.ym) {
        window.ym(103962073, 'reachGoal', 'Submit_CallbackRequest_Failure', {
          category: 'Callback_Request',
          label: error instanceof Error ? error.message : 'Unknown Error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={t.callbackRequest.title}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder={t.callbackRequest.namePlaceholder}
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="tel"
            className="pl-10 pr-3 py-2.5 w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder={t.callbackRequest.phonePlaceholder}
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            {t.callbackRequest.productTypeLabel}
          </label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="productType"
                value="weightGain"
                checked={productType === 'weightGain'}
                onChange={() => setProductType('weightGain')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200">{t.callbackRequest.weightGainOption}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="productType"
                value="weightLoss"
                checked={productType === 'weightLoss'}
                onChange={() => setProductType('weightLoss')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200">{t.callbackRequest.weightLossOption}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            {t.callbackRequest.purposeLabel}
          </label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="purpose"
                value="details"
                checked={purpose === 'details'}
                onChange={() => setPurpose('details')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200">{t.callbackRequest.purposeDetails}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="purpose"
                value="orders"
                checked={purpose === 'orders'}
                onChange={() => setPurpose('orders')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200">{t.callbackRequest.purposeOrders}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600 h-4 w-4"
                name="purpose"
                value="other"
                checked={purpose === 'other'}
                onChange={() => setPurpose('other')}
                required
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200">{t.callbackRequest.purposeOther}</span>
            </label>
          </div>
        </div>

        <CallToActionButton
          type="submit"
          icon={Send}
          disabled={isSubmitting}
          size="md"
          className="mt-6"
          interactionEffect="pixels"
          gaEvent={{ category: 'Callback_Request', action: 'Click_SubmitCallbackRequest' }}
          ymEvent={{ category: 'Callback_Request', action: 'Click_SubmitCallbackRequest' }}
        >
          {isSubmitting ? 'Sending...' : t.callbackRequest.submitButton}
        </CallToActionButton>
      </form>
    </ModalWrapper>
  );
};

export default CallbackRequestModal;