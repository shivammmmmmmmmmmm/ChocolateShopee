# Chocolate Shopee - Architecture Documentation

## Overview

Chocolate Shopee has been architected as two completely independent Next.js applications that share only the backend database and services. This separation ensures security, scalability, and maintainability.

## Applications

### 1. Customer Storefront (chocolateshopee.co.in)

**Location:** Root directory (`/`)
**Purpose:** Public-facing e-commerce website
**Deployment:** Vercel project connected to chocolateshopee.co.in

#### Features:
- Product browsing and search
- Product categories and filtering
- Shopping cart management
- WhatsApp-based ordering
- Customer contact forms
- About us and gallery pages
- Privacy policy
- SEO-optimized pages
- Responsive mobile design

#### Tech Stack:
- Next.js 16.2.6
- React 19
- TypeScript
- Prisma ORM
- SQLite Database
- Cloudinary (image storage)
- Framer Motion (animations)

#### Security:
- No admin routes or components
- No admin API endpoints
- No admin authentication code
- No references to administration system
- robots.txt disallows /api/ paths
- Clean, minimal JavaScript bundles

### 2. Admin Dashboard (admin.chocolateshopee.co.in)

**Location:** `/admin-dashboard`
**Purpose:** Administration panel for shop owner
**Deployment:** Separate Vercel project connected to admin.chocolateshopee.co.in

#### Features:
- Secure admin authentication
- Product management (CRUD)
- Category management
- Image upload via Cloudinary
- Order management
- Customer management
- Analytics and reporting
- Coupon management
- Review moderation

#### Tech Stack:
- Next.js 16.2.6
- React 19
- TypeScript
- Prisma ORM
- SQLite Database (shared with storefront)
- Cloudinary (shared with storefront)
- Framer Motion (animations)

#### Security:
- Rate-limited login (5 attempts per 15 minutes)
- HttpOnly, Secure, SameSite cookies
- Bcrypt password hashing
- Server-side authentication middleware
- No customer-facing pages
- robots.txt blocks all indexing

## Shared Resources

Both applications share:
- **Database:** Same Prisma schema and SQLite database
- **Cloudinary:** Same account for image storage
- **Backend Services:** Same server infrastructure

## Separation Architecture

### Customer Storefront
```
chocolateshopee.co.in/
├── app/
│   ├── (public)/           # Public pages only
│   ├── api/
│   │   ├── products/       # Public product APIs
│   │   ├── categories/     # Public category APIs
│   │   └── upload/         # Image upload API
│   └── layout.tsx
├── components/             # Customer-facing components
├── lib/                    # Customer utilities
└── public/
```

### Admin Dashboard
```
admin.chocolateshopee.co.in/
├── app/
│   ├── api/
│   │   ├── admin/          # Admin auth APIs (protected)
│   │   ├── products/       # Admin product APIs (protected)
│   │   ├── categories/     # Admin category APIs (protected)
│   │   └── upload/         # Image upload API
│   ├── dashboard/          # Admin dashboard (protected)
│   ├── login/              # Admin login (public)
│   └── layout.tsx
├── lib/                    # Admin utilities
└── prisma/
```

## API Separation

### Customer APIs (Public)
- `GET /api/products` - List products
- `GET /api/products/[id]` - Get product details
- `GET /api/categories` - List categories
- `GET /api/categories/[id]` - Get category details
- `POST /api/upload` - Upload images

### Admin APIs (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Check auth status
- `GET /api/products` - List all products (admin)
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/categories` - List all categories (admin)
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category
- `POST /api/upload` - Upload images

## Authentication

### Customer Storefront
- No customer authentication required
- WhatsApp-based ordering
- Session cookies for cart only

### Admin Dashboard
- Email/password authentication
- Rate-limited login attempts
- HttpOnly session cookies
- Middleware-based route protection
- Automatic redirect to login if unauthenticated

## Database Schema

Both applications share the same Prisma schema:

```prisma
model Admin { ... }
model Category { ... }
model Product { ... }
model Customer { ... }
model Order { ... }
model Coupon { ... }
model Review { ... }
```

## Deployment

### Customer Storefront
1. Deploy root directory to Vercel
2. Connect domain: chocolateshopee.co.in
3. Set environment variables
4. Build and deploy

### Admin Dashboard
1. Push `/admin-dashboard` to separate GitHub repository
2. Import repository in Vercel
3. Connect domain: admin.chocolateshopee.co.in
4. Set environment variables
5. Build and deploy

## Environment Variables

### Customer Storefront
```
DATABASE_URL=file:./prisma/dev.db
NEXT_PUBLIC_SITE_URL=https://chocolateshopee.co.in
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Admin Dashboard
```
DATABASE_URL=file:./prisma/dev.db
ADMIN_EMAIL=admin@chocolateshopee.co.in
ADMIN_PASSWORD=secure-password
JWT_SECRET=random-secret-key
NEXT_PUBLIC_SITE_URL=https://admin.chocolateshopee.co.in
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Security Considerations

1. **Complete Separation:** No admin code exists in customer app
2. **No Shared Frontend Code:** Each app has independent components
3. **Secure Authentication:** Admin uses HttpOnly cookies with rate limiting
4. **API Protection:** Admin APIs are middleware-protected
5. **No Information Leakage:** Customer app contains no admin references
6. **Independent Deployment:** Each app can be deployed/updated independently
7. **Shared Backend:** Database and services are shared but access-controlled

## Benefits

- **Security:** Admin panel is completely isolated from public
- **Performance:** Customer app is lightweight without admin code
- **Scalability:** Each app can scale independently
- **Maintainability:** Clear separation of concerns
- **Deployment:** Independent deployment pipelines
- **SEO:** Customer app is clean and optimized
- **Professional:** Enterprise-grade architecture

## Migration from Old Architecture

### What Was Removed from Customer App:
- `/app/admin/` directory
- `/app/api/admin/` directory
- `components/admin-nav.tsx`
- `lib/admin-check.ts`
- All admin routes, components, and references

### What Was Created:
- New `/admin-dashboard/` directory with complete admin application
- Updated `app/robots.ts` to remove admin disallow rules
- Updated privacy policy to remove admin references
- Complete admin authentication system
- Full admin dashboard with product/category management

## Future Enhancements

### Customer Storefront
- Customer authentication
- Order history
- Wishlist functionality
- Product reviews
- Coupon system
- Razorpay payment integration

### Admin Dashboard
- Order management
- Customer management
- Analytics dashboard
- Coupon management
- Review moderation
- Banner management
- Sales reports
- Email notifications

## Conclusion

This architecture provides enterprise-grade separation between customer-facing and administrative functionality, following best practices used by major e-commerce platforms like Shopify, BigCommerce, and Amazon.