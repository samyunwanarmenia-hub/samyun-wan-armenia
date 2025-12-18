/**
 * Telegram Service
 * Centralized service for all Telegram API interactions
 * Handles business logic, validation, error handling, and retry logic
 */

import { sendTelegramMessage as apiSendMessage, sendTelegramPhoto as apiSendPhoto, sendTelegramVideo as apiSendVideo } from '@/utils/telegramApi';
import { TelegramPhotoData, TelegramVideoData } from '@/types/global';

export interface OrderData {
  products: string[];
  totalPrice: number;
  address: string;
  phone: string;
  language: string;
}

export interface CallbackRequestData {
  name: string;
  phone: string;
  productType: string;
  purpose: string;
  language: string;
}

export interface ReviewData {
  name: string;
  text: string;
  rating?: number;
  language: string;
}

/**
 * Telegram Service Class
 * Provides high-level methods for sending different types of messages to Telegram
 */
export class TelegramService {
  /**
   * Send an order notification to Telegram
   */
  async sendOrderNotification(orderData: OrderData): Promise<void> {
    const { products, totalPrice, address, phone, language } = orderData;
    
    const productList = products.join(' & ');
    const message = `<b>New Order!</b>\n\n<b>Products:</b> ${productList}\n<b>Total Price:</b> ${totalPrice} AMD\n<b>Address:</b> ${address}\n<b>Phone:</b> ${phone}\n\n<b>Language:</b> ${language.toUpperCase()}`;
    
    await apiSendMessage(message);
  }

  /**
   * Send a callback request notification to Telegram
   */
  async sendCallbackRequestNotification(data: CallbackRequestData): Promise<void> {
    const { name, phone, productType, purpose, language } = data;
    
    const message = `<b>New Callback Request!</b>\n\n` +
                    `<b>Name:</b> ${name}\n` +
                    `<b>Phone:</b> ${phone}\n` +
                    `<b>Product Type:</b> ${productType}\n` +
                    `<b>Purpose:</b> ${purpose}\n` +
                    `<b>Language:</b> ${language.toUpperCase()}`;
    
    await apiSendMessage(message);
  }

  /**
   * Send a review notification to Telegram
   */
  async sendReviewNotification(reviewData: ReviewData): Promise<void> {
    const { name, text, rating = 5, language } = reviewData;
    
    const message = `<b>🌟 Новый отзыв!</b>\n\n<b>Имя:</b> ${name}\n<b>Отзыв:</b> ${text}\n<b>Рейтинг:</b> ${rating}/5\n\n<b>Язык:</b> ${language.toUpperCase()}`;
    
    await apiSendMessage(message);
  }

  /**
   * Send a custom message to Telegram
   * Use this for simple text messages
   */
  async sendMessage(message: string): Promise<void> {
    await apiSendMessage(message);
  }

  /**
   * Send a photo to Telegram
   */
  async sendPhoto(photoData: TelegramPhotoData): Promise<void> {
    await apiSendPhoto(photoData);
  }

  /**
   * Send a video to Telegram
   */
  async sendVideo(videoData: TelegramVideoData): Promise<void> {
    await apiSendVideo(videoData);
  }
}

// Export a singleton instance
export const telegramService = new TelegramService();

