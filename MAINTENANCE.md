# Maintaining and Extending the Portfolio

This covers how the whole system fits together, and how to do the things
you'll actually need to do again: add a project, update content, and
understand what happens when something breaks.

## The moving pieces, at a glance

| Piece | Where it lives | What it does |
|---|---|---|
| Portfolio site | `github.com/DagemDereje/dagem-portfolio` → Vercel | The site itself |
| 5 ML/data apps | 5 separate repos → Streamlit Community Cloud | The actual interactive applications |
| Keep-alive automation | `streamlit-keepalive` repo → GitHub Actions | Visits the 5 apps every 6 hours so they rarely go to sleep |

Nothing here is one big monolith — the portfolio doesn't contain any of
your ML code, and the apps don't know the portfolio exists. They're
connected only by URLs.

---

## Adding a new project (e.g. the Customer Churn/BI project)

This is the one you'll do most often, and it's deliberately a
one-file change:

1. Open `lib/projects.ts`
2. Copy an existing project object (pick one with a similar shape — e.g.
   `heart-disease-predictor` if the new one won't have a live app yet)
3. Fill in every field honestly:
   - `results` and `metricHighlight` — only include real, verified numbers.
     If you haven't benchmarked something yet, say so in `results` rather
     than inventing a figure or leaving the field implying more rigor than
     exists.
   - `featured` — `true` puts it in the prominent grid, `false` puts it
     under "More Projects"
4. If the project needs its own icon in `components/illustrations/ProjectIllustration.tsx`,
   add a case for its slug — otherwise it'll just show no illustration,
   which is fine, not broken.
5. Run `npm run build` locally to confirm no errors
6. Commit and push — the new project page (`/projects/your-slug`), its
   sitemap entry, and its homepage card all appear automatically. Nothing
   else needs updating by hand.

That's the entire "add a project" workflow. If you ever find yourself
editing more than `lib/projects.ts` (and optionally the illustrations
file) to add a project, something has drifted from how this was designed
— worth revisiting rather than accepting as normal.

---

## Updating existing content

- **Photo**: replace `public/photo.jpg` with a new file of the same name
- **Resume**: replace `public/resume.pdf`
- **About page text / skills**: edit directly in `app/about/page.tsx`
- **Email / contact info**: search for it in `app/page.tsx` (the
  "Get in touch" button)

All of these just need a commit + push to go live — Vercel redeploys
automatically on every push to `main`.

---

## How the live app embeds work

Each project page can show a `LiveAppEmbed` component pointing at a
deployed Streamlit app. Two things worth remembering:

1. **A visitor might see the app's own "waking up" screen** inside the
   embed — this is Streamlit's own UI, not a bug in the portfolio. The
   component's text already tells visitors to use "Open Full Application"
   if this happens.
2. **The keep-alive automation reduces how often this happens**, but
   doesn't guarantee it never will — free-tier hosting sleep behavior
   isn't something either of us controls, and platforms have changed this
   kind of policy before without notice (this happened with Hugging Face
   Spaces during this same project).

If you ever add a 6th interactive app, add its URL to `apps.json` in the
`streamlit-keepalive` repo so it gets covered by the same automation —
otherwise it'll be exempt from keep-alive pings.

---

## SEO — what updates itself vs. what doesn't

**Updates automatically** when you add a project to `lib/projects.ts`:
sitemap.xml, per-page metadata, structured data (JSON-LD).

**Needs manual action** if you ever change domains (e.g. add a custom
domain instead of the `.vercel.app` one):
1. Update `SITE_URL` in `lib/site.ts` — this is the one place everything
   else reads from
2. Re-verify the new domain in Google Search Console and Bing Webmaster
   Tools (the verification tags are tied to a specific URL)

---

## Troubleshooting notes from things that actually came up

- **`git push` rejected / "fetch first"**: usually means your local repo's
  history doesn't match GitHub's. If you're certain your local folder has
  everything correct (check it actually has your real content, not
  placeholder text, before assuming this), `git push --force` overwrites
  GitHub with your local version. This is safe for a solo project with no
  collaborators, but not something to do reflexively — confirm the local
  content is actually right first.
- **Google's "Request Indexing" says quota exceeded**: normal, resets
  after 24 hours, and doesn't block anything — the sitemap submission
  already tells Google about every page regardless.
- **Bing sitemap field rejects a relative path**: unlike Google, Bing's
  sitemap submission wants the full URL
  (`https://yoursite.com/sitemap.xml`), not just `sitemap.xml`.
- **Vercel signup blocked with "requires further verification"**: a known,
  fairly common automated check on new accounts — resolved by emailing
  `registration@vercel.com` with your GitHub username, not something
  wrong with your account specifically.

---

## The one principle worth keeping if this grows

Every time something new got added to this project, the two questions
that mattered were: *is this the simplest thing that actually works*, and
*is every claim here something we can actually back up*. Both are worth
asking again for anything you add later — a new project, a new section, a
new integration — rather than assuming more complexity or a more
impressive-sounding claim is automatically better for a portfolio whose
whole point is demonstrating real, honest work.
