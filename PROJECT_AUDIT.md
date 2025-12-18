# Project Audit Report: Samyun Wan Armenia

**Generated:** 2025-01-27  
**Project:** Samyun Wan Armenia - Multilingual E-commerce Website  
**Tech Stack:** Next.js 14 (App Router), TypeScript, React 18, Tailwind CSS, Netlify

---

## 1. Project Overview

### Description
A multilingual (Armenian, Russian, English) e-commerce website for Samyun Wan Armenia, a weight management product distributor. The site includes product showcaos, order forms, QR verification, blog posts, testimonials, and contact management. It integrates with Telegram for notifications and uses Supabase (configured but not actively used).

### Tech Stack Summary
- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript 5.4.5
- **UI:** React 18.2.0, Tailwind CSS 3.3.3
- **Animations:** Framer Motion 10.18.0
- **Icons:** Lucide React 0.263.1
- **State Management:** React Context API, Custom Hooks
- **Deployment:** Netlify (via `@netlify/plugin-nextjs`)
- **SEO:** next-sitemap 4.2.3, Custom metadata utilities
- **Analytics:** Google Analytics, Google Tag Manager, Yandex Metrika
- **Backend Services:** Telegram Bot API, Supabase (configured but minimal usage)

---

## 2. High-Priority Issues (Must Fix Soon)

### 🔴 CRITICAL: In-Memory Rate Limiting (Not Production-Safe)

**Files:**
- `src/app/api/sendTelegramMessage/route.ts` (lines 10-26)
- `src/app/api/notifyVisit/route.ts` (lines 54-70)

**Problem:**
Rate limiting uses in-memory `Map` objects that reset on every serverless function invocation. In a serverless environment (Netlify Functions), this provides no protection against distributed attacks.

**Impact:**
- Rate limits are ineffective in production
- API endpoints can be easily abused
- Potential cost spikes from Telegram API calls
- No protection against coordinated attacks

**Recommended Fix:**
```typescript
// Use Redis or a persistent store (e.g., Upstash Redis, Vercel KV)
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

const checkRateLimit = async (key: string, windowMs: number, maxRequests: number) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  const redisKey = `ratelimit:${key}`;
  
  // Use sliding window log
  const count = await redis.zcount(redisKey, windowStart, now);
  if (count >= maxRequests) return false;
  
  await redis.zadd(redisKey, { score: now, member: `${now}-${Math.random()}` });
  await redis.zremrangebyscore(redisKey, 0, windowStart);
  await redis.expire(redisKey, Math.ceil(windowMs / 1000));
  
  return true;
};
```

**Alternative (Simpler):** Use Netlify's built-in rate limiting or a service like Cloudflare.

---

### 🔴 CRITICAL: HTML Injection Risk in Telegram Messages

**Files:**
- `src/app/api/sendTelegramMessage/route.ts` (line 60)
- `src/app/api/notifyVisit/route.ts` (line 198)
- `src/hooks/useOrderForm.ts` (line 90)

**Problem:**
User input is sent to Telegram with `parse_mode: 'HTML'` but only basic sanitization is applied. The `sanitizeMessage` function only trims and limits length but doesn't escape HTML entities.

**Impact:**
- Potential HTML injection in Telegram messages
- Could break message formatting
- Security risk if malicious HTML is injected

**Recommended Fix:**
```typescript
import { escape } from 'html-escaper'; // npm install html-escaper

const sanitizeMessage = (text?: string | null) => {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (trimmed.length > 2000) {
    return escape(trimmed.slice(0, 1997)) + '...';
  }
  return escape(trimmed);
};
```

Or use a proper HTML sanitizer like `DOMPurify` for more complex cases.

---

### 🔴 CRITICAL: Missing Input Validation on Video Upload

**File:** `src/app/api/sendTelegramVideo/route.ts` (lines 13-20)

**Problem:**
No validation on video file size, MIME type, or filename. A malicious user could upload extremely large files or files with dangerous extensions.

**Impact:**
- Potential DoS via large file uploads
- Storage/bandwidth costs
- Security risk from malicious file types

**Recommended Fix:**
```typescript
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB (Telegram limit is 50MB)
const ALLOWED_MIME_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

export async function POST(request: Request) {
  // ... existing checks ...
  
  const videoBlob = formData.get('video') as Blob | null;
  const filename = formData.get('filename') as string | null;
  
  if (!videoBlob || !filename) {
    return NextResponse.json({ error: 'Missing video or filename' }, { status: 400 });
  }
  
  // Validate file size
  if (videoBlob.size > MAX_VIDEO_SIZE) {
    return NextResponse.json({ error: 'Video file too large' }, { status: 413 });
  }
  
  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(videoBlob.type)) {
    return NextResponse.json({ error: 'Invalid video format' }, { status: 400 });
  }
  
  // Sanitize filename
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 255);
  
  // ... rest of the code ...
}
```

