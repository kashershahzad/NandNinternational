/**
 * NandN International — Featured Product Showcase Data
 *
 * Informational product photography for the directory (not an online store).
 * Detail pages read ?id= from the URL.
 */

const PRODUCTS = [
  {
    id: "noir-elixir",
    name: "Noir Elixir",
    category: "Fragrances",
    tagline: "Dark floral intensity for evening wear",
    description:
      "A refined men's fragrance photograph from the market — deep bottle glass, warm lighting, and a composition built for editorial vendor showcases.",
    image: "assets/images/products/fragrance-collection.jpg",
    gallery: [
      "assets/images/products/fragrance-collection.jpg",
      "assets/images/products/fragrance-luxury-cologne.jpg",
      "assets/images/categories/fragrances.jpg",
    ],
    notes: ["Citrus", "Cedar", "Amber wood"],
    format: "Eau de Parfum · Studio shot",
  },
  {
    id: "azure-cologne",
    name: "Azure Cologne",
    category: "Fragrances",
    tagline: "Cool, crisp citrus with aquatic depth",
    description:
      "Bright product photography highlighting a classic men's cologne silhouette — ideal for fragrance vendor listings and category features.",
    image: "assets/images/products/fragrance-luxury-cologne.jpg",
    gallery: [
      "assets/images/products/fragrance-luxury-cologne.jpg",
      "assets/images/products/fragrance-collection.jpg",
      "assets/images/categories/fragrances.jpg",
    ],
    notes: ["Citrus", "Marine", "Cedar"],
    format: "Eau de Toilette · Editorial crop",
  },
  {
    id: "amber-beard-oil",
    name: "Amber Beard Oil",
    category: "Beard Care",
    tagline: "Nourishing oil for a polished finish",
    description:
      "Clean studio photography of beard oil — soft highlights on glass, neutral backdrop, and a presentation suited to grooming brand directories.",
    image: "assets/images/products/beard-oil-studio.jpg",
    gallery: [
      "assets/images/products/beard-oil-studio.jpg",
      "assets/images/products/beard-grooming-care.jpg",
      "assets/images/products/grooming-product-flatlay.jpg",
    ],
    notes: ["Argan", "Jojoba", "Warm spice"],
    format: "30ml bottle · Soft box light",
  },
  {
    id: "clarity-serum",
    name: "Clarity Serum",
    category: "Skin Care",
    tagline: "Focused care for a clean complexion",
    description:
      "Dropper-bottle product photography with crisp glass detail — made for skincare suppliers and men's cosmetics market presentations.",
    image: "assets/images/products/skincare-dropper.jpg",
    gallery: [
      "assets/images/products/skincare-dropper.jpg",
      "assets/images/products/skincare-cream-jar.jpg",
      "assets/images/products/skincare-white-products.jpg",
    ],
    notes: ["Vitamin C", "Hyaluronic", "Niacinamide"],
    format: "Serum · Close product frame",
  },
  {
    id: "daily-cleanser",
    name: "Daily Cleanser",
    category: "Skin Care",
    tagline: "Everyday rinse for a fresh start",
    description:
      "Face-wash packaging captured in a bright, commercial still — useful for cleanser vendors and routine-focused directory pages.",
    image: "assets/images/products/skincare-face-wash.jpg",
    gallery: [
      "assets/images/products/skincare-face-wash.jpg",
      "assets/images/products/skincare-routine-bottles.jpg",
      "assets/images/products/skincare-cleanse-set.jpg",
    ],
    notes: ["Gentle foam", "Charcoal", "Mint"],
    format: "Cleanser · Pack shot",
  },
  {
    id: "barber-shampoo",
    name: "Barber Shampoo",
    category: "Hair Care",
    tagline: "Salon-inspired wash for daily use",
    description:
      "Hair-care bottle photography with strong vertical presence — suited to barber brands and hair-care supplier features.",
    image: "assets/images/products/haircare-shampoo-bottle.jpg",
    gallery: [
      "assets/images/products/haircare-shampoo-bottle.jpg",
      "assets/images/products/barber-grooming-tools.jpg",
      "assets/images/products/grooming-bathroom-ritual.jpg",
    ],
    notes: ["Mint", "Tea tree", "Keratin"],
    format: "Shampoo · Vertical product",
  },
  {
    id: "cream-ritual",
    name: "Cream Ritual",
    category: "Skin Care",
    tagline: "Rich moisture in a refined jar",
    description:
      "Premium cream jar still life with soft shadows — a quiet, luxury frame for moisturiser and treatment vendor showcases.",
    image: "assets/images/products/skincare-cream-jar.jpg",
    gallery: [
      "assets/images/products/skincare-cream-jar.jpg",
      "assets/images/products/skincare-white-products.jpg",
      "assets/images/products/skincare-dropper.jpg",
    ],
    notes: ["Shea", "Peptide", "Soft musk"],
    format: "Face cream · Still life",
  },
  {
    id: "signature-scent",
    name: "Signature Scent",
    category: "Fragrances",
    tagline: "Moody bottle work for premium lines",
    description:
      "Dark perfume photography with dramatic contrast — built for luxury fragrance vendors who need a strong hero visual.",
    image: "assets/images/categories/fragrances.jpg",
    gallery: [
      "assets/images/categories/fragrances.jpg",
      "assets/images/products/fragrance-collection.jpg",
      "assets/images/products/fragrance-luxury-cologne.jpg",
    ],
    notes: ["Leather", "Smoke", "Vetiver"],
    format: "Parfum · Low-key light",
  },
];

