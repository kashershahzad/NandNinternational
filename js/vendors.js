/**
 * NandN International — Vendor Directory Data
 *
 * HOW TO ADD A NEW VENDOR:
 * 1. Add a vendor photograph to: assets/images/vendors/
 * 2. Copy the object template below and fill in real details only
 * 3. Save this file — the gallery updates automatically
 *
 * Do not invent business names, contacts, or locations.
 * Leave fields as empty strings ("") if information is not yet available.
 * Set image to "" to show a temporary placeholder.
 */

const VENDORS = [
  // Example (keep commented until real data is ready):
  // {
  //   id: "vendor-001",
  //   name: "Business Name",
  //   description: "Short description of the business.",
  //   location: "City, Country",
  //   phone: "+00 000 0000000",
  //   website: "https://example.com",
  //   image: "assets/images/vendors/vendor-001.jpg",
  //   social: {
  //     instagram: "https://instagram.com/example",
  //     facebook: "https://facebook.com/example",
  //     whatsapp: "https://wa.me/00000000000"
  //   }
  // }
];

/**
 * Renders the vendor gallery into #vendor-grid.
 * Shows a polished empty state when no vendors are listed.
 */
function renderVendors(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  if (!Array.isArray(VENDORS) || VENDORS.length === 0) {
    container.innerHTML = `
      <div class="vendor-empty" role="status">
        <div class="vendor-empty__frame">
          <img
            src="assets/images/products/fragrance-luxury-cologne.jpg"
            alt="Featured men's grooming product photography"
            loading="lazy"
          />
          <span class="vendor-empty__label">Vendor photograph forthcoming</span>
        </div>
        <div class="vendor-empty__copy">
          <div class="vendor-empty__thumbs" aria-hidden="true">
            <img src="assets/images/products/skincare-cream-jar.jpg" alt="" loading="lazy" />
            <img src="assets/images/products/beard-oil-studio.jpg" alt="" loading="lazy" />
            <img src="assets/images/products/haircare-shampoo-bottle.jpg" alt="" loading="lazy" />
          </div>
          <h3>Vendors Coming Soon</h3>
          <p>
            Vendor listings will appear here once business photographs and
            contact details are provided. Add entries in
            <code>js/vendors.js</code> to publish them.
          </p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = VENDORS.map((vendor) => {
    const hasImage = vendor.image && vendor.image.trim() !== "";
    const imageBlock = hasImage
      ? `<img
          src="${escapeAttr(vendor.image)}"
          alt="${escapeAttr(vendor.name || "Vendor")} shop photograph"
          loading="lazy"
          class="vendor-card__img"
          data-fallback="vendor"
        />`
      : `<div class="vendor-card__placeholder" aria-hidden="true">
           <span>Vendor photograph forthcoming</span>
         </div>`;

    const website = vendor.website
      ? `<a href="${escapeAttr(vendor.website)}" class="vendor-card__link" target="_blank" rel="noopener noreferrer">Visit Website</a>`
      : "";

    const phone = vendor.phone
      ? `<a href="tel:${escapeAttr(vendor.phone.replace(/\s+/g, ""))}" class="vendor-card__meta">${escapeHtml(vendor.phone)}</a>`
      : "";

    const location = vendor.location
      ? `<p class="vendor-card__location">${escapeHtml(vendor.location)}</p>`
      : "";

    const social = buildSocialLinks(vendor.social);

    return `
      <article class="vendor-card" data-vendor-id="${escapeAttr(vendor.id || "")}">
        <div class="vendor-card__media">
          ${imageBlock}
          <div class="vendor-card__overlay"></div>
        </div>
        <div class="vendor-card__body">
          <h3 class="vendor-card__name">${escapeHtml(vendor.name || "Vendor")}</h3>
          ${location}
          <p class="vendor-card__desc">${escapeHtml(vendor.description || "")}</p>
          <div class="vendor-card__footer">
            ${phone}
            ${website}
            ${social}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function buildSocialLinks(social) {
  if (!social || typeof social !== "object") return "";

  const links = [];
  if (social.instagram) {
    links.push(
      `<a href="${escapeAttr(social.instagram)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>`
    );
  }
  if (social.facebook) {
    links.push(
      `<a href="${escapeAttr(social.facebook)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>`
    );
  }
  if (social.whatsapp) {
    links.push(
      `<a href="${escapeAttr(social.whatsapp)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>`
    );
  }

  return links.length
    ? `<div class="vendor-card__social">${links.join("")}</div>`
    : "";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, "&#39;");
}

window.NandNVendors = { VENDORS, renderVendors };