---

### 🟠 HIGH: IP Address Spoofing Vulnerability

**Files:**
- `src/app/api/sendTelegramMessage/route.ts` (line 32)
- `src/app/api/notifyVisit/route.ts` (line 123)

**Problem:**
IP address is extracted from `x-forwarded-for` header without validation. This header can be spoofed by clients, making rate limiting ineffective.

**Impact:**
- Rate limiting can be bypassed
- Attackers can spoof IPs to avoid detection

**Recommended Fix:**
```typescript
// Only trust x-forwarded-for if behind a trusted proxy (Netlify)
// Netlify sets x-forwarded-for, but validate the format
const getClientIP = (headers: Headers): string => {
  const forwarded = headers.get('x-forwarded-for');
  if (!forwarded) return 'unknown';
  
  // Take first IP (client IP), ignore proxies
  const ips = forwarded.split(',').map(ip => ip.trim()).filter(Boolean);
  if (ips.length === 0) return 'unknown';
  
  // Basic IP validation (IPv4 or IPv6)
  const ip = ips[0];
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  
  if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
    return ip;
  }
  
  return 'unknown';
};
```

**Better:** Use Netlify's `x-nf-client-connection-ip` header if available, or implement a proper IP extraction utility.

---

### 🟠 HIGH: Missing Error Boundaries

**Problem:**
No React Error Boundaries are implemented. If a component crashes, the entire page can become unusable.

**Impact:**
- Poor user experience on errors
- No graceful degradation
- Potential data loss in forms

**Recommended Fix:**
Create `src/components/ErrorBoundary.tsx`:
```typescript
'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Wrap critical sections in `src/app/[lang]/layout.tsx` and `src/layouts/MainLayout.tsx`.

---

### 🟠 HIGH: Environment Variables Not Validated at Startup

**Files:**
- `src/app/api/sendTelegramMessage/route.ts` (lines 45-50)
- `src/app/api/notifyVisit/route.ts` (lines 106-113)
- `src/integrations/supabase/client.ts` (lines 3-8)

**Problem:**
Environment variables are checked at runtime in each API route, leading to repeated checks and unclear error messages. Missing variables cause 500 errors instead of failing fast at startup.

**Impact:**
- Unclear error messages for missing config
- Runtime failures instead of build-time validation
- Poor developer experience

**Recommended Fix:**
Create `src/config/env.ts`:
```typescript
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  telegram: {
    botToken: requireEnv('TELEGRAM_BOT_TOKEN'),
    chatId: requireEnv('TELEGRAM_CHAT_ID'),
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://samyun-wan.life',
  },
} as const;
```

Use this in API routes instead of checking `process.env` directly.

---

## 3. Architectural & Structural Feedback

### Folder Structure

**Current Structure:**
```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (56 files)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── config/           # Configuration files
├── data/             # Static data (JSON, TS)
├── i18n/             # Translations
├── context/          # React contexts
├── layouts/          # Layout components
└── integrations/     # External service clients
```

**Strengths:**
- Clear separation of concerns
- Logical grouping by feature type
- Good use of Next.js App Router conventions

**Issues:**

1. **Components folder is too large (56 files)**
   - Hard to navigate
   - No clear organization by feature/domain
   - Mix of UI components, business logic components, and layout components

2. **Utils folder mixes concerns**
   - SEO utilities, analytics, form utilities, and schema utilities are all together
   - Should be organized by domain

3. **Missing service layer**
   - API calls are made directly from hooks/components
   - No centralized API client or service abstraction

**Recommended Structure:**
```
src/
├── app/                    # Next.js pages (keep as-is)
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Modal, etc.)
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── features/           # Feature-specific components
│   │   ├── products/
│   │   ├── orders/
│   │   ├── verification/
│   │   └── testimonials/
│   └── seo/                # SEO-specific components
├── services/               # NEW: API services
│   ├── telegram.ts
│   ├── analytics.ts
│   └── supabase.ts
├── hooks/
│   ├── api/                # API-related hooks
│   ├── ui/                 # UI-related hooks
│   └── forms/              # Form-related hooks
├── utils/
│   ├── seo/                # SEO utilities
│   ├── validation/         # Validation utilities
│   └── formatting/         # Formatting utilities
├── config/                 # Keep as-is
├── data/                   # Keep as-is
└── lib/                    # NEW: Third-party library wrappers
    ├── redis.ts            # Rate limiting
    └── logger.ts           # Logging
