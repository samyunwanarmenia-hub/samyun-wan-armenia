# Domain conflict audit (samyun-wan.life vs *.netlify.app)

## Findings (current status)
- `public/blogs/index.html` — удалён (устаревший каноникал/OG/LD на Netlify больше не мешает).
- `dev.html` — ссылки теперь ведут на `https://qr-wan.netlify.app/` (помечены nofollow для избежания индексации).
- `tmp_hy_blogs.html` — нет строк с Netlify, оставить как офлайн-выгрузку, если не публикуется.
- `public/sitemap-0.xml` — корректно указывает на `https://samyun-wan.life/*`.
- Redirectы в `netlify.toml` для `*.netlify.app` → `samyun-wan.life` уже есть.
- Документация (`docs/seo-roadmap.md`) всё ещё ссылается на Netlify property (нормально для мониторинга, но отражает легаси).

## Recommended fixes
- Провести сборку/деплой и очистку кэшей/CDN.
- На проде убедиться, что страницы `/`, `/hy`, `/ru`, `/en`, `/products`, `/blogs` и блоги возвращают каноникал на `https://samyun-wan.life/...`.
- Пересдать `sitemap.xml` и запустить URL Inspection по ключевым URL на `samyun-wan.life`.

## Priority checks (после деплоя)
- `/`, `/hy`, `/ru`, `/en`, `/products`, `/blogs` + детали блогов: 200 без редиректов, каноникал `samyun-wan.life`.
- LD+JSON без HTML-экранирования (`&quot;`), проверка через `curl ... | rg '<script type="application/ld+json"' -C2`.
- URL Inspection для перечисленных страниц.

## Batch remediation plan (актуально теперь)
- Консистентность каноникалов: `NEXT_PUBLIC_SITE_URL=https://samyun-wan.life`, проверка `<head>` на проде.
- Redirects: в `netlify.toml` уже настроены `*.netlify.app` → `samyun-wan.life`; верифицировать `curl -I` с http/https.
- Доступность: `dev.html` не публиковать/не ссылать наружу.
- Перекраул: отправить `sitemap.xml`, запустить URL Inspection для главных/языковых/продуктовых/блоговых страниц.
