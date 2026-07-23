# Chocolate Shopee - Admin Dashboard

Separate administration dashboard for Chocolate Shopee e-commerce platform.

## Features

- Secure admin authentication with rate limiting
- Product management (CRUD operations)
- Category management
- Image upload via Cloudinary
- Responsive design for mobile and desktop
- Session-based authentication with HttpOnly cookies

## Tech Stack

- Next.js 16.2.6
- React 19
- TypeScript
- Prisma ORM
- SQLite Database
- Cloudinary (image uploads)
- Framer Motion (animations)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL` - SQLite database path
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password
- `JWT_SECRET` - Secret for session encryption
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

3. Initialize database:
```bash
npm run seed
```

4. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000/login` to access the admin panel.

## Deployment

This project is configured for deployment on Vercel.

1. Push this directory to a separate GitHub repository
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy to `admin.chocolateshopee.co.in`

## Security Features

- Rate limiting on login attempts (5 attempts per 15 minutes)
- HttpOnly, Secure, SameSite cookies
- Password hashing with bcrypt
- Server-side authentication checks
- No sensitive data exposure to client

## Project Structure

```
admin-dashboard/
├── app/
│   ├── api/              # API routes
│   │   ├── admin/        # Admin authentication APIs
│   │   ├── products/     # Product management APIs
│   │   ├── categories/   # Category management APIs
│   │   └── upload/       # Image upload API
│   ├── dashboard/        # Admin dashboard page
│   ├── login/            # Admin login page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── lib/                  # Utility functions
│   ├── db.ts            # Prisma client
│   └── auth.ts          # Password hashing utilities
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seed script
├── public/              # Static assets
├── package.json
├── next.config.mjs
├── tsconfig.json
└── vercel.json
```

## Shared Resources

This admin dashboard shares the following with the customer storefront:
- Database (Prisma schema)
- Cloudinary account (image storage)
- Backend services

## License

Private - Chocolate Shopee