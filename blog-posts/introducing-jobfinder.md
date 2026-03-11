---
id: "introducing-jobfinder"
title: "Building JobFinder: An Automated Job Search Aggregator"
author: "Colin Franceschini"
date: "2026-02-12T09:00:00.000Z"
imageUrl: "https://i.ibb.co/mrPdHqNs/jobfinder.jpg"
---

Job hunting is a lot of repeated clicks: the same roles across different boards, the same filters, the same "check back tomorrow" loop. I built **JobFinder** to make that process easier and more consistent, not because I was in a panic, but because I wanted a cleaner system for myself and a simple way to help my younger brother do the same.

The core idea is straightforward: turn job discovery into an automated pipeline. JobFinder runs targeted Google Search queries via the Serper API, pulls recent listings, and stores structured data like title, company, source, and snippets in PostgreSQL. Instead of bouncing between tabs, the results land in one focused dashboard.

On the product side, the dashboard keeps things tight: a topic switcher (software vs. finance), quick filters for "New," "Applied," and "Not Relevant," plus text search across titles, companies, snippets, and sources. Clicking a listing opens the original post and can mark it as applied, which keeps the workflow fast when working through a batch of roles.

Under the hood, JobFinder is built with **Next.js** and **React**, styled with **Tailwind CSS** and **shadcn/ui**, and deployed on **Vercel**. The data layer uses **Drizzle ORM** with PostgreSQL, and auth is handled with social sign-in (Google and GitHub) so each user gets a personalized dashboard state.

Where this project got difficult was not UI. It was data quality.

I had to handle the whole system end to end: ingestion, normalization, deduplication, validation, and relevance. Job listings change constantly, sources behave differently, and a weak pipeline quickly fills up with stale or duplicate links.

I leaned hard into quality over noise. JobFinder normalizes incoming titles and URLs, deduplicates records by canonical links, and validates listings in multiple layers:

- Scheduled Vercel cron jobs run ingestion and baseline checks.
- A second cron pass removes duplicates and validates server-rendered sources (like Greenhouse, Lever, and Rippling) with source-specific parsing logic.
- Deeper validation for harder sources (Ashby, Workday, and Gem) runs through GitHub Actions using a dedicated validator tool with Puppeteer and API-based checks.

That validation layer is a big part of the product. It is designed to keep invalid jobs from piling up while staying conservative around inconclusive failures (timeouts, partial responses, rate-limited pages) so good listings are not removed too aggressively.

I also focused heavily on responsiveness because the value of the product depends on moving quickly through a lot of listings. Optimistic UI updates and list virtualization helped keep the dashboard fast even as larger datasets were being processed in the background.

## What I Learned

Building JobFinder reinforced something I have always believed: the best side projects solve real problems you personally experience.

Because I was actively using it, every small annoyance became a feature improvement. Performance optimizations mattered. Clean state management mattered. Good UX decisions mattered.

It also reminded me that not every project needs to be positioned as "AI powered." Sometimes solid automation and thoughtful engineering are more than enough.

The biggest lesson for me was to validate assumptions early and build observability from day one. When you are the only engineer, product manager, and designer, feedback loops matter more than perfect architecture.

If I were starting again, I would invest earlier in analytics and behavior tracking to guide prioritization sooner, and I would time-box experimentation more intentionally to validate product decisions faster before committing deeper engineering effort.

## What's Next

JobFinder is already helping streamline job discovery and tracking. The next step is continuing to refine search quality, improve filtering, and expand tracking insights.

At the end of the day, this project started as a way to reduce friction in a process I was already going through. Now it is something I can share with others who want a more organized and centralized job search experience.

If you are building tools to improve your own workflows, my advice is simple: ship the practical version first. You can always iterate.

This project is still evolving as I refine my own workflow and help my brother tune his. If you want to see it in action, it is live at [https://jobfinder.dev](https://jobfinder.dev).
