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

I also leaned into the idea of quality over noise. JobFinder validates links and normalizes incoming data so listings stay clean and usable. The validation layer runs in two parts: scheduled Vercel cron jobs for ingestion and basic checks, plus deeper validation scripts that run on **GitHub Actions** (including Puppeteer-based checks for sources that require browser automation). That setup helps keep stale or invalid jobs from piling up.

## What I Learned

Building JobFinder reinforced something I have always believed: the best side projects solve real problems you personally experience.

Because I was actively using it, every small annoyance became a feature improvement. Performance optimizations mattered. Clean state management mattered. Good UX decisions mattered.

It also reminded me that not every project needs to be positioned as "AI powered." Sometimes solid automation and thoughtful engineering are more than enough.

## What's Next

JobFinder is already helping streamline job discovery and tracking. The next step is continuing to refine search quality, improve filtering, and expand tracking insights.

At the end of the day, this project started as a way to reduce friction in a process I was already going through. Now it is something I can share with others who want a more organized and centralized job search experience.

If you are building tools to improve your own workflows, my advice is simple: ship the practical version first. You can always iterate.

This project is still evolving as I refine my own workflow and help my brother tune his. If you want to see it in action, it is live at [https://jobfinder.dev](https://jobfinder.dev).