```

---

### Separation of Concerns

**Issues:**

1. **Business logic in components**
   - `useOrderForm.ts` contains Telegram API calls
   - Components directly call `sendTelegramMessage`
   - Should use a service layer

2. **Mixed responsibilities in hooks**
   - `useOrderForm` handles form state, validation, API calls, and analytics
   - Should split into: form state hook + order service

3. **SEO logic scattered**
   - Metadata generation in multiple places
   - Should be centralized

**Recommended Pattern:**
```typescript
// services/orderService.ts
export class OrderService {
  async submitOrder(order: OrderData): Promise<void> {
    // Validation
    // API call
    // Analytics tracking
    // Error handling
  }
}

// hooks/useOrderForm.ts
export const useOrderForm = () => {
  const [state, setState] = useState(...);
  const orderService = useOrderService();
  
  const handleSubmit = async (data) => {
    await orderService.submitOrder(data);
  };
  
  return { state, handleSubmit };
};
```

---

### Naming and Consistency

**Issues:**

1. **Inconsistent file naming**
   - Some files use PascalCase: `LayoutClientProvider.tsx`
   - Some use camelCase: `useOrderForm.ts`
   - Should standardize: Components = PascalCase, hooks/utils = camelCase

2. **Unclear component names**
   - `OptimizedImage` - what makes it optimized?
   - `HtmlLangSetter` - should be `HtmlLangSetter` or `HtmlLangProvider`?
   - `ScriptLD` - unclear abbreviation

3. **Magic strings**
   - Hardcoded strings in multiple places (e.g., `'hy'`, `'ru'`, `'en'`)
   - Should use constants from `src/config/locales.ts`

**Recommendations:**
- Use consistent naming: `ComponentName.tsx`, `useHookName.ts`, `utilityFunction.ts`
- Rename unclear components: `ScriptLD` → `StructuredDataScript`
- Extract all magic strings to constants

---

## 4. Code Quality & Patterns

### Code Smells

#### 1. **Duplicated Rate Limiting Logic**

**Files:**
- `src/app/api/sendTelegramMessage/route.ts` (lines 10-26)
- `src/app/api/notifyVisit/route.ts` (lines 54-70)

**Problem:**
Identical rate limiting code duplicated in two files.

**Fix:**
```typescript
// lib/rateLimit.ts
export async function checkRateLimit(
  key: string,
  windowMs: number,
  maxRequests: number
): Promise<boolean> {
  // Shared implementation
}

// Usage in API routes
import { checkRateLimit } from '@/lib/rateLimit';
```

---

#### 2. **Long Functions**

**File:** `src/app/api/notifyVisit/route.ts` (lines 109-215)

**Problem:**
The `POST` function is 106 lines long and does too many things:
- Validates input
- Fetches geo data
- Parses UTM params
- Formats message
- Sends to Telegram

**Fix:**
Split into smaller functions:
```typescript
// lib/visitNotification.ts
export function buildVisitMessage(data: VisitData): string {
  // Message formatting logic
}

export function parseVisitRequest(body: unknown): ParsedVisitBody {
  // Request parsing logic
}

// route.ts
export async function POST(request: Request) {
  const body = await parseVisitRequest(await request.json());
  const geoData = await fetchGeoData(ip);
  const message = buildVisitMessage({ body, geoData, ... });
  await sendToTelegram(message);
}
```

---

#### 3. **Magic Numbers**

**Files:**
- `src/app/api/sendTelegramMessage/route.ts` (line 7: `2000`)
- `src/app/api/notifyVisit/route.ts` (line 21: `500`, line 50: `5 * 60 * 1000`)

**Fix:**
```typescript
// config/constants.ts
export const API_LIMITS = {
  MESSAGE_MAX_LENGTH: 2000,
  TEXT_SANITIZE_MAX_LENGTH: 500,
  RATE_LIMIT_WINDOW_MS: 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: 5,
  GEO_CACHE_TTL_MS: 5 * 60 * 1000,
} as const;
```

---

#### 4. **Missing Memoization in Hooks**

**File:** `src/hooks/useOrderForm.ts` (lines 60-65)

**Problem:**
`totalPrice` is recalculated on every render, even when `selectedProducts` hasn't changed.

**Fix:**
```typescript
const totalPrice = useMemo(() => {
  return selectedProducts.reduce((sum, key) => {
    const product = productShowcaseData.find(p => p.labelKey === key);
    return sum + (product ? product.price : 0);
  }, 0);
}, [selectedProducts]);
```

---

#### 5. **Console.log in Production Code**

**Files:**
- `src/app/[lang]/verify/qr/QrVerifyClient.tsx` (multiple console.log statements)
- `src/utils/telegramApi.ts` (lines 11, 14, 49)

**Problem:**
Console.log statements should not be in production code. Use a proper logging utility.

**Fix:**
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error);
    // In production, send to error tracking service
  },
};
```

