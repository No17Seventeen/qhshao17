const root = document.documentElement;
const themeKey = "qhshao17-theme";
const languageKey = "qhshao17-language";

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.textContent = theme === "dark" ? "Light" : "Dark";
  });
}

function initTheme() {
  const saved = localStorage.getItem(themeKey);
  const initial = saved || root.dataset.theme || "light";
  setTheme(initial);
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector("#nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    links.classList.toggle("is-open", !open);
  });
}

function initLanguage() {
  document.querySelectorAll("[data-language-link]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem(languageKey, link.dataset.languageLink);
    });
  });
}

function initCopyEmail() {
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copyEmail;
      try {
        await navigator.clipboard.writeText(value);
        const original = button.textContent;
        button.textContent = document.body.dataset.lang === "zh" ? "已复制" : "Copied";
        setTimeout(() => {
          button.textContent = original;
        }, 1600);
      } catch {
        window.location.href = `mailto:${value}`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initLanguage();
  initCopyEmail();

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  });
});
