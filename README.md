
# colinfran.com

Welcome to my personal website! This monorepo contains the source code for [colinfran.com](https://colinfran.com), built with React, Next.js, TailwindCSS, and shadcn/ui. It features:

- A blog with technical posts and project updates
- A showcase of my projects
- A resume section
- A custom location tracking app
- Modern UI components and utilities

---

## <a name="location-app"></a>Location App

MyLocationAnalysis is a custom-built app for tracking, analyzing, and visualizing my location data. It includes:

- [**Location tracking API** (`app/api/location/`)](https://github.com/colinfran/colinfran.com/blob/main/app/api/location/)
- [**Data analysis tools** (`app/api/location/analysis/`)](https://github.com/colinfran/colinfran.com/tree/main/app/api/location/analysis)
- [**Dashboard with interactive heatmaps and insights** (`/app/locations/`)](https://github.com/colinfran/colinfran.com/tree/main/app/locations/)


### Features

- Collects and stores location data securely
- Provides visualizations (heatmaps, clusters, trends)
- Offers insights into travel patterns, routines, and anomalies

### How it works

My location data is sent to the API endpoints [with iOS shortcuts every 30 minutes](https://colinfran.com/blog/tracking-location-with-iphone-shortcut), processed for analysis, and displayed in the insights dashboard. The UI leverages custom React components for interactive maps and charts.

---

## Links

- [Location App](https://colinfran.com/locations/)
- [Blog](https://colinfran.com/blog/)
- [Resume](https://colinfran.com/resume/)

---

Feel free to explore the codebase and reach out with any questions!