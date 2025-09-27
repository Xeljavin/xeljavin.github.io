export async function initLang(defaultLang = "en") {
    const langBtn = document.getElementById("lang-btn");
    let currentLang = localStorage.getItem("lang") || defaultLang;

    async function loadLanguage(lang) {
        try {
            const res = await fetch(`assets/lang/${lang}.json`);
            const data = await res.json();

            // Update elements with data-key attribute
            document.querySelectorAll("[data-key]").forEach(el => {
                const key = el.getAttribute("data-key");
                if (data[key]) el.textContent = data[key];
            });

            currentLang = lang;
            localStorage.setItem("lang", lang);
        } catch (e) {
            console.error("Failed to load language:", lang, e);
        }
    }

    // Handle lang button click to show options
    langBtn.addEventListener("click", () => {
        const menu = document.getElementById("lang-menu");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    // Handle menu button clicks
    document.querySelectorAll("#lang-menu button").forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            loadLanguage(lang);
            document.getElementById("lang-menu").style.display = "none";
        });
    });

    // Load initial language
    await loadLanguage(currentLang);
}