---

### Recommended Patterns

#### 1. **Custom Hooks for Reusable Logic**

**Current:** Logic is mixed in components.

**Recommended:**
- `useApi` hook for API calls with loading/error states
- `useDebounce` for search/input debouncing
- `useLocalStorage` for persistent state

**Example:**
```typescript
// hooks/useApi.ts
export function useApi<T>(apiCall: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [apiCall]);
  
  return { data, loading, error, execute };
}
```

---

#### 2. **Service Layer for API Calls**

**Current:** API calls are in hooks/components.

**Recommended:**
```typescript
// services/telegramService.ts
export class TelegramService {
  async sendMessage(message: string): Promise<void> {
    // Centralized API call logic
    // Error handling
    // Retry logic
  }
  
  async sendPhoto(photo: Blob, caption: string): Promise<void> {
    // ...
  }
}
```

---

#### 3. **Error Handling Utility**

**Current:** Error handling is inconsistent.

**Recommended:**
```typescript
// utils/errorHandler.ts
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message.includes('fetch');
}
```

---

## 5. Security Review

### Authentication & Authorization

**Status:** ⚠️ **No authentication system implemented**

**Issues:**
- No user authentication
- No role-based access control
- API endpoints are publicly accessible (rate-limited only)

**Recommendations:**
- If admin functionality is needed, implement authentication (e.g., NextAuth.js)
- Protect sensitive API routes with API keys or JWT tokens
- Consider implementing API key authentication for Telegram endpoints

---

### Tokens, Cookies, Session Data

**Current Implementation:**
- Language preference stored in cookie (`current_lang`)
- Analytics consent stored in cookie (`analytics_consent`, `marketing_consent`)
- No session management

**Issues:**

1. **Cookie Security**
   - Cookies don't have `Secure` flag (should be `true` in production with HTTPS)
   - `sameSite: 'lax'` is acceptable but consider `'strict'` for sensitive data

**Fix:**
```typescript
// middleware.ts
response.cookies.set({
  name: 'current_lang',
  value: lang,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production', // Add Secure flag
  httpOnly: false, // OK for language preference
  maxAge: 60 * 60 * 24 * 365,
});
```

---

### Secrets Management

**Current:**
- Environment variables used for secrets (correct approach)
- No validation at startup (see High-Priority Issues)
- Secrets are server-side only (correct)

**Issues:**

1. **Hardcoded Values**
   - `src/app/layout.tsx` (line 17): `GTM_ID = "GTM-56D2LTZS"` hardcoded
   - Should be in environment variables

**Fix:**
```typescript
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
```

2. **Missing .env.example**
   - No template for required environment variables
   - Makes onboarding difficult

**Fix:**
Create `.env.example`:
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://samyun-wan.life
NEXT_PUBLIC_QR_VERIFICATION_URL=https://qr-wan.netlify.app/

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_GOOGLE_ADS_ID=your_ads_id
NEXT_PUBLIC_GTM_ID=your_gtm_id

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

---

### Input Validation & Sanitization

**Current State:**
- Basic sanitization in API routes
- No validation library (e.g., Zod, Yup)
- Inconsistent validation patterns

**Issues:**

1. **Weak Validation**
   - Phone number validation in `useOrderForm.ts` is basic
   - No email validation (if needed)
   - No URL validation for external links

**Recommended:**
```typescript
// utils/validation.ts
import { z } from 'zod';

export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .min(10)
  .max(15);

export const orderSchema = z.object({
  phone: phoneSchema,
  address: z.string().min(5).max(500),
  products: z.array(z.string()).min(1),
});

// Usage
const result = orderSchema.safeParse({ phone, address, products });
if (!result.success) {
  return NextResponse.json({ error: result.error.errors }, { status: 400 });
}
```

