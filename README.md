# Photo Booth App

![Photo Booth Logo](./public/svg/bg.svg)

A lightweight web app for capturing, customizing, and sharing themed photos. Built with Next.js and TypeScript for a responsive, event-friendly experience.

## Quick start

Prerequisites: Node 18+, npm, a Supabase project.

1. Clone and install

```bash
git clone <repo-url>
cd photo-booth
npm install
```

2. Configure environment
   Create a `.env.local` file (see example below) with your Supabase project URL and anon key.

3. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

## Environment variables (example)

Create `.env.local` with your own values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<<your-project-ref>>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<<your-anon-key>>
NEXT_PUBLIC_SITE_URL=https://<<your-domain>>
SUPABASE_SERVICE_ROLE_KEY=<<your-service-role-key>>
NEXT_PUBLIC_DEVMODE=true # optional, for development features ( true/false )
```

## Features (high level)

- Authentication: register, login, email verification, sign out
- Camera capture: in-browser photo capture with countdown and device indicator
- Session management: create/manage sessions and view session photos
- Photo customization: frames, overlays, themes (seasonal, party, retro)
- Export & share: image export and social sharing
- Responsive UI: works on desktop and mobile
- Feedback: loading states and form validation

## Tech stack

- Frontend: Next.js, TypeScript
- Styling: Tailwind CSS
- Backend: Supabase (Postgres, Auth, Storage)
- Libraries: react-icons, html2canvas, react-camera-pro

## Project structure

src/
app/ # Next.js pages and routes
components/ # Reusable UI components
guard/ # Route guards and access control
hook/ # Custom React hooks
lib/types/ # Type definitions
utils/ # Utilities: image export, validation, Supabase helpers
public/ # Static assets (images, SVGs, fonts)

## Supabase schema

Run the following SQL (or adapt into migrations) to create the basic tables:

```sql
-- Create extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   updated_at timestamptz NOT NULL DEFAULT now(),
   avatar_url text,
   username text UNIQUE
);

-- Photo sessions table (one-to-one -> profile_id is UNIQUE)
CREATE TABLE IF NOT EXISTS photo_sessions (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   profile_id uuid NOT NULL UNIQUE,
   created_at timestamptz NOT NULL DEFAULT now(),
   frame_style text,
   photo_urls jsonb,
   frame_custom text,
   CONSTRAINT fk_profiles FOREIGN KEY (profile_id) REFERENCES profiles (id) ON DELETE CASCADE
);
```

## Useful scripts

(assumes standard package.json)

- npm run dev — development server
- npm run build — production build
- npm start — start production server
- npm run lint — run linters

## Notes & tips

- Ensure camera permissions in the browser for photo capture.
- Store large images in Supabase Storage and keep metadata in Postgres.
- Use Supabase project settings to rotate keys if needed.
- For deployments, set environment variables in the hosting provider (Vercel, Netlify, etc.).

Contributions welcome — open an issue or pull request.

Made with care by Victor-starr
