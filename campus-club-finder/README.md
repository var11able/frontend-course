# Campus Club Finder

A web app assignment to learn and prove React fundamentals.

It runs entirely in the browser, with no backend and no login. Data is saved in `localStorage`.

![Club list](docs/screenshots/02-clubs-grid-az.png)

## Features

- Home page with a welcome message, hero image, and a button to browse clubs
- Club list with sorting and a Grid / List view toggle
- Club detail page with a large image, full description, and upcoming events
- Join Club button, saved in `localStorage` so it stays after a reload
- About page and a 404 page
- Responsive on mobile, tablet, and desktop

A full walkthrough with screenshots is in [DOCUMENTATION.md](DOCUMENTATION.md).

## Tech stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Instructions

You need [Node.js](https://nodejs.org/) 20.19 or newer.

```bash
git clone https://github.com/var11able/frontend-course.git
cd frontend-course/campus-club-finder
npm install
npm run dev
```

Open the address Vite prints in the terminal.

- `npm run dev` Start the development server
- `npm run build` Build the app into `dist/`
- `npm run preview` Preview the built app
- `npm run lint` Check the code with oxlint

## Photo credits

Photos are from [Unsplash](https://unsplash.com/), used under the [Unsplash License](https://unsplash.com/license).

- Home: [Brelyn Bashrum](https://unsplash.com/photos/MUiv880yORo)
- Robotics: [Gabriel Vasiliu](https://unsplash.com/photos/fCJi6nVU27o)
- Photography: [Micah & Sammie Chaffin](https://unsplash.com/photos/hGUMJ7IAMR0)
- Debate: [Clint Patterson](https://unsplash.com/photos/Wce1i00U8eM)
- Outdoors: [Benjamin Chambon](https://unsplash.com/photos/zO0le9E7Ono)
- Film: [Avel Chuklanov](https://unsplash.com/photos/Hn3S90f6aak)
