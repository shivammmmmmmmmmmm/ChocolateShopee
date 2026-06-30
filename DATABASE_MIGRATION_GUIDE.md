# Database Migration Guide: SQLite to PostgreSQL

## Why Migrate from SQLite?

SQLite is a file-based database that **does not work on Vercel** because:
- Vercel's serverless functions have a read-only filesystem
- SQLite requires write access to the filesystem to store data
- Each serverless function instance would have its own isolated file system
- Data would be lost between deployments and function invocations

## Recommended Solution: PostgreSQL

PostgreSQL is the recommended production database for Next.js applications on Vercel.

## Option 1: Vercel Postgres (Easiest)

1. **Create a Vercel Postgres database:**
   ```bash
   vercel postgres create
   ```

2. **Link to your project:**
   ```bash
   vercel postgres link
   ```

3. **Vercel will automatically set the `DATABASE_URL` environment variable**

4. **Update Prisma schema** (if needed):
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

## Option 2: External PostgreSQL Provider

### Using Neon (Free tier available):

1. **Sign up at** https://neon.tech
2. **Create a new project**
3. **Copy the connection string** (looks like: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require`)
4. **Add to Vercel environment variables:**
   ```bash
   vercel env add DATABASE_URL production
   ```
5. **Paste the connection string**

### Using Supabase (Free tier available):

1. **Sign up at** https://supabase.com
2. **Create a new project**
3. **Go to Settings → Database → Connection string**
4. **Copy the PostgreSQL connection string**
5. **Add to Vercel environment variables**

### Using Railway:

1. **Sign up at** https://railway.app
2. **Create a new PostgreSQL database**
3. **Copy the connection string**
4. **Add to Vercel environment variables**

## Migration Steps

### 1. Update Prisma Schema

Change the provider in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 2. Create a Migration

```bash
# Generate migration files
npx prisma migrate dev --name init

# Apply migrations to production
npx prisma migrate deploy
```

### 3. Seed the Database (Optional)

```bash
# Seed with initial data
npm run seed
```

### 4. Deploy to Vercel

```bash
# Deploy with environment variables
vercel --prod
```

## Important Notes

### Environment Variables

**Local Development (.env):**
```env
DATABASE_URL="postgresql://localhost:5432/mydb"
```

**Vercel Production:**
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

### Prisma Client Generation

The build script has been updated to ensure Prisma Client is generated before every build:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

### Data Persistence

- **SQLite**: Data stored in a file (`prisma/dev.db`)
- **PostgreSQL**: Data stored on a remote database server
- **Migration required**: You'll need to export data from SQLite and import to PostgreSQL

## Exporting Data from SQLite

If you have existing data in SQLite:

```bash
# Export data using Prisma
npx prisma db pull

# Or use a SQLite client to export
sqlite3 prisma/dev.db .dump > backup.sql
```

## Importing Data to PostgreSQL

```bash
# Using psql
psql -U username -d database_name -f backup.sql

# Or using Prisma (recommended)
npx prisma db seed
```

## Verification

After migration, verify the connection:

```bash
# Test database connection
npx prisma db pull

# Check Prisma Studio
npx prisma studio
```

## Common Issues

### Issue: "Prisma Client is not generated"
**Solution:** Run `prisma generate` before building

### Issue: "Connection timeout"
**Solution:** Check your DATABASE_URL and ensure your database allows connections from Vercel IPs

### Issue: "SSL connection required"
**Solution:** Add `?sslmode=require` to your DATABASE_URL

### Issue: "Migration failed"
**Solution:** Ensure you're using the correct migration command for your database provider

## Support

For more information:
- Prisma Docs: https://pris.ly/d/prisma-schema
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Neon Docs: https://neon.tech/docs
- Supabase Docs: https://supabase.com/docs