import { buildPageMetadata } from '@/utils/pageMetadata';

export const generateMetadata = ({ params }: { params: { lang: string } }) =>
  buildPageMetadata(params.lang, 'how-to-identify-fake');

const HowToIdentifyFakePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hidden SEO content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Как отличить оригинальный Samyun Wan от подделки
          </h1>
          
          <div className="space-y-8">
            <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-red-800 mb-4">
                ⚠️ ВНИМАНИЕ: Остерегайтесь подделок!
              </h2>
              <p className="text-red-700 text-lg">
                В интернете много мошенников, которые продают подделки! 
                Покупайте только у официального дистрибьютора!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  ✅ Оригинальный Samyun Wan
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li>• QR-код на упаковке для проверки</li>
                  <li>• Покупается только у официального дистрибьютора</li>
                  <li>• Официальная упаковка с логотипом</li>
                  <li>• Сертификат подлинности</li>
                  <li>• Контакт: +37495653666</li>
                </ul>
              </div>

              <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-800 mb-4">
                  ❌ Подделка
                </h3>
                <ul className="space-y-2 text-red-700">
                  <li>• НЕТ QR-кода на упаковке</li>
                  <li>• Продается на неизвестных сайтах</li>
                  <li>• Поддельная упаковка</li>
                  <li>• Нет сертификата</li>
                  <li>• Опасна для здоровья!</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4">
                🔍 Как проверить подлинность
              </h3>
              <ol className="space-y-2 text-blue-700">
                <li>1. Проверьте QR-код на упаковке</li>
                <li>2. Покупайте только у официального дистрибьютора</li>
                <li>3. Остерегайтесь неизвестных сайтов</li>
                <li>4. Звоните +37495653666 для проверки</li>
              </ol>
            </div>

            <div className="text-center">
              <a 
                href="/hy/verify/qr" 
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Проверить подлинность продукта
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToIdentifyFakePage;
