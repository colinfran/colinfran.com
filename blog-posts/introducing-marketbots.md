---
id: "introducing-marketbots"
title: "Marketbots: Two AI Trading Bots Running on My Own GPUs"
author: "Colin Franceschini"
date: "2026-11-12T09:00:00.000Z"
imageUrl: "https://i.ibb.co/HfKqGGWC/marketbots.png"
---

For the last couple of years, almost everything I build has had an AI API somewhere in it. At HP, I worked as a full-stack engineer on **Z by HP AI Studio**, a platform for building AI and machine learning projects on your own hardware. Outside of work, I never really stopped building: small tools and apps that call **Grok**, the **OpenAI API**, and whatever new model just came out, to search, summarize, classify, and generally take the boring work off my plate.

All of those projects had one thing in common: someone else's model, running on someone else's servers, billed by the token. Meanwhile, I had an old PC at home with two graphics cards in it, an RTX 3070 and an RTX 2080 SUPER, that sat there completely unused.

So I built **Marketbots**: two autonomous AI trading bots, one for crypto and one for stocks, running 24/7 on that hardware.

**Quick note before anything else: this is paper trading only.** Both bots trade simulated money at real market prices. There is no code path that can touch real money, and that's on purpose.

### Why I Built It

I had the hardware lying around, and I wanted to build a cool project that could actually put it to work, while also answering a question I'd been curious about for a long time: **can an AI agent actually trade and make profit?** Not "ask a chatbot for stock tips," but a system that watches the market all day, reads the news as it breaks, makes its own decisions, and lives with the results.

I also wanted to see how far I could get without paying for a single API call. At HP I spent a lot of time around the idea of running AI locally, on your own machine. Marketbots was my chance to do that end to end, for something that runs every minute of every day.

And honestly, markets are a great sandbox for this. The feedback never stops, the data is endless, and the scoreboard doesn't lie.

### Where It Started: Grok on a Timer

Marketbots started out as two separate projects. The first was **StockMarketBot**, which I started in November 2025. The first version ran inside Vercel functions triggered by a cron job: every so often it would wake up, have Grok search the web and X for what was moving, write a research memo, and decide what to buy or sell in a $10,000 paper account on **Alpaca**.

It worked, but it hit walls fast. Vercel functions cap out at 300 seconds per run, and a trading bot really wants to be always on: holding live price connections, watching options exits every few seconds, reacting the moment something breaks. So I moved the engine into an always-on Node service in Docker on my home server and kept the dashboard on Vercel.

Then came **CryptoMarketBot**, the same idea for crypto: Kraken spot pairs, 24/7, in a Kraken CLI paper wallet that fills at live Kraken prices.

Both bots called Grok through the **Vercel AI Gateway**, and both had the same problem: every call cost money. A full stock trading day cost about $3.80 in AI calls, and I had daily budgets to keep things in check. That meant most of the design was really about *when the AI was allowed to run*: a scan every 15 minutes, a few news-driven cycles an hour, a hard cap per day. The AI was rationed, so the bots could only think on a schedule.

### Bringing the Brain Home

In late October 2026, I decided to replace Grok entirely with a model running on my own GPUs.

My hardware made this more interesting than it sounds. I have 16 GB of VRAM in total, but it's two separate 8 GB cards, and the 2080 SUPER sits in a slot that's only wired for PCIe 3.0 x4. That rules out the fancy ways of splitting one model across two cards. The 2080 is also old enough that it doesn't support some of the features the fastest inference servers depend on.

What does work well on this setup is **llama.cpp** and **mixture-of-experts (MoE)** models. An MoE model has a lot of parameters, but it only uses a few billion of them for each token, so it reasons more like a big model and runs about as fast as a small one. Splitting it by layers across both cards barely touches the slow x4 link.

