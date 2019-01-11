export const updateColor = (accent, $el) => {
  const docStyle = window.getComputedStyle($el, null);
  const [color, bg] = accent
    ? [
        docStyle.getPropertyValue("--show-more-accent"),
        docStyle.getPropertyValue("--show-more")
      ]
    : [
        docStyle.getPropertyValue("--welcome-accent"),
        docStyle.getPropertyValue("--welcome")
      ];

  document
    .querySelector("meta[name=theme-color]")
    .setAttribute("content", color);
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty("--bg", bg);
};
