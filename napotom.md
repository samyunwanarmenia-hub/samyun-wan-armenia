# Улучшения индексации и аналитики

## Индексация
- ✅ `<html lang>` теперь определяется в серверном `RootLayout` через хедер `x-current-lang`, который выставляет `middleware.ts`.
- ✅ Метаданные по умолчанию в `src/app/layout.tsx` переписаны на читаемый текст (UTF‑8) + свежие keywords.
- ✅ JSON‑LD: корневой лэйаут оставляет Organization/Product, локали подключают только WebSite.
- ✅ Редирект `/ -> /hy` заменён на `permanentRedirect('/hy')`.
- ✅ Sitemap формируется через `app/sitemap.ts` и тянет фактические `lastModified` из `fs.stat`.
- ✅ Статичный `public/robots.txt` удалён, добавлен `app/robots.ts`, который всегда указывает актуальный `SITE_URL`.

## Аналитика / трекинг
- ✅ GA ID берётся из `NEXT_PUBLIC_GA_ID`; события отправляются только после загрузки `gtag`.
- ✅ Яндекс.Метрика загружается по списку доменов из `NEXT_PUBLIC_METRIKA_ALLOWED_HOSTS`, хиты отправляются только когда `ym` готов.
- ✅ Telegram visit tracker теперь предпочитает `navigator.sendBeacon`, что убирает блокирующий fetch.
- ✅ API `/api/notifyVisit` больше не требует Supabase ключей; остаётся только Telegram.

## Дополнительно
- ✅ `app/sitemap.ts` берёт `lastModified` из файловой системы или из `NEXT_BUILD_TIMESTAMP`.
- ☐ (ручное) Создать отдельные ресурсы Search Console для `/hy`, `/ru`, `/en` и отправить ключевые URL на переобход.
