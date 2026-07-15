# Personal Website

A dark, terminal-inspired personal portfolio site. Plain HTML/CSS/JS — no build step, so it deploys straight to GitHub Pages.

## Structure

```
index.html      main page
css/style.css   all styling
js/script.js    interactivity (typewriter, fake terminal, scroll effects)
```

## Customize before deploying

- **Projects** (`index.html`, `#projects` section): swap the placeholder cards' titles, descriptions, tags, and the `href="#"` links to your real GitHub repo / live demo URLs.
- **Skills** (`index.html`, `#skills` section): edit the tags to match your actual stack.
- **Socials** (`index.html`, `#contact` section): update the `#github-link` and `#linkedin-link` `href` values to your real profile URLs.
- **Email**: already set to jeffrey.kung00@gmail.com — change if needed.

## Deploy to GitHub Pages (`jskung.github.io`)

1. Create a new GitHub repo named exactly `jskung.github.io`.
2. From this folder, initialize git and push:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/jskung/jskung.github.io.git
   git push -u origin main
   ```
3. GitHub Pages will automatically serve the site at `https://jskung.github.io` within a minute or two (no extra config needed for a user site — it serves `index.html` from the root of the `main` branch).
4. If it doesn't show up, check the repo's **Settings → Pages** tab to confirm the source is set to the `main` branch, root folder.

## Local preview

Just open `index.html` in a browser, or run a tiny local server:

```
npx serve .
```