2. **HTML Sanitization**
   - Already covered in High-Priority Issues
   - Use `html-escaper` or `DOMPurify`

---

### Unsafe Patterns

**Found:**
- ✅ No `eval()` usage
- ✅ No direct SQL queries (using Supabase client)
- ✅ No unsafe redirects (using Next.js redirects)
- ⚠️ String concatenation in some places (should use template literals)

**Minor Issue:**
```typescript
// src/app/api/notifyVisit/route.ts (line 134)
utmParams = `<b>UTM:</b> Source=${sanitizeText(...)}, Medium=${sanitizeText(...)}`;
```

Should use template literals consistently, but this is safe due to sanitization.

---

## 6. Performance & Scalability

### Heavy Operations on Hot Paths

**Issues:**

1. **GeoIP Lookup on Every Visit**
   - `src/app/api/notifyVisit/route.ts` (line 129)
   - Fetches geo data for every visit notification
   - Has caching (5 minutes), but could be improved

**Recommendations:**
- Use a faster geo service (e.g., Cloudflare's `CF-IPCountry` header)
- Consider making geo lookup optional/async
- Use edge functions for geo lookup if possible

2. **Font Loading in OG Image Generation**
   - `src/app/api/og/[lang]/route.tsx` (lines 18-26)
   - Font is cached, but initial load can be slow

**Recommendations:**
- Pre-warm font cache on cold start
- Consider using system fonts as fallback
- Use CDN for fonts

---

### N+1 Queries / Excessive Network Calls

**Status:** ✅ **No database queries found** (Supabase is configured but not actively used)

**Potential Issues:**
- If Supabase is used in the future, watch for N+1 patterns
- Current API calls are single requests (no batching needed)

---

### Inefficient Rendering Patterns

**Issues:**

1. **Missing React.memo on Heavy Components**
   - Components like `ProductShowcaseSection` re-render unnecessarily
   - No memoization on list items

**Fix:**
```typescript
// src/components/ProductShowcaseSection.tsx
const ProductCard = React.memo(({ product, ... }: ProductCardProps) => {
  // Component implementation
});

// In the map:
{productShowcaseData.map((product, index) => (
  <ProductCard key={product.labelKey} product={product} index={index} />
))}
```

2. **Large Bundle Size**
   - All components are imported statically
   - Some heavy libraries (Framer Motion, Swiper) loaded upfront

**Current:** Some dynamic imports exist (`src/app/[lang]/page.tsx`, `src/layouts/MainLayout.tsx`)

**Recommendations:**
- Continue using dynamic imports for heavy components
- Consider code splitting for blog posts
- Lazy load modals (already done ✅)

---

### Large Bundles / Unnecessary Dependencies

**Analysis:**
- `package.json` dependencies look reasonable
- No obvious bloat

**Recommendations:**
1. **Audit bundle size:**
   ```bash
   npm install -D @next/bundle-analyzer
   ```
   Add to `next.config.mjs`:
   ```javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });
   ```

2. **Check for duplicate dependencies:**
   ```bash
   npm ls --depth=0
   ```

---

### Memoization / Caching Strategies

**Current:**
- ✅ Font caching in OG image route
- ✅ GeoIP caching (5 minutes)
- ✅ Rate limit store (in-memory, but see High-Priority Issues)

**Missing:**
- No caching for static data (blog posts, product data)
- No caching for API responses
- No service worker caching strategy (SW exists but minimal)

**Recommendations:**
1. **Cache static data:**
   ```typescript
   // utils/cache.ts
   const staticDataCache = new Map<string, { data: unknown; timestamp: number }>();
   const CACHE_TTL = 60 * 60 * 1000; // 1 hour
   
   export function getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
     const cached = staticDataCache.get(key);
     if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
       return Promise.resolve(cached.data as T);
     }
     return fetcher().then(data => {
       staticDataCache.set(key, { data, timestamp: Date.now() });
       return data;
     });
   }
   ```

2. **Implement proper service worker caching:**
   - Cache static assets
   - Cache API responses (with TTL)
   - Offline fallback

---

### Code Splitting / Lazy Loading

**Current:** ✅ **Good**
- Dynamic imports for heavy components
- Lazy loading for modals
- Suspense boundaries in place

**Recommendations:**
- Consider route-based code splitting for blog pages
- Lazy load analytics scripts (already done with consent ✅)

---

## 7. DevOps, CI/CD & Tooling

### Package.json Scripts

**Current Scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "optimize-images": "node scripts/optimize-images.js",
  "seo-image-audit": "node scripts/seo-image-audit.js",
  "generate-sitemap": "next-sitemap --config next-sitemap.config.cjs",
  "postbuild": "next-sitemap --config next-sitemap.config.cjs"
}
```

**Issues:**
1. **No pre-commit hooks**
   - No linting/formatting before commit
   - No type checking before commit

2. **No test scripts**
   - No testing infrastructure

3. **Missing useful scripts:**
   - `analyze` for bundle analysis
   - `format` for code formatting
   - `clean` for cleaning build artifacts

**Recommended Additions:**
```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next node_modules/.cache",
    "verify": "pnpm run typecheck && pnpm run lint && pnpm run format:check",
    "precommit": "pnpm run verify"
  }
}
```

---

### CI/CD Workflows

**Status:** ⚠️ **No CI/CD workflows found**

**Issues:**
- No GitHub Actions workflows
- No automated testing
- No automated deployment checks
- No automated security scanning

**Recommended:**
Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run typecheck
      - run: pnpm run lint
      - run: pnpm run format:check

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build
```

