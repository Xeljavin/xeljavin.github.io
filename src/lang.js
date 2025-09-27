// src/lang.js
export async function initLang(defaultLang = "en") {
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  let currentLang = localStorage.getItem("lang") || defaultLang;

  async function loadLanguage(lang) {
    try {
      const res = await fetch(`assets/lang/${lang}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Update elements with data-lang-key attribute
      document.querySelectorAll("[data-lang-key]").forEach(el => {
        const key = el.getAttribute("data-lang-key");
        if (data[key] !== undefined) el.textContent = data[key];
      });

      // Update <title> if provided
      if (data.page_title) document.title = data.page_title;

      currentLang = lang;
      localStorage.setItem("lang", lang);
    } catch (e) {
      console.error("Failed to load language:", lang, e);
    }
  }

  // Toggle lang menu (safe guard)
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", () => {
      langMenu.style.display = langMenu.style.display === "flex" ? "none" : "flex";
    });
  }

  // Delegate clicks on the menu (works even if buttons are added later)
  if (langMenu) {
    langMenu.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-lang]");
      if (!btn) return;
      const lang = btn.dataset.lang;
      loadLanguage(lang);
      langMenu.style.display = "none";
    });
  }

  // Load selected language on init
  await loadLanguage(currentLang);
}
