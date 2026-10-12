# Umesh Sharda — Business Growth Coaching

A responsive, single-page website for a business growth coach. Plain HTML, CSS,
and JavaScript, with no framework, build step, or dependencies. Ready for GitHub Pages.

The site includes coaching services, an interactive challenge selector, the coaching
process, an introduction, FAQs, call and WhatsApp links, and an enquiry builder.
The builder prepares a WhatsApp draft; the visitor reviews and sends it themselves.
Enquiries are never stored on the site or submitted to a server. Copy and text-file
download options are also available.

## Preview locally

Double-click `start.cmd`, or run:

```powershell
cd C:\personal_projects\business-growth-coach
npm start
```

Open **http://localhost:8790**. No `npm install` is needed. Node.js 22+ is needed
only for the local preview. The deployed site works without Node.js.
You can also open `index.html` directly in a browser.

## Update the business details

### Browser editor

Double-click **edit.cmd** to open **http://localhost:8790/editor/**. Keep the launcher
window open. Edit the coach and contact details, page text, services, FAQs, and challenge
recommendations through forms; check the desktop or mobile draft preview; then click
**Save draft**. Drafts are saved on this computer and do not change the published site.

To publish, click **Publish website**, check the GitHub account and repository, click
**Review publication**, and then **Publish these changes**. The default destination is
`hedaprateek/business-growth-coach`, branch `main`. Git for Windows and a GitHub account
signed in through Git Credential Manager are required. The selected username must match
the signed-in account. The editor reads that credential on the local server and never
sends it to the browser or includes it in website files or backups.

Publication updates only public website files, preserves unrelated repository files,
and stops if the remote branch changes after the review. It does not modify the local
Git index. GitHub Pages publishes the commit asynchronously; the editor provides the
website and deployment-progress links. If Pages setup lacks permission, the uploaded
commit is recorded and the editor links to the remaining Pages setup step.

**Download content backup** and **Restore a content backup** provide manual backup and
recovery. Local drafts, revision backups, and publishing records are in `.editor-data/`,
which is excluded from Git and public serving. Copy that folder with the project if
moving the editor to another computer. No hosted backend or online login is needed.

The editor is local-only, bound to `127.0.0.1`, and its write endpoints require a local
session token and reject cross-origin requests. It uses the same zero-dependency Node
server as the preview. The public website still works as a static GitHub Pages site.

### Advanced edits

Edit `site.config.js` to change the public name, phone, WhatsApp number, optional
contact email, and optional HTTPS booking link. Include the country code in the
phone and WhatsApp number. The confirmed local number is `8880151210`; the site
uses India's `+91` country code.

Edit the `copy` and `startingPoints` objects in `site.config.js` for the introduction,
services, FAQs, and challenge recommendations. The editor generates matching HTML
text and metadata when publishing, so the main page copy also works without JavaScript.
Colors and layouts are in
`styles.css`. The artwork is original inline SVG, with system fonts and no external
image or font requests. No testimonials, credentials, or business results have been
invented. The service descriptions are starter copy to adjust to the coach's offering.

No passwords, tokens, or private business information belong in these files.

## GitHub Pages

The repository can be published directly from the **main** branch, **/ (root)**:
**Settings → Pages → Build and deployment → Deploy from a branch**.
The `.nojekyll` file keeps the site a plain static website.

Published URL: **https://hedaprateek.github.io/business-growth-coach/**

## Checks

```powershell
npm run check
npm test
```

Check desktop and mobile layouts, menu keyboard controls, challenge selection,
FAQ expansion, form validation, and the WhatsApp draft before changing contact
details. The preview server serves only the public site files and binds to
`127.0.0.1`.

The editor tests use temporary files and a simulated GitHub API to verify saving,
previewing, image uploads, local access protection, publication conflicts, and Pages
setup failures. They never publish to GitHub. Published page text is now stored in
`site.config.js` alongside the contact details; keep its JSON object format when editing
it manually. `{{businessName}}` in page text uses the configured coach name automatically.
