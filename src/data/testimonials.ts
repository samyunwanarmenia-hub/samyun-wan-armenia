import { Testimonial } from '../types/global';

export const baseTestimonials: Testimonial[] = [
  {
    id: 'base-1', // Unique ID
    name: 'Անի Հակոբյան', nameRu: 'Ани Акопян', nameEn: 'Ani Hakobyan',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b2e3c6c0?w=150&h=150&fit=crop&crop=face',
    rating: 5, result: '+9kg',
    textHy: '2 ամսում ավելացրի 9 կիլոգրամ: Ախորժակս բարձրացավ, էներգիայս ավելացավ: Շատ գոհ եմ արդյունքից: Առաջին անգամ կարողացա առողջ ճանապարհով քաշ ավելացնել:',
    textRu: 'За 2 месяца набрала 9 килограммов. Аппетит повысился, энергия увеличилась. Очень довольна результатом. Впервые смогла набрать вес здоровым способом.',
    textEn: 'Gained 9 kilograms in 2 months. My appetite increased, my energy increased. Very satisfied with the result. First time I could gain weight in a healthy way.',
  },
  {
    id: 'base-2', // Unique ID
    name: 'Դավիթ Սարգսյան', nameRu: 'Давид Саргсян', nameEn: 'David Sargsyan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5, result: '+12kg',
    textHy: 'Օգտագործել եմ 3 ամիս: Քաշս ավելացել է 12 կգ-ով: Իմունիտետս ամրապնդվել է, հիվանդանում եմ շատ հազվադեպ: Մկանները ստացան լավ տեսք:',
    textRu: 'Использовал 3 месяца. Вес увеличился на 12 кг. Иммунитет укрепился, болею очень редко. Мышцы приобрели хороший вид.',
    textEn: 'Used for 3 months. Weight increased by 12 kg. Immunity strengthened, get sick very rarely. Muscles got a good look.',
  },
  {
    id: 'base-3', // Unique ID
    name: 'Մարիամ Ավանեսյան', nameRu: 'Мариам Аванесян', nameEn: 'Mariam Avanesyan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5, result: '+15kg',
    textHy: 'Առաջին անգամ քաշ եմ ավելացնում: 6 ամսում +15կգ: Շատ բավարարված եմ արդյունքով: Այժմ ունեմ իմ երազած ֆիգուրը:',
    textRu: 'Впервые набираю вес. За 6 месяцев +15кг. Очень удовлетворена результатом. Теперь у меня фигура моей мечты.',
    textEn: 'First time gaining weight. +15kg in 6 months. Very satisfied with the result. Now I have my dream figure.',
  },
];

export const genericNames = [
  { hy: 'Արմեն', ru: 'Армен', en: 'Armen' }, { hy: 'Նարինե', ru: 'Наринэ', en: 'Narine' },
  { hy: 'Գևորգ', ru: 'Геворг', en: 'Gevorg' }, { hy: 'Սիրանուշ', ru: 'Сирануш', en: 'Siranush' },
  { hy: 'Հայկ', ru: 'Айк', en: 'Hayk' }, { hy: 'Էլեն', ru: 'Элен', en: 'Elen' },
  { hy: 'Վահագն', ru: 'Ваагн', en: 'Vahagn' }, { hy: 'Լիլիթ', ru: 'Լիլիթ', en: 'Lilit' },
  { hy: 'Տիգրան', ru: 'Тигран', en: 'Tigran' }, { hy: 'Աննա', ru: 'Анна', en: 'Anna' },
  { hy: 'Սարգիս', ru: 'Սարգիս', en: 'Sargis' }, { hy: 'Մարինե', ru: 'Маринэ', en: 'Marine' },
  { hy: 'Կարեն', ru: 'Карен', en: 'Karen' }, { hy: 'Նունե', ru: 'Նունե', en: 'Nune' },
  { hy: 'Արթուր', ru: 'Артур', en: 'Artur' }, { hy: 'Դիանա', ru: 'Диана', en: 'Diana' },
  { hy: 'Էդգար', ru: 'Эдгар', en: 'Edgar' }, { hy: 'Սոնա', ru: 'Սոնա', en: 'Sona' },
  { hy: 'Ռուբեն', ru: 'Рубен', en: 'Ruben' }, { hy: 'Մելինե', ru: 'Мелинэ', en: 'Meline' },
];

export const genericLastNames = {
  hy: ['Գևորգյան', 'Սարգսյան', 'Հակոբյան', 'Ավետիսյան', 'Մարտիրոսյան', 'Խաչատրյան', 'Պետրոսյան', 'Ղազարյան', 'Մինասյան', 'Դավթյան'],
  ru: ['Геворгян', 'Саргсян', 'Акопян', 'Аветисян', 'Мартиросян', 'Хачатрян', 'Петросян', 'Казарян', 'Минасян', 'Давтян'],
  en: ['Gevorgyan', 'Sargsyan', 'Hakobyan', 'Avetisyan', 'Martirosyan', 'Khachatryan', 'Petrosyan', 'Ghazaryan', 'Minasyan', 'Davtyan'],
};

