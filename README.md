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

Edit `site.config.js` to change the public name, phone, WhatsApp number, optional
contact email, and optional HTTPS booking link. Include the country code in the
phone and WhatsApp number. The confirmed local number is `8880151210`; the site
uses India's `+91` country code.

Edit `index.html` for the introduction, services, FAQs, and other copy. Name and
direct contact links are also present in HTML so they work without JavaScript;
update those when changing the business identity. Colors and layouts are in
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
```

Check desktop and mobile layouts, menu keyboard controls, challenge selection,
FAQ expansion, form validation, and the WhatsApp draft before changing contact
details. The preview server serves only the public site files and binds to
`127.0.0.1`.
