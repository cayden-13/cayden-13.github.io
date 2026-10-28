# Cayden / Bowen Yu — Personal Website

Live website: https://cayden-13.github.io/

A static, framework-free portfolio featuring an interactive astronaut and planetary navigation, academic publications, education, experience, project demonstrations and an ambient particle study.

## Local preview

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Use an HTTP server rather than opening HTML files directly so that video loading and same-origin navigation work correctly.

## Source map

- `index.html`: personal information and academic content.
- `app.js`: publication data, filters, image dialogs and planet theme navigation.
- `skyranger.html`: self-contained astronaut and planet interface.
- `style.css`: base responsive layout.
- `research.css` and `research.js`: current detail-page design, project motion and particle rendering.
- `assets/`: locally stored images, video, CV and source credits.
- `assets/image-sources.json`: attribution and provenance for media.

GitHub Pages serves the root of the `main` branch. `.nojekyll` keeps this a plain static site with no build step.

Hardware images are representative illustrations, not photographs of project implementations. Research animations are conceptual. Media sources and user-supplied manuscript images are documented in the attribution file. `cosmos.js` and some older assets are retained for reference and are not currently loaded.