function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find((p) => p.id === id) || null;
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

/**
 * Renders compact product cards into a grid container.
 */
function renderProductCards(containerSelector, options) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const opts = options || {};
  const limit = typeof opts.limit === "number" ? opts.limit : PRODUCTS.length;
  const items = PRODUCTS.slice(0, limit);

  container.innerHTML = items
    .map((product, index) => {
      const delay =
        index % 4 === 0
          ? ""
          : ` reveal-delay-${(index % 4)}`;

      return `
      <article class="product-card reveal${delay}">
        <a class="product-card__link" href="product.html?id=${escapeAttr(product.id)}">
          <div class="product-card__media">
            <img
              src="${escapeAttr(product.image)}"
              alt="${escapeAttr(product.name)} product photography"
              loading="lazy"
              width="480"
              height="600"
            />
          </div>
          <div class="product-card__body">
            <p class="product-card__category">${escapeHtml(product.category)}</p>
            <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
            <p class="product-card__tagline">${escapeHtml(product.tagline)}</p>
            <span class="product-card__cta">View details</span>
          </div>
        </a>
      </article>`;
    })
    .join("");
}

/**
 * Renders the product detail page when #product-detail is present.
 */
function renderProductDetail(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get("id"));

  if (!product) {
    root.innerHTML = `
      <div class="container product-missing">
        <p class="section__eyebrow">Product</p>
        <h1 class="section__title">Product not found</h1>
        <p class="section__lead">
          This product is unavailable or the link is incomplete.
        </p>
        <a class="btn btn--gold" href="index.html#products">Back to products</a>
      </div>`;
    document.title = "Product Not Found | NandN International";
    return;
  }

  document.title = `${product.name} | NandN International`;

  const notes = (product.notes || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join("");

  const thumbs = (product.gallery || [product.image])
    .map(
      (src, i) => `
      <button
        type="button"
        class="product-detail__thumb${i === 0 ? " is-active" : ""}"
        data-src="${escapeAttr(src)}"
        aria-label="Show image ${i + 1}"
      >
        <img src="${escapeAttr(src)}" alt="" loading="lazy" />
      </button>`
    )
    .join("");

  const related = PRODUCTS.filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map(
      (p) => `
      <article class="product-card product-card--compact">
        <a class="product-card__link" href="product.html?id=${escapeAttr(p.id)}">
          <div class="product-card__media">
            <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" loading="lazy" />
          </div>
          <div class="product-card__body">
            <p class="product-card__category">${escapeHtml(p.category)}</p>
            <h3 class="product-card__name">${escapeHtml(p.name)}</h3>
          </div>
        </a>
      </article>`
    )
    .join("");

  root.innerHTML = `
    <section class="product-detail" aria-labelledby="product-name">
      <div class="container product-detail__layout">
        <div class="product-detail__gallery">
          <div class="product-detail__stage">
            <img
              id="product-main-image"
              src="${escapeAttr(product.image)}"
              alt="${escapeAttr(product.name)} product photography"
              width="720"
              height="900"
            />
          </div>
          <div class="product-detail__thumbs" role="group" aria-label="Product images">
            ${thumbs}
          </div>
        </div>

        <div class="product-detail__info">
          <p class="section__eyebrow">${escapeHtml(product.category)}</p>
          <h1 class="product-detail__title" id="product-name">${escapeHtml(product.name)}</h1>
          <p class="product-detail__tagline">${escapeHtml(product.tagline)}</p>
          <p class="product-detail__desc">${escapeHtml(product.description)}</p>

          <div class="product-detail__meta">
            <div>
              <span>Format</span>
              <p>${escapeHtml(product.format || "Product photography")}</p>
            </div>
            <div>
              <span>Profile notes</span>
              <ul class="product-detail__notes">${notes}</ul>
            </div>
          </div>

          <div class="product-detail__actions">
            <a class="btn btn--gold" href="index.html#contact">Enquire about listing</a>
            <a class="btn btn--ghost" href="index.html#products">All products</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt" aria-labelledby="related-title">
      <div class="container">
        <div class="section__header">
          <div>
            <p class="section__eyebrow">More from the market</p>
            <h2 class="section__title" id="related-title">Related products</h2>
          </div>
        </div>
        <div class="product-grid product-grid--related">
          ${related}
        </div>
      </div>
    </section>`;

  root.querySelectorAll(".product-detail__thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const main = document.getElementById("product-main-image");
      if (!src || !main) return;
      main.src = src;
      root.querySelectorAll(".product-detail__thumb").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });
    });
  });
}

window.NandNProducts = {
  PRODUCTS,
  getProductById,
  renderProductCards,
  renderProductDetail,
};