export const genericTexts = [
  {
    hy: 'Այս կապսուլները իսկապես փոխեցին իմ կյանքը։ Ես զգում եմ ավելի շատ էներգիա և իմ քաշը կայուն աճում է։ Շնորհակալություն Samyun Wan Armenia-ին։',
    ru: 'Эти капсулы действительно изменили мою жизнь. Я чувствую больше энергии, и мой вес стабильно растет. Спасибо Samyun Wan Armenia.',
    en: 'These capsules truly changed my life. I feel more energetic, and my weight is steadily increasing. Thank you Samyun Wan Armenia.',
  },
  {
    hy: 'Ես երկար ժամանակ փորձում էի քաշ հավաքել, բայց ոչինչ չէր օգնում։ Samyun Wan-ը իմ փրկությունն էր։ Ախորժակս բարձրացավ, և ես սկսեցի ավելի լավ քնել։',
    ru: 'Я долго пытался набрать вес, но ничего не помогало. Samyun Wan был моим спасением. Аппетит улучшился, и я стал лучше спать.',
    en: 'I tried to gain weight for a long time, but nothing helped. Samyun Wan was my salvation. My appetite improved, and I started sleeping better.',
  },
  {
    hy: 'Անհավանական արդյունքներ։ Ես զգում եմ ավելի ուժեղ և առողջ։ Իմ ընկերները նկատում են տարբերությունը։ Խորհուրդ եմ տալիս բոլորին։',
    ru: 'Невероятные результаты! Я чувствую себя сильнее и здоровее. Мои друзья замечают разницу. Рекомендую всем.',
    en: 'Incredible results! I feel stronger and healthier. My friends notice the difference. I recommend it to everyone.',
  },
  {
    hy: 'Սկզբում կասկածում էի, բայց որոշեցի փորձել։ Եվ չեմ զղջում։ Քաշս ավելացավ, իմունիտետս ամրապնդվեց։',
    ru: 'Сначала сомневался, но решил попробовать. И не жалею. Вес увеличился, иммунитет укрепился.',
    en: 'At first I was skeptical, but I decided to try. And I don\'t regret it. My weight increased, my immunity strengthened.',
  },
  {
    hy: 'Շատ գոհ եմ Samyun Wan-ից։ Այն ինձ օգնեց հասնել իմ նպատակներին։ Շնորհակալություն ձեր աշխատանքի համար։',
    ru: 'Очень доволен Samyun Wan. Он помог мне достичь моих целей. Спасибо за вашу работу.',
    en: 'Very satisfied with Samyun Wan. It helped me achieve my goals. Thank you for your work.',
  },
  {
    hy: 'Ես զգում եմ ավելի լավ, քան երբևէ։ Իմ մարմինը փոխվել է դրականորեն։ Սա լավագույն լուծումն է քաշի ավելացման համար։',
    ru: 'Я чувствую себя лучше, чем когда-либо. Мое тело изменилось в лучшую сторону. Это лучшее решение для набора веса.',
    en: 'I feel better than ever. My body has changed for the better. This is the best solution for weight gain.',
  },
  {
    hy: 'Այս կապսուլները հրաշքներ են գործում։ Ես ավելացրի իմ քաշը առանց որևէ կողմնակի ազդեցության։',
    ru: 'Эти капсулы творят чудеса. Я набрал вес без каких-либо побочных эффектов.',
    en: 'These capsules work wonders. I gained weight without any side effects.',
  },
  {
    hy: 'Ես շատ ուրախ եմ, որ գտա Samyun Wan-ը։ Այն ինձ տվեց այն արդյունքները, որոնց սպասում էի։',
    ru: 'Я очень рад, что нашел Samyun Wan. Он дал мне те результаты, на которые я рассчитывал.',
    en: 'I am very happy that I found Samyun Wan. It gave me the results I was hoping for.',
  },
  {
    hy: 'Իմ ախորժակը զգալիորեն բարձրացավ, և ես սկսեցի ավելի շատ ուտել։ Քաշս ավելացավ արագ և առողջ ճանապարհով։',
    ru: 'Мой аппетит значительно повысился, и я стал есть больше. Вес увеличился быстро и здоровым способом.',
    en: 'My appetite significantly increased, and I started eating more. My weight increased quickly and healthily.',
  },
  {
    hy: 'Ես խորհուրդ եմ տալիս Samyun Wan-ը բոլորին, ովքեր ցանկանում են առողջ ճանապարհով քաշ ավելացնել։',
    ru: 'Я рекомендую Samyun Wan всем, кто хочет набрать вес здоровым способом.',
    en: 'I recommend Samyun Wan to everyone who wants to gain weight healthily.',
  },
];