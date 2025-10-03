
# colinfran.com

Welcome to my personal website! This monorepo contains the source code for [colinfran.com](https://colinfran.com), built with React, Next.js, TailwindCSS, and shadcn/ui. It features:

- A blog with technical posts and project updates
- A showcase of my projects
- A resume section
- A custom location tracking app
- Modern UI components and utilities

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** TailwindCSS, shadcn/ui
- **TypeScript** throughout
- **Database:** (if applicable, e.g. SQLite, Prisma, etc.)

## Project Structure

- `app/` — Next.js app directory (routes, API endpoints, pages)
- `components/` — Reusable UI and feature components
- `db/` — Database utilities and schema
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `assets/` — Images and static assets
- `blog-posts/` — Markdown blog posts

---

## <a name="location-app"></a>Location App

The Location App is a custom-built feature for tracking, analyzing, and visualizing location data. It includes:

- [**Location tracking API** (`app/api/location/`)](https://github.com/colinfran/colinfran.com/blob/main/app/api/location/)
- [**Data analysis tools** (`app/api/location/analysis/`)](https://github.com/colinfran/colinfran.com/tree/main/app/api/location/analysis)
- [**Dashboard with interactive heatmaps and insights** (`/app/locations/`)](https://github.com/colinfran/colinfran.com/tree/main/app/locations/)


### Features

- Collects and stores location data securely
- Provides visualizations (heatmaps, clusters, trends)
- Offers insights into travel patterns, routines, and anomalies

### How it works

Location data is sent to the API endpoints with iOS shortcuts every 30 minutes, processed for analysis, and displayed in the insights dashboard. The UI leverages custom React components for interactive maps and charts.

---

## Links

- [Location App Section](https://colinfran.com/locations/)
- [Blog](https://colinfran.com/blog)
- [Resume](https://colinfran.com/resume/)

---

Feel free to explore the codebase and reach out with any questions!