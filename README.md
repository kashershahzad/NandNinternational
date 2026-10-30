# NandN International

Premium static website — men's cosmetics vendor directory for **NandN International** (Dr. Nadeem Nazir & Associates).

Built with **HTML5 · CSS3 · Vanilla JavaScript** only. No frameworks.

---

## Open & run

1. Open the project folder:
   `/Users/macbookpro/Desktop/work/NandNInternational`
2. Double-click `index.html`, **or** serve locally:

```bash
cd /Users/macbookpro/Desktop/work/NandNInternational
python3 -m http.server 8080
```

3. Visit `http://localhost:8080`

---

## Project structure

```
NandNInternational/
├── index.html
├── css/style.css
├── js/main.js
├── js/vendors.js
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── vendors/
│   │   └── categories/
│   └── favicon/
└── README.md
```

---

## Replace product photographs

1. Add or replace files in `assets/images/products/`
2. Prefer descriptive filenames (e.g. `beard-oil-amber.jpg`)
3. Update the matching `<img src="...">` paths in `index.html`
4. Category images live in `assets/images/categories/` (can reuse product shots with different crops via CSS)

Tips:

- Use `loading="lazy"` for below-the-fold images (already applied)
- Adjust crop with CSS `object-fit` / `object-position`, or the `data-pos` attributes used in the showcase

---

## Add a new vendor

Edit `js/vendors.js` and push an object into the `VENDORS` array:

```js
{
  id: "vendor-001",
  name: "Business Name",
  description: "Short description of the business.",
  location: "City, Country",
  phone: "+00 000 0000000",
  website: "https://example.com",
  image: "assets/images/vendors/vendor-001.jpg",
  social: {
    instagram: "https://instagram.com/example",
    facebook: "https://facebook.com/example",
    whatsapp: "https://wa.me/00000000000"
  }
}
```

1. Place the shop photograph in `assets/images/vendors/`
2. Use **real** business details only — do not invent vendors
3. Leave `image: ""` to show a temporary “Vendor photograph forthcoming” placeholder
4. Save the file — the gallery re-renders automatically (no HTML/CSS edits needed)

Until vendors are added, the section shows a clear empty state.

---

## Contact form

The form validates name, email, and message in the browser.  
It does **not** send email until you connect a service (Formspree, EmailJS, or a custom backend).

---

## External image sources & licensing

| Asset | Source | License / note |
| --- | --- | --- |
| Hero & product photographs in `assets/images/` | [Unsplash](https://unsplash.com) editorial product photos | [Unsplash License](https://unsplash.com/license) — free to use |
| Category images | Reused from product photographs | Same as products |
| Fonts (Playfair Display, DM Sans) | [Google Fonts](https://fonts.google.com) | SIL Open Font License |

Replace the hero background anytime by overwriting `assets/images/hero/hero-grooming-atmosphere.jpg` (product / atmosphere image preferred — no groom photo).

---

## Branding checklist

- Navbar brand: **NandN International**
- Subtitle: **Dr. Nadeem Nazir & Associates**
- Footer credits + Diginix IT link (`https://diginixit.com/` · `target="_blank"` · `rel="noopener noreferrer"`)
- Copyright: © 2026 NandNInternational

---

## Designed & developed by

[Diginix IT](https://diginixit.com/)