---

### Dockerfile

**Status:** ❌ **No Dockerfile found**

**Note:** Not required for Netlify deployment, but useful for local development consistency.

**Optional Recommendation:**
Create `Dockerfile` for local development:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
```

---

### Deployment Configs

**Current:**
- `netlify.toml` is well-configured ✅
- Build command includes image optimization ✅
- Redirects are properly configured ✅

**Issues:**
1. **Build command runs optimize-images every time**
   - Could be slow if images don't change
   - Consider caching optimized images

2. **No build-time environment variable validation**
   - Should fail build if required vars are missing

**Recommendations:**
- Add environment variable validation script
- Consider using Netlify's build plugins for image optimization

---

### Linting / Formatting

**Current:**
- ESLint is configured (`.eslintrc.cjs`) ✅
- Good rules in place ✅

**Missing:**
- No Prettier configuration
- No pre-commit hooks (Husky)

**Recommended:**
1. **Add Prettier:**
   ```json
   // .prettierrc
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100
   }
   ```

2. **Add Husky:**
   ```bash
   pnpm add -D husky lint-staged
   npx husky install
   npx husky add .husky/pre-commit "pnpm lint-staged"
   ```

   ```json
   // package.json
   {
     "lint-staged": {
       "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
       "*.{json,md}": ["prettier --write"]
     }
   }
   ```

---

## 8. Testing Strategy

### Current State

**Status:** ❌ **No tests found**

**Issues:**
- No unit tests
- No integration tests
- No E2E tests
- No test infrastructure

---

### What Should Be Tested

#### Critical Flows (High Priority)
1. **Order Submission**
   - Form validation
   - API call success/failure
   - Telegram notification

2. **QR Verification**
   - Camera access
   - QR code scanning
   - Video recording
   - API submission

3. **Language Switching**
   - Cookie setting
   - URL updates
   - Content translation

4. **API Routes**
   - Rate limiting
   - Input validation
   - Error handling
   - Telegram integration

#### Edge Cases
- Invalid phone numbers
- Missing required fields
- Network failures
- Large file uploads
- Malformed requests

#### Integration Points
- Telegram API
- Supabase (if used)
- Analytics tracking
- Sitemap generation

---

### Suggested Testing Stack

**Recommended:**
- **Unit Tests:** Vitest (faster than Jest, works with TypeScript)
- **Component Tests:** React Testing Library
- **E2E Tests:** Playwright (better than Cypress for Next.js)
- **API Tests:** Vitest + Supertest

**Setup:**
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @playwright/test
```

**Example Test:**
```typescript
// __tests__/hooks/useOrderForm.test.ts
import { renderHook, act } from '@testing-library/react';
import { useOrderForm } from '@/hooks/useOrderForm';

describe('useOrderForm', () => {
  it('validates required fields', async () => {
    const { result } = renderHook(() => useOrderForm({ ... }));
    
    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });
    
    expect(result.current.errors).toContain('Phone is required');
  });
});
```

---

### Minimal Test Plan

**Phase 1: Critical Paths (Week 1)**
- [ ] Order form validation
- [ ] API route input validation
- [ ] Rate limiting logic
- [ ] Language switching

**Phase 2: Components (Week 2)**
- [ ] Modal components
- [ ] Form components
- [ ] Navigation components

**Phase 3: Integration (Week 3)**
- [ ] Telegram API integration
- [ ] Analytics tracking
- [ ] Error boundaries

