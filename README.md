# Samyun Wan Armenia - Official Distributor

Welcome to the official repository for Samyun Wan Armenia, the exclusive distributor of original Samyun Wan products in Armenia. This application is built to showcase our products, provide authenticity verification, and facilitate customer orders and inquiries.

## 🚀 Features

*   **Product Showcase**: Display of Samyun Wan weight gain and weight loss products.
*   **Authenticity Verification**: Tools to help users distinguish original products.
*   **Multi-language Support**: Available in Armenian (hy), Russian (ru), and English (en).
*   **Dark/Light Mode**: User-friendly theme toggle.
*   **Contact & Order Modals**: Easy ways for customers to call, message, or place orders.
*   **Testimonials & Reviews**: Section for customer feedback.
*   **SEO Optimized**: Using Next.js Metadata API for dynamic metadata.
*   **Image Optimization**: Automated image optimization for AVIF, WebP, and JPG formats.
*   **Telegram Integration**: Netlify function to send order and review notifications to Telegram.
*   **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
*   **Smooth Animations**: Powered by Framer Motion for engaging UI interactions.

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Next.js
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Animations**: Framer Motion
*   **Image Optimization**: Sharp (Node.js script)
*   **Notifications**: React Hot Toast
*   **Deployment**: Netlify

## ⚙️ Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   pnpm (or npm/yarn)

### Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/samyun-wan-armenia.git
    cd samyun-wan-armenia
    ```
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Optimize Images (CRITICAL for local development and production)**:
    You **MUST** run the image optimization script to generate AVIF, WebP, and optimized JPG versions of images. These optimized images are crucial for the application to display correctly and perform well.
    ```bash
    pnpm run optimize-images
    ```
    This script processes images in `public/images` and outputs optimized versions to `public/optimized/`. If you see 404 errors for images, ensure this step has been completed.

## 🚀 Running the Project

### Development Mode

To start the development server:
```bash
pnpm run dev
```
This will typically open the application at `http://localhost:3000`.

### Production Build

To create a production-ready build:
```bash
pnpm run build
```
The optimized build files will be generated in the `.next/` directory.

### Preview Production Build Locally

To preview the production build locally:
```bash
pnpm run start
```

## 🌐 Deployment to Netlify

This project is configured for seamless deployment to Netlify using the `netlify.toml` file.

### Netlify Configuration

The `netlify.toml` file includes:
*   **Build Command**: `pnpm run optimize-images && pnpm run build` ensures images are optimized before the main build.
*   **Publish Directory**: `.next`
*   **Redirects**: Configured for single-page applications to handle client-side routing.
*   **Security Headers**: Basic security headers are applied.
*   **Caching**: Aggressive caching for optimized images.

### Environment Variables

The Netlify function `netlify/functions/sendTelegramMessage.ts` requires the following environment variables:

*   `TELEGRAM_BOT_TOKEN`: Your Telegram Bot API Token.
*   `TELEGRAM_CHAT_ID`: The chat ID where you want to receive messages.

**How to set them on Netlify:**
1.  Go to your Netlify site dashboard.
2.  Navigate to `Site settings > Build & deploy > Environment variables`.
3.  Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` with their respective values.

## 🖼️ Image Optimization

The project includes a script (`scripts/optimize-images.js`) that uses `sharp` to:
*   Resize images to a maximum width of 1200px.
*   Convert images to WebP and AVIF formats for modern browsers.
*   Save optimized JPG versions.
*   Original images should be placed in `public/images/`. Optimized versions will be output to `public/optimized/`.

This script is automatically run during the Netlify build process.

---

**Samyun Wan Armenia** - Official and Exclusive Distributor