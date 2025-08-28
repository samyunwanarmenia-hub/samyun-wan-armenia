import { TranslationKeys } from '../types/global';

export const translations: Record<string, TranslationKeys> = {
  hy: {
    nav: {
      home: 'Գլխավոր',
      about: 'Մեր մասին',
      benefits: 'Առավելություններ',
      testimonials: 'Գնահատականներ',
      contact: 'Կապ',
      faq: 'Հաճախ տրվող հարցեր' // New FAQ nav item
    },
    hero: {
      title: 'Samyun Wan Armenia',
      subtitle: 'Քաշի կարգավորման ՕՐԻԳԻՆԱԼ և ԱՐԴՅՈՒՆԱՎԵՏ միջոցներ ',
      tagline: 'Փոխելով կազմվածքդ կփոխվի քո կյանքը ',
      cta: 'Պատվիրել հիմա',
      consultation: 'Անվճար խորհրդատվություն',
      guarantee: '100% բնօրինակ երաշխիք',
      qrVerificationTitle: '', // Removed Armenian text as requested
      qrVerificationSubtitle: '', // Removed Armenian text as requested
    },
    stats: {
      customers: 'Գոհ հաճախորդներ',
      experience: 'Տարիների փորձ',
    },
    about: {
      title: 'Ինչու՞ ընտրել Samyun Wan Armenia',
      subtitle: 'Հայաստանի միակ պաշտոնական ներկայացուցիչը',
      natural: {
        title: 'Բնական բաղադրիչներ',
        desc: '100% բնական բույսերից պատրաստված, առանց քիմիական հավելումների'
      },
      proven: {
        title: 'Ապացուցված արդյունավետություն',
        desc: 'Հազարավոր գոհ հաճախորդներ ամբողջ աշխարհում'
      },
      safe: {
        title: 'Անվտանգ օգտագործում',
        desc: 'Նվազագույն կողմնակի ազդեցություններ, բժշկական վերահսկողություն'
      },
      fast: {
        title: 'Արագ արդյունքներ',
        desc: 'Առաջին արդյունքները 1-2 շաբաթից'
      }
    },
    benefits: {
      title: 'Samyun Wan-ի առավելությունները',
      subtitle: 'Ապացուցված արդյունքներ հազարավոր հաճախորդների կողմից',
      appetite: {
        title: 'Ախորժակի բարձրացում',
        desc: 'Բնական ճանապարհով բարձրացնում է ախորժակը և բարելավում հոգեհարազատությունը'
      },
      weight: {
        title: 'Քաշի ավելացում',
        desc: 'Առողջ ճանապարհով ավելացնում է մկանային զանգվածը և ընդհանուր քաշը'
      },
      immunity: {
        title: 'Իմունիտետ',
        desc: 'Ամրապնդում է իմունային համակարգը և բարելավում մարսողությունը'
      },
      energy: {
        title: 'Էներգիա',
        desc: 'Բարձրացնում է էներգիայի մակարդակը և նվազեցնում հոգնածությունը'
      },
      metabolism: {
        title: 'Նյութափոխանակություն',
        desc: 'Բարելավում է նյութափոխանակությունը և սննդանյութերի ներծծումը'
      },
      mood: {
        title: 'Տրամադրություն',
        desc: 'Բարելավում է տրամադրությունը և ընդհանուր կյանքի որակը'
      },
    },
    testimonials: {
      title: 'Իրական հաճախորդների կարծիքները',
      subtitle: 'Ապացույց մեր արդյունավետության',
      formTitle: 'Թողեք Ձեր կարծիքը',
      formSubtitle: 'Մենք ուրախ կլինենք լսել Ձեր պատմությունը',
      namePlaceholder: 'Ձեր անունը',
      reviewPlaceholder: 'Ձեր կարծիքը',
      submitButton: 'Ուղարկել կարծիքը',
      thankYou: 'Շնորհակալություն ձեր կարծիքի համար։ Ձեր կարծիքը շատ կարևոր է մեզ և մյուսների համար։',
      newReviewLabel: 'Նոր կարծիք'
    },
    contact: {
      title: 'Կապվեք մեզ հետ',
      address: 'Հասցե',
      phone: 'Հեռախոս',
      hours: 'Աշխատանքային ժամեր',
      phoneNumbers: {
        number1: '+374 96 653666',
        number2: '+374 95 653666',
        description: 'Կապվեք մեզ հետ հեռախոսով կամ WhatsApp-ով'
      },
      callNowButton: 'Զանգել հիմա',
      whatsappButton: 'WhatsApp'
    },
    footer: {
      about: 'Մեր մասին',
      products: 'Արտադրանք',
      support: 'Օգնություն',
      follow: 'Հետևեք մեզ',
      description: 'Samyun Wan-ի պաշտոնական ներկայացուցիչը Հայաստանում։ Պրեմիում ինդոնեզական բնական կապսուլներ առողջ քաշի ավելացման համար։',
      productOriginal: 'Samyun Wan Օրիգինալ',
      productAuthenticity: 'Ինքնատիպության ստուգում',
      productUsage: 'Օգտագործման ուղեցույց',
      allRightsReserved: 'Բոլոր իրավունքները պաշտպանված են։',
      officialRepresentative: 'Ինդոնեզական արտադրանքի պաշտոնական ներկայացուցիչ'
    },
    contactModal: {
      chooseCall: 'Ընտրեք համար զանգելու համար',
      chooseMessage: 'Ընտրեք կապի եղանակը',
      call: 'Զանգել',
      whatsapp: 'WhatsApp',
      facebookMessenger: 'Facebook Messenger',
      callNumbers: {
        number1: '+374 96 653666',
        number2: '+374 95 653666'
      }
    },
    orderModal: {
      title: 'Պատվիրել Samyun Wan',
      deliveryInfo1: 'Երևանում առաքման պատվեր գրանցելու համար խնդրում ենք տրամադրել առաքման հասցե և հեռախոսահամար :',
      deliveryInfo2: 'Ցանկանում ենք տեղեկացնել , որ առաքում իրականացնում ենք ամեն օր՝ 16:00 ից 22:00',
      addressPlaceholder: 'Առաքման հասցե',
      phonePlaceholder: 'Հեռախոսահամար',
      orderButton: 'Պատվիրել',
      orderSuccess1: 'Ձեր պատվերն ընդունված է : Շնորհակալություն : 💚',
      orderSuccess2: 'Մինչև 22:00 առաքիչը նախապես կապ կհաստատի Ձեզ հետ և կմոտեցնի :',
      invalidPhone: 'Խնդրում ենք մուտքագրել վավեր հեռախոսահամար։',
      selectProducts: 'Ընտրեք ապրանք(ներ)ը:',
      freeDeliveryMessage: 'Անվճար առաքում Երևանում'
    },
    authenticity: {
      title: 'Տարբերեք Օրիգինալը',
      howToDistinguish: 'ինչպե՞ս տարբերել օրիգինալը',
      attention: 'ՈՒՇԱԴՐՈՒԹՅՈՒՆ',
    },
    gallery: {
      title: 'Մեր արտադրանքի պատկերասրահը',
      subtitle: 'Տեսեք Samyun Wan-ի բազմազանությունը և որակը'
    },
    productShowcase: {
      weightGainLabel: '+6 կգ',
      weightGainDesc: 'Քաշի ավելացման համար',
      weightLossLabel: '-10 կգ',
      weightLossDesc: 'Քաշի նվազեցման համար',
      orderWeightGain: 'Պատվիրել քաշի ավելացման համար',
      orderWeightLoss: 'Պատվիրել քաշի նվազեցման համար',
    },
    loadingLinkModal: {
      title: 'Մի պահ սպասեք...',
      message: 'Մենք պատրաստում ենք ձեր անհատական հղումը։',
      waitingForAdmin: 'Խնդրում ենք սպասել, մինչև մեր օպերատորը կուղարկի ձեզ հղումը Telegram-ով։'
    },
    faq: {
      q1: 'Ինչպե՞ս տարբերել օրիգինալը Samyun Wan-ը կեղծից։',
      a1: 'Ստուգեք QR կոդով փաթեթավորման վրա։',
      q2: 'Որքա՞ն ժամանակ է պահանջվում քաշ ավելացնելու համար։',
      a2: '1-2 ամիս կանոնավոր օգտագործմամբ։',
      q3: 'Կա՞ն կողմնակի էֆեկտներ Samyun Wan-ի օգտագործումից։',
      a3: 'Samyun Wan-ը պատրաստված է բնական բաղադրիչներից և չունի կողմնակի ազդեցություններ։'
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      benefits: 'Преимущества',
      testimonials: 'Отзывы',
      contact: 'Контакты',
      faq: 'Часто задаваемые вопросы' // New FAQ nav item
    },
    hero: {
      title: 'Samyun Wan Armenia',
      subtitle: 'ОРИГИНАЛЬНЫЕ и ЭФФЕКТИВНЫЕ средства для регулирования веса',
      tagline: 'Изменив свое телосложение, изменится и твоя жизнь',
      cta: 'Заказать сейчас',
      consultation: 'Бесплатная консультация',
      guarantee: '100% гарантия подлинности',
      qrVerificationTitle: 'Получить ссылку для верификации',
      qrVerificationSubtitle: 'Нажмите, чтобы запросить ссылку',
    },
    stats: {
      customers: 'Довольных клиентов',
      experience: 'Лет опыта',
    },
    about: {
      title: 'Почему выбирают Samyun Wan Armenia',
      subtitle: 'Единственный официальный представитель в Армении',
      natural: {
        title: 'Натуральные ингредиенты',
        desc: '100% натуральные травы без химических добавок'
      },
      proven: {
        title: 'Доказанная эффективность',
        desc: 'Тысячи довольных клиентов по всему миру'
      },
      safe: {
        title: 'Безопасное использование',
        desc: 'Минимальные побочные эффекты, медицинский контроль'
      },
      fast: {
        title: 'Быстрые результаты',
        desc: 'Первые результаты через 1-2 недели'
      }
    },
    benefits: {
      title: 'Преимущества Samyun Wan',
      subtitle: 'Доказанные результаты тысячами клиентов',
      appetite: {
        title: 'Повышение аппетита',
        desc: 'Естественно повышает аппетит и улучшает самочувствие'
      },
      weight: {
        title: 'Набор веса',
        desc: 'Здоровым способом увеличивает мышечную массу и общий вес'
      },
      immunity: {
        title: 'Иммунитет',
        desc: 'Укрепляет иммунную систему и улучшает пищеварение'
      },
      energy: {
        title: 'Энергия',
        desc: 'Повышает уровень энергии и снижает усталость'
      },
      metabolism: {
        title: 'Метаболизм',
        desc: 'Улучшает метаболизм и усвоение питательных веществ'
      },
      mood: {
        title: 'Настроение',
        desc: 'Улучшает настроение и общее качество жизни'
      },
    },
    testimonials: {
      title: 'Отзывы реальных клиентов',
      subtitle: 'Доказательство нашей эффективности',
      formTitle: 'Оставьте свой отзыв',
      formSubtitle: 'Мы будем рады услышать вашу историю',
      namePlaceholder: 'Ваше имя',
      reviewPlaceholder: 'Ваш отзыв',
      submitButton: 'Отправить отзыв',
      thankYou: 'Спасибо за ваш отзыв. Ваше мнение очень важно для нас и для других.',
      newReviewLabel: 'Новый отзыв'
    },
    contact: {
      title: 'Связаться с нами',
      address: 'Адрес',
      phone: 'Телефон',
      hours: 'Рабочие часы',
      phoneNumbers: {
        number1: '+374 96 653666',
        number2: '+374 95 653666',
        description: 'Свяжитесь с нами по телефону или WhatsApp'
      },
      callNowButton: 'Позвонить сейчас',
      whatsappButton: 'WhatsApp'
    },
    footer: {
      about: 'О нас',
      products: 'Продукты',
      support: 'Поддержка',
      follow: 'Подпишитесь на нас',
      description: 'Официальный представитель Samyun Wan в Армении. Премиальные индонезийские натуральные капсулы для здорового набора веса.',
      productOriginal: 'Samyun Wan Оригинал',
      productAuthenticity: 'Проверка подлинности',
      productUsage: 'Руководство по использованию',
      allRightsReserved: 'Все права защищены.',
      officialRepresentative: 'Официальный представитель индонезийского продукта'
    },
    contactModal: {
      chooseCall: 'Выберите номер для звонка',
      chooseMessage: 'Выберите способ связи',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      facebookMessenger: 'Facebook Messenger',
      callNumbers: {
        number1: '+374 96 653666',
        number2: '+374 95 653666'
      }
    },
    orderModal: {
      title: 'Заказать Samyun Wan',
      deliveryInfo1: 'Для оформления заказа с доставкой в Ереване, пожалуйста, укажите адрес доставки и номер телефона.',
      deliveryInfo2: 'Хотим сообщить, что доставка осуществляется ежедневно с 16:00 до 22:00.',
      addressPlaceholder: 'Адрес доставки',
      phonePlaceholder: 'Номер телефона',
      orderButton: 'Заказать',
      orderSuccess1: 'Ваш заказ принят. Спасибо! 💚',
      orderSuccess2: 'До 22:00 курьер свяжется с Вами заранее и доставит заказ.',
      invalidPhone: 'Пожалуйста, введите действительный номер телефона.',
      selectProducts: 'Выберите продукты для заказа:',
      freeDeliveryMessage: 'Бесплатная доставка по Еревану'
    },
    authenticity: {
      title: 'Отличите оригинал',
      howToDistinguish: 'Как отличить оригинал',
      attention: 'ВНИМАНИЕ',
    },
    gallery: {
      title: 'Галерея наших продуктов',
      subtitle: 'Посмотрите разнообразие и качество Samyun Wan'
    },
    productShowcase: {
      weightGainLabel: '+6 кг',
      weightLossLabel: '-10 кг',
      weightGainDesc: 'Для набора веса',
      weightLossDesc: 'Для похудения',
      orderWeightGain: 'Заказать для набора веса',
      orderWeightLoss: 'Заказать для похудения',
    },
    loadingLinkModal: {
      title: 'Пожалуйста, подождите...',
      message: 'Мы готовим вашу персональную ссылку.',
      waitingForAdmin: 'Пожалуйста, ожидайте, пока наш оператор отправит вам ссылку в Telegram.'
    },
    faq: {
      q1: 'Как отличить оригинальный Samyun Wan от подделки?',
      a1: 'Проверьте QR-код на упаковке.',
      q2: 'Сколько времени требуется для набора веса?',
      a2: 'При регулярном использовании 1-2 месяца.',
      q3: 'Есть ли побочные эффекты от использования Samyun Wan?',
      a3: 'Samyun Wan изготовлен из натуральных ингредиентов и не имеет побочных эффектов.'
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      benefits: 'Benefits',
      testimonials: 'Testimonials',
      contact: 'Contact',
      faq: 'FAQ' // New FAQ nav item
    },
    hero: {
      title: 'Samyun Wan Armenia',
      subtitle: 'ORIGINAL and EFFECTIVE weight management solutions',
      tagline: 'Changing your physique will change your life',
      cta: 'Order Now',
      consultation: 'Free Consultation',
      guarantee: '100% Original Guarantee',
      qrVerificationTitle: 'Request Verification Link',
      qrVerificationSubtitle: 'Click to request the link',
    },
    stats: {
      customers: 'Happy Customers',
      experience: 'Years of Experience',
    },
    about: {
      title: 'Why Choose Samyun Wan Armenia',
      subtitle: 'The Only Official Representative in Armenia',
      natural: {
        title: 'Natural Ingredients',
        desc: 'Made from 100% natural herbs, without chemical additives'
      },
      proven: {
        title: 'Proven Effectiveness',
        desc: 'Thousands of satisfied customers worldwide'
      },
      safe: {
        title: 'Safe to Use',
        desc: 'Minimal side effects, medical supervision'
      },
      fast: {
        title: 'Fast Results',
        desc: 'First results within 1-2 weeks'
      }
    },
    benefits: {
      title: 'Benefits of Samyun Wan',
      subtitle: 'Proven results by thousands of customers',
      appetite: {
        title: 'Appetite Enhancement',
        desc: 'Naturally increases appetite and improves well-being'
      },
      weight: {
        title: 'Weight Gain',
        desc: 'Healthy increase in muscle mass and overall weight'
      },
      immunity: {
        title: 'Immunity Boost',
        desc: 'Strengthens the immune system and improves digestion'
      },
      energy: {
        title: 'Energy Levels',
        desc: 'Increases energy levels and reduces fatigue'
      },
      metabolism: {
        title: 'Metabolism Improvement',
        desc: 'Enhances metabolism and nutrient absorption'
      },
      mood: {
        title: 'Mood Enhancement',
        desc: 'Improves mood and overall quality of life'
      },
    },
    testimonials: {
      title: 'Real Customer Reviews',
      subtitle: 'Proof of Our Effectiveness',
      formTitle: 'Leave Your Review',
      formSubtitle: 'We would love to hear your story',
      namePlaceholder: 'Your Name',
      reviewPlaceholder: 'Your Review',
      submitButton: 'Submit Review',
      thankYou: 'Thank you for your review. Your feedback is very important to us and others.',
      newReviewLabel: 'New Review'
    },
    contact: {
      title: 'Contact Us',
      address: 'Address',
      phone: 'Phone',
      hours: 'Working Hours',
      phoneNumbers: {
        number1: '+374 96 653666',
        number2: '+374 95 653666',
        description: 'Contact us by phone or WhatsApp'
      },
      callNowButton: 'Call Now',
      whatsappButton: 'WhatsApp'
    },
    footer: {
      about: 'About Us',
      products: 'Products',
      support: 'Support',
      follow: 'Follow Us',
      description: 'Official Samyun Wan representative in Armenia. Premium Indonesian natural capsules for healthy weight gain.',
      productOriginal: 'Samyun Wan Original',
      productAuthenticity: 'Authenticity Check',
      productUsage: 'Usage Guide',
      allRightsReserved: 'All rights reserved.',
      officialRepresentative: 'Official Indonesian Product Representative'
    },
    contactModal: {
      chooseCall: 'Choose a number to call',
      chooseMessage: 'Choose a contact method',
      call: 'Call',
      whatsapp: 'WhatsApp',
      facebookMessenger: 'Facebook Messenger',
      callNumbers: {
        number1: '+374 96 653666',
        number2: '+374 95 653666'
      }
    },
    orderModal: {
      title: 'Order Samyun Wan',
      deliveryInfo1: 'To place a delivery order in Yerevan, please provide your delivery address and phone number.',
      deliveryInfo2: 'We would like to inform you that delivery is carried out daily from 16:00 to 22:00.',
      addressPlaceholder: 'Delivery Address',
      phonePlaceholder: 'Phone Number',
      orderButton: 'Order',
      orderSuccess1: 'Your order has been accepted. Thank you! 💚',
      orderSuccess2: 'Before 22:00, the courier will contact you in advance and deliver the order.',
      invalidPhone: 'Please enter a valid phone number.',
      selectProducts: 'Select product(s) to order:',
      freeDeliveryMessage: 'Free delivery in Yerevan'
    },
    authenticity: {
      title: 'Distinguish the Original',
      howToDistinguish: 'How to distinguish the original',
      attention: 'ATTENTION',
    },
    gallery: {
      title: 'Our Product Gallery',
      subtitle: 'See the variety and quality of Samyun Wan'
    },
    productShowcase: {
      weightGainLabel: '+6 kg',
      weightLossLabel: '-10 kg',
      weightGainDesc: 'For Weight Gain',
      weightLossDesc: 'For Weight Loss',
      orderWeightGain: 'Order for Weight Gain',
      orderWeightLoss: 'Order for Weight Loss',
    },
    loadingLinkModal: {
      title: 'Please wait...',
      message: 'We are preparing your personalized link.',
      waitingForAdmin: 'Please wait while our operator sends you the link via Telegram.'
    },
    faq: {
      q1: 'How to distinguish original Samyun Wan from fake?',
      a1: 'Check the QR code on the packaging.',
      q2: 'How long does it take to gain weight?',
      a2: 'With 1-2 months of regular use.',
      q3: 'Are there side effects from using Samyun Wan?',
      a3: 'Samyun Wan is made from natural ingredients and has no side effects.'
    },
  }
};