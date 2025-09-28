import { initTheme } from "./theme.js";
import { initLang } from "./lang.js";

// DOM is already parsed at this point, safe to run immediately
initTheme();
initLang("en");
