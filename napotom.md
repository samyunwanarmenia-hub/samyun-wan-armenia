# Улучшения индексации и аналитики

## Индексация
- `<html lang>` всегда `hy` (`src/app/layout.tsx`), из-за чего все страницы классифицируются как армянские. Нужно перенести `<html>` в `src/app/[lang]/layout.tsx` или прокинуть `params.lang` в корневой лэйаут.
- Тексты по умолчанию в `src/app/layout.tsx` (title/description/keywords) повреждены и отображаются нечитаемыми. Переписать строки в UTF‑8 без BOM.
- Организация/FAQ/Product JSON‑LD дублируются и в корне, и в `[lang]/layout.tsx`. Оставить один источник или добавить `inLanguage`, чтобы не было дублей.
- Редирект `/ -> /hy` делается через `redirect('/hy')`, что отдаёт 307. Заменить на `permanentRedirect('/hy')`, чтобы Google зафиксировал 308 и связывал `/` с `/hy`.
- Убедиться, что динамический `app/sitemap.ts` действительно отдаёт `https://…/sitemap.xml` (после удаления `public/sitemap.xml`). Переслать карту сайта в Search Console.
- `public/robots.txt` содержит `Sitemap` на Netlify-домен. Если будет кастомный домен, нужен `app/robots.ts` с автоподстановкой корректного URL.

## Аналитика / трекинг
- GA ID захардкожен в `useGoogleAnalytics`. Вынести в `NEXT_PUBLIC_GA_ID`.
- Сейчас `gtag('event','page_view')` и `ym('hit')` вызываются до загрузки скриптов (хуки `useGoogleAnalytics`, `useYandexMetrika`). Добавить проверки `if (typeof window.gtag === 'function')` / `if (typeof window.ym === 'function')` либо вызывать события в `script.onload`.
- Yandex-скрипт грузится только если домен строго равен `SITE_URL`. Разрешить Netlify-превью или управлять через ENV флаг.
- Telegram-трекер (`useVisitTracker`) делает тяжёлые запросы (fetch → ipapi → Telegram) каждые 5 минут и может тормозить вкладку. Перенести отправку на `navigator.sendBeacon`/worker и пересмотреть необходимость ipapi. `lat/lon` всё равно `null`.
- В API `/api/notifyVisit` требуются Supabase ключи, но запись в Supabase не выполняется. Либо реализовать реальную запись, либо убрать ненужные переменные.

## Дополнительно
- В `app/sitemap.ts` даты `lastModified` всегда `new Date()`. Подставить реальные значения (git / статические метки), чтобы Google видел актуальные изменения.
- Создать ресурсы Search Console для `/hy`, `/ru`, `/en` отдельно и пустить через «Проверка URL → Запросить индексирование».
