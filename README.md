# Photo Booth App

![Photo Booth Logo](./public/svg/bg.svg)

## Overview

Photo Booth is a modern web application for capturing, customizing, and sharing photos in themed sessions. Built with Next.js and TypeScript, it offers a fun, interactive experience for users at events, parties, or personal use.

## Features

- **User Authentication:** Register, login, email verification, and sign out flows.
- **Photo Capture:** Use your device camera to take photos directly in the browser.
- **Session Management:** Launch and manage photo sessions, view session photos, and customize session settings.
- **Profile:** Display user information, including all saved photo sessions.
- **Photo Customization:** Apply frames, overlays, and effects to your photos. Choose from seasonal, party, retro, and more themes.
- **Countdown & Controls:** Countdown timer for photo capture, device indicator, and easy-to-use controls.
- **Image Export & Sharing:** Export images and share them with friends or on social media.
- **Responsive UI:** Works seamlessly on desktop and mobile devices.
- **Loading & Feedback:** Loading screens and form feedback for smooth user experience.

## Tech Stack

- **Frontend:** Next.js, TypeScript
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Authentication & Storage:** Supabase
- **Libraries:** React Icons, html2canvas, react-camera-pro

## Directory Structure

- `src/app/` — Main app pages and routes
- `src/components/` — Reusable UI components
- `src/guard/` — Route guards and access control
- `src/hook/` — Custom React hooks
- `src/lib/types/` — Type definitions
- `src/utils/` — Utility functions (image export, validation, Supabase helpers)
- `public/` — Static assets (images, SVGs, fonts)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Environment Variables

Set up your `.env.local` file with Supabase credentials and any other required environment variables.

Made with ❤️ by Victor-starr
