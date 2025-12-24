# Completely Wrong DOB Guesser

A small, playful web app that "guesses" a user's date of birth based on a short personality / preference quiz. Built with TypeScript, Vite, and Tailwind CSS — intentionally unreliable and fun.

> ⚠️ This project is a novelty/party app — the guesses are not serious and should not be used for any important purpose.

## Demo
Run locally to try it out (see Installation). If you publish, replace this with a link to the live demo.

## Features
- Short interactive quiz (slider, tiles, and multiple-choice questions)
- Lightweight single-page app using Vite
- Styled with Tailwind CSS
- Playful UI with animated progress and transitions

## Tech stack
- TypeScript
- Vite
- Tailwind CSS
- Plain HTML/CSS/JS for the minimal entry (index.html)
- Optional: Bun or npm for package management (repo contains bun.lockb and package-lock.json)

## Getting started

Clone the repository:
```bash
git clone https://github.com/NoticeableStar/completely-wrong-dob-guesser.git
cd completely-wrong-dob-guesser
```

Install dependencies (choose one):

- npm
```bash
npm install
```

- bun
```bash
bun install
```

Run the dev server (Vite default):
```bash
# npm
npm run dev

# or bun
bun run dev
```
Open http://localhost:5173 (or the port Vite reports) in your browser.

Build for production:
```bash
npm run build
# Preview build
npm run preview
```

## Project structure (high-level)
- index.html — app entry
- src/ — application source (UI, quiz data, components)
- public/ — static assets
- tailwind.config.ts — Tailwind configuration
- package.json — npm scripts & dependencies

## Contributing
Small project — contributions welcome!
- Add or tweak quiz questions in src/data (or wherever questions are defined)
- Improve UI/UX, animations, and accessibility
- Add tests or CI if you want to make the guessing more deterministic (or intentionally more wrong)

Please open an issue or PR with a short description of your change.

## Ideas / Roadmap
- Add shareable results (image + text)
- Add localization / language support
- Add analytics for which guesses people find funniest
- Make an optional "honest" mode that reveals how the guess was derived

## License
Add a LICENSE file if you want a specific license. If you want me to add one (MIT, Apache-2.0, etc.), tell me which license to include.

## Acknowledgements
- Built using Vite and Tailwind CSS
- Project scaffolded/edited with developer tools

## Contact
Author: [NoticeableStar](https://github.com/NoticeableStar)
