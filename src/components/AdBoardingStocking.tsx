'use client';

import Script from 'next/script';

/**
 * Ad component for BoardingStocking network.
 *
 * NOTE: This injects a third-party script. Use only if you trust the provider.
 * Placed near the bottom of the page (above footer) to minimize layout shift.
 */
const AdBoardingStocking = () => {
  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-xs">
        <Script id="boardingstocking-config" strategy="afterInteractive">
          {`
            atOptions = {
              'key' : '2c52ac137c7f916542b3d757178b19d2',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `}
        </Script>
        <Script
          id="boardingstocking-script"
          strategy="afterInteractive"
          src="https://boardingstocking.com/2c52ac137c7f916542b3d757178b19d2/invoke.js"
        />
      </div>
    </div>
  );
};

export default AdBoardingStocking;