**Phase 4: E2E (Week 4)**
- [ ] Complete order flow
- [ ] QR verification flow
- [ ] Language switching flow

---

## 9. Quick Wins (Easy Improvements)

### Small Refactors

1. **Extract Constants**
   - Move all magic numbers/strings to `src/config/constants.ts`
   - Estimated time: 30 minutes

2. **Add Error Boundaries**
   - Wrap main layout components
   - Estimated time: 1 hour

3. **Create .env.example**
   - Document all required environment variables
   - Estimated time: 15 minutes

4. **Add Prettier**
   - Format all code consistently
   - Estimated time: 30 minutes

5. **Remove console.log Statements**
   - Replace with proper logger
   - Estimated time: 1 hour

6. **Add React.memo to Heavy Components**
   - Memoize ProductCard, BlogPreviewCard, etc.
   - Estimated time: 1 hour

7. **Extract Rate Limiting to Shared Utility**
   - Remove duplication
   - Estimated time: 30 minutes

8. **Add Input Validation Library (Zod)**
   - Replace manual validation
   - Estimated time: 2 hours

9. **Add Bundle Analyzer**
   - Identify large dependencies
   - Estimated time: 30 minutes

10. **Add Pre-commit Hooks**
    - Automate linting/formatting
    - Estimated time: 1 hour

---

### Config Tweaks

1. **Add Secure Flag to Cookies** (production only)
2. **Enable Strict Mode in TypeScript** (already enabled ✅)
3. **Add Bundle Analyzer Script**
4. **Configure Prettier**
5. **Add Husky for Git Hooks**

---

### Linting / Formatting Rules

**Already Good:**
- ESLint is well-configured ✅
- TypeScript strict mode enabled ✅

**Add:**
- Prettier for consistent formatting
- Import sorting (eslint-plugin-import)
- Unused imports detection

---

### Dependency Updates / Removals

**Check for Updates:**
```bash
pnpm outdated
```

**Potential Removals:**
- `gray-matter` - not used (if blog posts are JSON only)
- Verify all dependencies are actually used

**Security Audit:**
```bash
pnpm audit
pnpm audit --fix
```

---

## 10. Roadmap of Improvements

### Phase 1: Critical Fixes (Week 1-2)

**Priority: 🔴 CRITICAL**

1. **Fix Rate Limiting**
   - Implement Redis-based rate limiting (Upstash Redis)
   - Replace in-memory Maps
   - Test with load testing

2. **Fix HTML Injection Risk**
   - Add `html-escaper` or `DOMPurify`
   - Sanitize all user input before sending to Telegram
   - Test with malicious input

3. **Add Input Validation**
   - Install Zod
   - Validate all API route inputs
   - Add validation to forms

4. **Fix Video Upload Validation**
   - Add file size limits
   - Add MIME type validation
   - Sanitize filenames

5. **Add Error Boundaries**
   - Create ErrorBoundary component
   - Wrap critical sections
   - Add error logging

6. **Environment Variable Validation**
   - Create `src/config/env.ts`
   - Validate at startup
   - Fail fast on missing vars

7. **Fix IP Address Extraction**
   - Validate IP format
   - Use trusted proxy headers
   - Add IP validation utility

8. **Add .env.example**
   - Document all required variables
   - Add comments for each variable

---

### Phase 2: Architecture & Performance (Week 3-4)

**Priority: 🟠 HIGH**

1. **Reorganize Folder Structure**
   - Split components into `ui/`, `features/`, `layout/`
   - Organize utils by domain
   - Create services layer

2. **Extract Service Layer**
   - Create `services/telegramService.ts`
   - Create `services/analyticsService.ts`
   - Refactor hooks to use services

3. **Add Memoization**
   - Memoize expensive calculations
   - Add React.memo to heavy components
   - Optimize re-renders

4. **Improve Caching**
   - Add caching for static data
   - Improve geoIP caching strategy
   - Add service worker caching

5. **Optimize Bundle Size**
   - Run bundle analyzer
   - Identify and remove unused dependencies
   - Further code splitting

6. **Add Logging Utility**
   - Replace console.log
   - Add structured logging
   - Integrate with error tracking (Sentry)

7. **Improve Error Handling**
   - Centralize error handling
   - Add error recovery strategies
   - Improve error messages

8. **Add API Client Abstraction**
   - Create centralized API client
   - Add retry logic
   - Add request/response interceptors

---

### Phase 3: DX, Tooling, and Tests (Week 5-6)

**Priority: 🟡 MEDIUM**

