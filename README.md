# Portfolio V4

Static portfolio site: plain HTML, CSS and a few lines of JavaScript, with no build step.
V4 looks pixel-for-pixel the same as V2.2. It was rebuilt so that **AI agents, crawlers
and screen readers get the same facts a sighted visitor gets from the layout**.

## Structure

```
index.html                      the page (+ JSON-LD structured data in <head>)
llms.txt                        full plain-Markdown copy of the page, written for AI agents
robots.txt, sitemap.xml         crawler entry points (sitemap lists index + llms.txt)
css/style.css                   design-system tokens, components, self-hosted @font-face
css/portfolio.css               page layout + the agent-readable helpers (.sr-only, .heading-reset)
js/main.js                      expand/collapse for the "Full design story" panel
fonts/                          Barlow / Barlow Condensed (woff2)
assets/favicon.png, apple-touch-icon.png
assets/images/baxter-harrington-headshot.webp
assets/images/odds-and-ends-placeholder.jpg     stand-in for the three Odds and Ends tiles
assets/video/so101-policy2-v3-rollout-demo.mp4  SO-101 Policy 2 (V3) demo
```

## Agent-readability rules (keep these when editing)

1. **Never hide content with `hidden` or `display:none`** if it's real content. Many
   agents read `innerText` or strip hidden nodes, so that text disappears for them. The design
   story collapses with a zero-height clip instead (`.js .project:not(.is-open) .story`
   in `portfolio.css`). Without JS it simply shows open.
2. **Don't let layout carry meaning on its own.** Anything a human reads from position,
   like which Venn region a word sits in or which button belongs to which policy, needs
   a text equivalent in a `.sr-only` element. `.sr-only` is invisible but still extracted.
3. **Define every ID.** "01", "Step 01", "1.", "A1", "BU 1", "V2/V3", "Figure 2.1": each one
   is spelled out once in `.sr-only` text (see the "Naming key" paragraph in Project 02).
4. **Use real headings.** Label-styled headings are `<h3 class="kicker … heading-reset">`.
   `.heading-reset` cancels the default h1–h6 look so the kicker style alone applies.
5. **Separate SVG labels.** Each line of the Venn is its own `<text>`, so extraction doesn't
   glue words together ("Call quotaAgreement recon"). Each region `<g>` starts with a
   zero-size, transparent `<text>` that names the region.
6. **Placeholders say they're placeholders** (in `.sr-only` text), so agents don't report
   stand-in images or "Add your email here" as real content.
7. **Keep `llms.txt`, the JSON-LD block and the `.sr-only` Venn list in sync with any
   content edit.** They are hand-written copies.
8. **Name files for what they are.** Agents read filenames as content.

## Placeholders still to fill

- Odds and Ends: three tiles use `odds-and-ends-placeholder.jpg`. When you swap in real
  images, give each one a descriptive filename and `alt` text, and delete the `.sr-only`
  "Not yet filled in" note in that section.
- Contact / Resume cards: when you fill them, remove the `.sr-only` "Not yet published"
  spans and update `llms.txt` and the JSON-LD (`email`, `sameAs`).

## Preview locally

```bash
python3 -m http.server
```

## Deploying

Push the folder as-is to any static host. All pages use `https://www.baxterharrington.com/`
as the canonical URL. Hosting note: the apex domain currently answers with a
**302 to `http://www.`**, which downgrades HTTPS to HTTP. Change it to a 301 to
`https://www.baxterharrington.com/` in Cloudflare.
