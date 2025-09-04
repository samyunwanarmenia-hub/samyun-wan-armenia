import { supabase } from '@/integrations/supabase/client'; // Импортируем Supabase клиент
import { translations } from '@/i18n/translations';
import { Testimonial, DbReview } from '@/types/global';
import { formatNameInitialLastName } from '@/utils/testimonialGenerator';
import { baseTestimonials } from '@/data/testimonials';
import HomePageClient from '@/components/HomePageClient';

const LangPage = async ({ params }: { params: { lang: string } }) => {
  const currentLang = params.lang as keyof typeof translations;
  const t = translations[currentLang] || translations.hy;

  // Получаем отзывы из Supabase
  const { data: dbReviews, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false }); // Сортируем по дате создания, новые сверху

  if (error) {
    console.error("Error fetching reviews from Supabase:", error.message);
    // В случае ошибки, можно вернуть пустой массив или только базовые отзывы
  }

  const fetchedTestimonials: Testimonial[] = (dbReviews || []).map((review: DbReview) => ({
    id: review.id,
    name: formatNameInitialLastName(review.name),
    nameRu: formatNameInitialLastName(review.name), // Предполагаем, что имя одинаково для всех языков, или можно добавить поля в БД
    nameEn: formatNameInitialLastName(review.name),
    image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`, // Генерируем случайное изображение
    rating: review.rating || 5, // Используем рейтинг из БД, по умолчанию 5
    result: t.testimonials.newReviewLabel, // Помечаем как новый отзыв
    textHy: review.text,
    textRu: review.text,
    textEn: review.text,
  }));

  const allTestimonials = [...fetchedTestimonials, ...baseTestimonials];
  const uniqueTestimonials = Array.from(new Map(allTestimonials.map(item => [item.id, item])).values());

  return <HomePageClient testimonials={uniqueTestimonials} t={t} currentLang={currentLang} />;
};

export default LangPage;