1. **Set Up Testing Infrastructure**
   - Install Vitest, React Testing Library, Playwright
   - Configure test environment
   - Add test scripts

2. **Write Critical Tests**
   - Order form validation
   - API route validation
   - Rate limiting
   - Error handling

3. **Add CI/CD Pipeline**
   - Create GitHub Actions workflow
   - Add automated testing
   - Add automated deployment checks

4. **Add Pre-commit Hooks**
   - Install Husky
   - Add lint-staged
   - Automate formatting

5. **Add Prettier**
   - Configure Prettier
   - Format all code
   - Add format check to CI

6. **Improve Documentation**
   - Add JSDoc comments to functions
   - Document API routes
   - Create developer guide

7. **Add Bundle Analyzer**
   - Configure bundle analyzer
   - Add analyze script
   - Document large dependencies

8. **Add Type Safety Improvements**
   - Add stricter TypeScript rules
   - Add type guards
   - Remove `any` types

9. **Add Performance Monitoring**
   - Integrate Web Vitals tracking
   - Add performance budgets
   - Monitor Core Web Vitals

10. **Add Security Headers**
    - Add security headers to Next.js config
    - Configure CSP (Content Security Policy)
    - Add HSTS headers

---

## How to Ask the AI to Apply These Changes

### Example Prompts for Specific Refactors

1. **Fix Rate Limiting:**
   ```
   Replace the in-memory rate limiting in src/app/api/sendTelegramMessage/route.ts and src/app/api/notifyVisit/route.ts with a Redis-based solution using Upstash Redis. Create a shared utility in src/lib/rateLimit.ts and update both API routes to use it.
   ```

2. **Add Input Validation:**
   ```
   Install Zod and add input validation to all API routes. Create validation schemas in src/utils/validation.ts for order data, visit data, and message data. Update the API routes to use these schemas.
   ```

3. **Extract Service Layer:**
   ```
   Create a service layer for API calls. Extract Telegram API calls from hooks/components into src/services/telegramService.ts. Update useOrderForm.ts and other hooks to use the service instead of calling APIs directly.
   ```

4. **Add Error Boundaries:**
   ```
   Create a React ErrorBoundary component in src/components/ErrorBoundary.tsx and wrap the main layout components in src/app/[lang]/layout.tsx and src/layouts/MainLayout.tsx with error boundaries.
   ```

5. **Reorganize Components:**
   ```
   Reorganize the components folder by creating subfolders: src/components/ui/ for reusable UI primitives, src/components/features/ for feature-specific components, and src/components/layout/ for layout components. Move existing components to appropriate folders.
   ```

6. **Add Environment Variable Validation:**
   ```
   Create src/config/env.ts that validates all required environment variables at startup. Export a typed env object. Update all API routes and components to use this centralized config instead of process.env directly.
   ```

7. **Add Prettier and Formatting:**
   ```
   Install Prettier and configure it with a .prettierrc file. Add format and format:check scripts to package.json. Format all existing code files.
   ```

8. **Add Testing Infrastructure:**
   ```
   Set up testing infrastructure with Vitest, React Testing Library, and Playwright. Create example tests for useOrderForm hook and the sendTelegramMessage API route. Add test scripts to package.json.
   ```

9. **Fix HTML Injection:**
   ```
   Install html-escaper and update all places where user input is sent to Telegram with HTML parse_mode to escape HTML entities. Update sanitizeMessage function and any other sanitization functions.
   ```

10. **Add CI/CD Pipeline:**
    ```
    Create a GitHub Actions workflow in .github/workflows/ci.yml that runs type checking, linting, and formatting checks on pull requests. Add a build job that verifies the project builds successfully.
    ```

---

## Summary

This audit identified **8 critical issues**, **5 high-priority issues**, and numerous opportunities for improvement in architecture, performance, and developer experience. The most urgent fixes are:

1. **Rate limiting** (in-memory → Redis)
2. **HTML injection** (add proper escaping)
3. **Input validation** (add Zod schemas)
4. **Error boundaries** (add React ErrorBoundary)
5. **Environment variable validation** (fail fast at startup)

The project has a solid foundation with good SEO practices, proper Next.js App Router usage, and reasonable code organization. The main areas for improvement are security hardening, testing infrastructure, and developer experience tooling.

---

**Next Steps:**
1. Review this audit with the team
2. Prioritize fixes based on business impact
3. Create GitHub issues for each phase
4. Start with Phase 1 critical fixes
5. Gradually implement Phase 2 and Phase 3 improvements

