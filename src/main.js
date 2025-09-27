import { initTheme } from "./theme.js";
import { initLang } from "./lang.js";

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLang("en"); // default language
});
