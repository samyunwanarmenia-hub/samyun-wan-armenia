import { Helmet } from 'react-helmet-async';
import { TranslationKeys } from '../types/global';
import { contactInfoData } from '../data/contactInfo'; // Import contactInfoData
import { productShowcaseData } from '../data/productShowcaseData'; // Import productShowcaseData

interface StructuredDataProps {
  t: TranslationKeys;
  currentLang: string;
}

const StructuredData = ({ t, currentLang }: StructuredDataProps) => {
  const baseUrl = "https://samyunwanarmenia.netlify.app"; // Your base URL

  // Extract phone number from translations
  const phoneNumber = t.contact.phoneNumbers.number1.replace(/\s/g, ''); // Remove spaces for schema

  // Extract address details from contactInfoData
  const addressItem = contactInfoData.find(item => item.key === 'address');
  let streetAddress = "1 Teryan St";
  let addressLocality = "Yerevan";

  if (addressItem && addressItem.details) {
    const cleanedDetails = addressItem.details.replace(/<br \/>\(Citadel Office\)/, '').trim();
    const parts = cleanedDetails.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      streetAddress = parts[0];
      addressLocality = parts[1];
    } else if (parts.length === 1) {
      streetAddress = parts[0];
    }
  }

  // Extract opening hours dynamically
  const hoursItem = contactInfoData.find(item => item.key === 'hours');
  let openingHoursSchema = "Mo-Sa 09:00-18:00, Su 10:00-16:00"; // Default based on contactInfoData
  if (hoursItem && hoursItem.details) {
    const parts = hoursItem.details.split('<br />');
    const weekdays = parts[0].replace('Mon - Sat:', 'Mo-Sa').trim();
    const sunday = parts[1].replace('Sunday:', 'Su').trim();
    openingHoursSchema = `${weekdays}, ${sunday}`;
    // Ensure single digit hours are prefixed with 0 (e.g., 9:00 -> 09:00)
    openingHoursSchema = openingHoursSchema.replace(/(\s)(\d):(\d{2})/g, '$10$2:$3');
  }

  // Product data for schema
  const weightGainProduct = productShowcaseData[0];
  const weightLossProduct = productShowcaseData[1];

  // Helper to get optimized image path
  const getOptimizedImagePath = (originalSrc: string) => {
    const lastSlashIndex = originalSrc.lastIndexOf('/');
    const lastDotIndex = originalSrc.lastIndexOf('.');
    const baseName = originalSrc.substring(lastSlashIndex + 1, lastDotIndex);
    return `/optimized/${baseName}.jpg`; // Use .jpg as the primary optimized fallback
  };

  return (
    <Helmet>
      {/* Set HTML lang attribute dynamically */}
      <html lang={currentLang} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Samyun Wan Armenia",
            "url": "${baseUrl}/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "${baseUrl}/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </script>

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Samyun Wan Armenia",
            "description": "${t.hero.title} – ${t.hero.subtitle}. ${t.hero.tagline}",
            "url": "${baseUrl}/",
            "logo": "${baseUrl}/optimized/logo.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${streetAddress}",
              "addressLocality": "${addressLocality}",
              "addressCountry": "AM"
            },
            "telephone": "${phoneNumber}",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "${phoneNumber}",
              "contactType": "customer service",
              "name": "Aleksandr Gevorgyan",
              "availableLanguage": ["Armenian", "Russian", "English"]
            },
            "sameAs": [
              "https://www.instagram.com/samyunwanarmenia",
              "https://www.facebook.com/samyunwanarmenia"
            ]
          }
        `}
      </script>
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Samyun Wan Armenia",
            "telephone": "${phoneNumber}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${streetAddress}",
              "addressLocality": "${addressLocality}",
              "addressCountry": "AM"
            },
            "url": "${baseUrl}/",
            "openingHours": "${openingHoursSchema}"
          }
        `}
      </script>
      
      {/* Product Schema for Weight Gain Capsules */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "${t.productShowcase[weightGainProduct.labelKey]} Samyun Wan Capsules",
            "image": "${baseUrl}${getOptimizedImagePath(weightGainProduct.src)}",
            "description": "${t.productShowcase[weightGainProduct.descKey]}. ${t.hero.tagline}. Verify with QR code. Օրիգինալ կապսուլներ. Оригинальные капсулы. Free Delivery.",
            "brand": {
              "@type": "Brand",
              "name": "Samyun Wan"
            },
            "offers": {
              "@type": "Offer",
              "url": "${baseUrl}/#products",
              "priceCurrency": "AMD",
              "price": "14000",
              "availability": "https://schema.org/InStock",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": 0,
                  "currency": "AMD"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "AM"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 0,
                      "maxValue": 1,
                      "unitCode": "DAY"
                    },
                    "transitTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 0,
                      "maxValue": 1,
                      "unitCode": "DAY"
                    }
                  }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150"
            }
          }
        `}
      </script>

      {/* Product Schema for Weight Loss Capsules */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "${t.productShowcase[weightLossProduct.labelKey]} Samyun Wan Capsules",
            "image": "${baseUrl}${getOptimizedImagePath(weightLossProduct.src)}",
            "description": "${t.productShowcase[weightLossProduct.descKey]}. ${t.hero.tagline}. Verify with QR code. Օրիգինալ կապսուլներ. Оригинальные капсулы. Free Delivery.",
            "brand": {
              "@type": "Brand",
              "name": "Samyun Wan"
            },
            "offers": {
              "@type": "Offer",
              "url": "${baseUrl}/#products",
              "priceCurrency": "AMD",
              "price": "23000",
              "availability": "https://schema.org/InStock",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": 0,
                  "currency": "AMD"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "AM"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 0,
                      "maxValue": 1,
                      "unitCode": "DAY"
                    },
                    "transitTime": {
                      "@type": "QuantitativeValue",
                      "minValue": 0,
                      "maxValue": 1,
                      "unitCode": "DAY"
                    }
                  }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150"
            }
          }
        `}
      </script>
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "${t.faq.q1}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${t.faq.a1}"
              }
            }, {
              "@type": "Question",
              "name": "${t.faq.q2}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${t.faq.a2}"
              }
            }, {
              "@type": "Question",
              "name": "${t.faq.q3}",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "${t.faq.a3}"
              }
            }]
          }
        `}
      </script>
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "${t.nav.home}",
              "item": "${baseUrl}/"
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": "${t.nav.about}",
              "item": "${baseUrl}/#about"
            }, {
              "@type": "ListItem",
              "position": 3,
              "name": "${t.nav.benefits}",
              "item": "${baseUrl}/#benefits"
            }, {
              "@type": "ListItem",
              "position": 4,
              "name": "${t.footer.products}",
              "item": "${baseUrl}/#products"
            }, {
              "@type": "ListItem",
              "position": 5,
              "name": "${t.nav.testimonials}",
              "item": "${baseUrl}/#testimonials"
            }, {
              "@type": "ListItem",
              "position": 6,
              "name": "${t.nav.faq}",
              "item": "${baseUrl}/#faq"
            }, {
              "@type": "ListItem",
              "position": 7,
              "name": "${t.nav.contact}",
              "item": "${baseUrl}/#contact"
            }]
          }
        `}
      </script>
    </Helmet>
  );
};

export default StructuredData;