/** @type {import("prettier").Config} */
const config = {
  // see https://github.com/withastro/prettier-plugin-astro
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  // custom rules
  quoteProps: "consistent",
  trailingComma: "all",
};

module.exports = config;
