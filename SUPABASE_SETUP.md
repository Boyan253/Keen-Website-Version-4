# Supabase Setup for Keen CMS

## 1. Create Tables in Supabase Dashboard

Go to your Supabase dashboard and run the SQL from `supabase-schema.sql` in the SQL Editor.

## 2. Initialize Default Content

Once the tables are created, run:

```bash
npm run dev
```

Then visit `http://localhost:3000/admin/init` to initialize the CMS with default content.

## 3. Alternative: Use API Endpoint

You can also initialize via API:

```bash
curl -X POST http://localhost:3000/api/init-cms
```

## What This Gives You

✅ **Persistent Database** - No more in-memory data loss  
✅ **No Initialization Required** - Data persists between restarts  
✅ **Real-time Updates** - Supabase provides real-time subscriptions  
✅ **Scalable** - Production-ready database  
✅ **Backup & Recovery** - Automatic backups  

## Database Schema

- `cms_content` - All text content and settings
- `cms_color_schemes` - Color themes and palettes  
- `cms_images` - Image assets and metadata
- `cms_settings` - Global site settings

## Security

Currently using public access for development. In production, you should:
- Enable Row Level Security (RLS)
- Set up proper authentication
- Create user-specific policies
