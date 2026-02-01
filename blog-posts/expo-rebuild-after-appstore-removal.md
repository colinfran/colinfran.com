---
id: "expo-rebuild-after-appstore-removal"
title: "Rebuilding My React Native App with Expo After App Store Removal"
author: "Colin Franceschini"
date: "2026-01-31T14:30:00.000Z"
imageUrl: "https://i.ibb.co/Gf3mLz0L/app-rebuild.jpg"
---

Recently, I received an email from Apple informing me that my old React Native app had been **removed from the App Store**. The message explained that I hadn’t responded to updated age rating questions in the App Information section, covering topics like in-app controls, medical or wellness content, and violent themes. The deadline to submit responses was January 31, 2026, or I wouldn’t be able to upload updates.

This was a wake-up call. Rather than patching the old app, I decided to **rebuild it entirely using Expo**. The rebuild allowed me to modernize the architecture, streamline dependencies, and take advantage of **EAS Build**, which makes deployment to the App Store and TestFlight much simpler. No more wrestling with certificates or provisioning profiles manually—Expo handled it in the cloud.

I also navigated Apple’s submission requirements, including **iPad screenshots** and **bumping build numbers**, which are now mandatory for review. Rebuilding the app gave me a chance to improve performance, clean up the codebase, and ensure full compatibility with the latest iOS versions.

While receiving a removal notice from Apple might feel stressful at first, this experience turned into an opportunity to modernize and optimize the app. With Expo, the process was surprisingly smooth, and I’m excited to share the updated version with users soon.

For other React Native developers facing App Store challenges, this is a reminder: sometimes a forced rebuild is the perfect chance to improve your app and simplify future updates.
