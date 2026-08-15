const categoryIcons = {
  "Eisenbahn": "🚆",
  "ÖPNV": "🚊",
  "Baustellen": "🏗️",
  "Meldungen": "📢",
  "Bus": "🚌",
  "Bahnhöfe": "🚉",
  "Fotografie": "📸",
  "Fahrplan & Verkehr": "🎫",
  "Veranstaltungen": "📅",
  "Baden-Württemberg": "📍",
  "Murgtalbahn": "⛰️"
};

function formatDate(date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(date + "T12:00:00"));
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getImage(post) {
  return post.image || "images/beispiel-zug.jpg";
}

function postCard(post) {
  return `
    <article class="post-card">
      <a href="artikel.html?id=${encodeURIComponent(post.id)}" class="post-image-wrap">
        <img src="${getImage(post)}" alt="${post.title}" onerror="this.src='images/placeholder.svg'">
      </a>
      <div class="post-body">
        <div class="post-meta">
          <span class="tag">${categoryIcons[post.category] || "📰"} ${post.category}</span>
          <span>${formatDate(post.date)}</span>
        </div>
        <h3><a href="artikel.html?id=${encodeURIComponent(post.id)}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <a class="read-more" href="artikel.html?id=${encodeURIComponent(post.id)}">Artikel lesen →</a>
      </div>
    </article>
  `;
}

function setupMenu() {
  const button = document.getElementById("menuButton");
  const nav = document.getElementById("mainNav");
  if (!button || !nav) return;
  button.addEventListener("click", () => nav.classList.toggle("open"));
}

function renderHome() {
  const grid = document.getElementById("postGrid");
  if (!grid) return;

  const filters = document.getElementById("filters");
  const categories = ["Alle", ...new Set(posts.flatMap(p => p.categories || [p.category]))];

  filters.innerHTML = categories.map((cat, i) =>
    `<button class="filter ${i === 0 ? "selected" : ""}" data-category="${cat}">${cat}</button>`
  ).join("");

  const important = posts.find(p => p.important);
  const importantBox = document.getElementById("importantBox");
  if (important && importantBox) {
    importantBox.innerHTML = `
      <a href="artikel.html?id=${important.id}" class="important-inner">
        <span class="important-label">🔵 Interessant</span>
        <strong>${important.title}</strong>
        <span>Artikel lesen →</span>
      </a>`;
  }

  function show(category) {
    const filtered = category === "Alle"
      ? posts
      : posts.filter(p => (p.categories || [p.category]).includes(category));
    grid.innerHTML = filtered.map(postCard).join("");
    document.getElementById("emptyState").hidden = filtered.length !== 0;
  }

  filters.addEventListener("click", e => {
    if (!e.target.matches(".filter")) return;
    filters.querySelectorAll(".filter").forEach(b => b.classList.remove("selected"));
    e.target.classList.add("selected");
    show(e.target.dataset.category);
  });

  show("Alle");

  const categoryGrid = document.getElementById("categoryGrid");
  if (categoryGrid) {
    const all = [...new Set(posts.flatMap(p => p.categories || [p.category]))];
    categoryGrid.innerHTML = all.map(cat => `
      <button class="category-card" data-category="${cat}">
        <span>${categoryIcons[cat] || "📰"}</span>
        <strong>${cat}</strong>
      </button>
    `).join("");
    categoryGrid.addEventListener("click", e => {
      const card = e.target.closest(".category-card");
      if (!card) return;
      document.querySelector(`[data-category="${CSS.escape(card.dataset.category)}"]`)?.click();
      document.getElementById("meldungen").scrollIntoView({ behavior: "smooth" });
    });
  }
}

function renderArticle() {
  const target = document.getElementById("articlePage");
  if (!target) return;

  const id = new URLSearchParams(location.search).get("id");
  const post = posts.find(p => String(p.id) === String(id)) || posts[0];

  if (!post) {
    target.innerHTML = `<div class="container section"><h1>Artikel nicht gefunden</h1><a class="button" href="index.html">Zur Startseite</a></div>`;
    return;
  }

  document.title = `${post.title} – Eisenbahn-News Baden-Württemberg`;
  target.innerHTML = `
    <article class="article">
      <div class="article-hero">
        <img src="${getImage(post)}" alt="${post.title}" onerror="this.src='images/placeholder.svg'">
        <div class="article-hero-overlay">
          <span class="tag">${categoryIcons[post.category] || "📰"} ${post.category}</span>
          <h1>${post.title}</h1>
        </div>
      </div>
      <div class="container article-content">
        <div class="article-meta">${formatDate(post.date)} · ${post.author || "Redaktion"}</div>
        <div class="article-text">${post.content}</div>
        <div class="article-tags">
          ${(post.categories || [post.category]).map(c => `<span class="tag">${c}</span>`).join("")}
        </div>
        <a class="back-link" href="index.html#meldungen">← Zurück zu den Meldungen</a>
      </div>
    </article>
  `;
}

document.getElementById("year")?.append(new Date().getFullYear());
setupMenu();
renderHome();
renderArticle();
