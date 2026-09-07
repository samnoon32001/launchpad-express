# Launchpad Express

Create a simple, modern website launch page.

The page should have:

A clean input box: “Enter website URL”

A “LAUNCH” button

When the user enters a URL and clicks LAUNCH:

Smoothly transition from the input screen into a full-screen launch animation.

Start a countdown from 10 → 9 → 8 → ... → 0.

Each number should have a beautiful smooth transition, such as fade + scale + blur, with the previous number smoothly disappearing as the next number appears.

Add subtle background movement/glow during the countdown.

At 0, smoothly transition the countdown into:
“LAUNCHING…”

Hold the launching animation briefly, then smoothly transition/redirect to the exact URL entered in the input box.

The transition should feel premium, cinematic, smooth, and impressive, not like a basic countdown timer.

Keep the overall interface minimal and clean. Make it fully responsive on desktop and mobile.

Validate the URL before starting the countdown and show a simple error message if the URL is empty or invalid.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d2186079-a0fa-42ba-905e-6ba63d5690d8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
