/**
 * Lightweight wrapper for the BoardingStocking ad tag.
 * Rendering is skipped entirely when no script URL is configured,
 * so the build won't fail if the ad network isn't set up yet.
 */
"use client";

import Script from 'next/script';

const BOARDING_STOCKING_SRC = process.env.NEXT_PUBLIC_BOARDING_STOCKING_SRC;
const BOARDING_STOCKING_CONTAINER_ID = 'boardingstocking-container';

const AdBoardingStocking = () => {
  if (!BOARDING_STOCKING_SRC) {
    return null;
  }

  return (
    <div className="container py-8 flex justify-center">
      <div
        id={BOARDING_STOCKING_CONTAINER_ID}
        className="w-full max-w-4xl min-h-[90px] flex items-center justify-center"
      />
      <Script
        id="boardingstocking-script"
        src={BOARDING_STOCKING_SRC}
        strategy="afterInteractive"
      />
    </div>
  );
};

export default AdBoardingStocking;
