const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.src = "assets/icons/light-theme.svg"; // show sun in dark mode
  } else {
    document.body.classList.remove("dark-mode");
    themeIcon.src = "assets/icons/dark-theme.svg"; // show moon in light mode
  }
  localStorage.setItem("theme", mode);
}

// Detect system preference
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Initialize theme
export function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // default to dark if no saved preference
    const systemTheme = getSystemTheme();
    setTheme(systemTheme || "dark");
  }

  themeBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  });
}