So I built an eval harness and ran the candidates against every decision the bots had already recorded with Grok: **gpt-oss-20b** (OpenAI's open-weight model), **Gemma 4 26B**, and **Qwen 3.6 35B-A3B**. Qwen at 2-bit ended up fitting entirely on the two cards and running as fast as gpt-oss, around 40 to 50 tokens per second, so that's what both bots run on today. It's loaded all the time, serves both bots plus a background slot for reading the news, and costs exactly $0 per call.

That changed everything about the design. When thinking is free, you don't have to ration it.

### How It Works

Here's the same live diagram that runs on [marketbots.vercel.app](https://marketbots.vercel.app). Blue is StockMarketBot and orange is CryptoMarketBot: watch each one wake up, look things up, run its risk check, and place an order. Hover over any box to see what it talks to.

```embed
https://marketbots.vercel.app/embed/topology
How Marketbots works: an animated diagram of both bots and the Docker stack on my server
```

Instead of running on a timer, each bot now has an **agent** that's event-driven:

- **Code watches everything.** Live prices, 70 to 80 free news and filing sources per bot, quant screens, the market session, and any price levels the agent asked to keep an eye on. It never sleeps.
- **The agent wakes up when something matters.** A sharp price move, breaking news about something it holds, a fill, a level it set a watch on. Within seconds, it starts an "episode."
- **It does its own research.** In each episode, the model looks things up one step at a time: quotes, technical indicators, the order book, the news, years of price history, even its own past decisions and how they turned out. It can search the web through a self-hosted search engine (**SearXNG**) and read articles through a headless browser.
- **Then it decides and leaves itself notes.** It can trade, hold, set watches for later, or write notes that show up the next time it wakes up.
- **Code keeps the authority.** The model never talks to the broker and never holds a key. Every decision goes through deterministic code that sizes the order and runs the risk checks, which approve, resize, or reject it before anything reaches the paper account. My rule for the whole project: *the model proposes, code disposes.*

Behind the agent there's a **history store** (Postgres with TimescaleDB) holding years of price bars and an archive of every news item the bots have seen, so the agent can ask questions like "what happened after the last ten times this dropped 10% in a day?" and get real answers from data instead of guessing.

And everything is visible. Each bot has a public dashboard that streams the agent's work live over a WebSocket: what woke it up, every tool it called, what the model is thinking as it writes it, every risk check, and every order and fill. I also get Discord notifications whenever a bot buys or sells, which is still a fun thing to see pop up on my phone.

### The Stack

Marketbots is now one **pnpm** monorepo holding both bots. They share the parts they mean the same thing by (the agent runtime, the news engine, the history store, UI components) and keep their trading logic completely separate.

- **Engines:** **Node.js** and **TypeScript** in Docker, always on
- **Dashboards:** **Next.js** and **React**, styled with **Tailwind CSS** and **Radix UI**, with **lightweight-charts** for the price charts
- **AI:** **Qwen 3.6 35B-A3B** on **llama.cpp**, split across an RTX 3070 and an RTX 2080 SUPER
- **Data:** **MongoDB** for each bot's books, **Postgres + TimescaleDB** for history
- **Brokers:** **Alpaca** paper (stocks and defined-risk options), **Kraken CLI** paper wallet (crypto)
- **Infra:** one **Docker Compose** stack on my Windows server, behind **Caddy**

Everything runs on that one machine now. Over the past few weeks I moved the databases off Atlas and Azure and the dashboards off Vercel, so the whole thing lives in a single Docker stack at home. The dashboards even have a Server page that shows the machine itself: CPU temperature, both GPUs, fan speeds, and how much electricity it's pulling from the smart plug it's plugged into.

### Challenges and Surprises

**An AI agent on its own is not a trading strategy.** This was the biggest lesson. When the agent was the only thing making decisions, it was way too cautious. On the stock side it took positions around 1% of the account and closed everything every evening; on the crypto side it mostly sat in cash. Both lost money. So I flipped the roles. Each bot now has a **trend core** that trades on fixed, well-documented momentum rules (hold the strongest trends, cut losers at the stop, let winners run), and the agent works as an overlay on top of it: it reads the news, finds setups, raises stops, and can close a position when the news turns. There's also a long-term book that simply holds things like BTC, ETH, SPY, and QQQ for months.

**Models make weird mistakes.** One of my favorites: the crypto agent kept setting a take-profit for PEPE at 560, when the coin trades around $0.0000056. That's the kind of mistake a person would never make and a model will make with total confidence, which is exactly why code checks every number before it goes anywhere. (Now any target more than 3x the price gets ignored as a units slip.)

**Floating-point math will find you.** Around the same time, a stop-loss on 311 million PEPE couldn't fill. A tiny rounding error made every sell order ask the wallet for slightly more PEPE than it actually held, so the order got refused, over and over. Paper money, real lesson.

**Two 8 GB cards means every megabyte counts.** Fitting a 35B model meant measuring everything: how much memory the display uses, how big the prompt cache can get, and a speed guard that pauses AI work if generation suddenly slows down (a sign the model spilled out of VRAM). At one point the model server's prompt cache grew past its container's memory limit and froze the whole Docker VM for seconds at a time.

**Free tiers have limits.** For a while, the bots' databases ran on Azure's free tier, and its CPU cap kept refusing queries. That was the push I needed to move everything onto the server.

### What I've Learned

- **Local AI is real.** A model running on two consumer GPUs, one of which was collecting dust, now runs two always-on agents for free. That would have sounded crazy to me a couple of years ago.
- **Free changes the design, not just the bill.** When every call costs money, you build around rationing the AI. When it's free, you can let it think whenever something actually matters.
- **Let the model propose and let code decide.** LLMs are great at reading the news and weighing up a messy situation. They're not great at arithmetic, units, or discipline. Deterministic code should own every number that matters.
- **Build for yourself first.** Same lesson as JobFinder and SFHouseFinder: I check these dashboards constantly, so every annoyance turned into a fix.

### What's Next

The next steps are giving the agent even more history to work with, tightening the scorecards that measure whether any of this actually beats just holding BTC or SPY, and letting the agent earn more responsibility as it proves itself.

[TODO: a short paragraph on results so far, e.g. each bot's return since November 6 vs. holding BTC / SPY.]

If you want to watch them work, both dashboards are public:

- **CryptoMarketBot:** [https://cryptomarketbot.app](https://cryptomarketbot.app)
- **StockMarketBot:** [https://stockmarketbot.app](https://stockmarketbot.app)

And if you have hardware sitting around collecting dust, my advice is simple: put it to work. You'd be surprised what it can run.

*Marketbots trades simulated money only. Nothing here is financial advice.*
