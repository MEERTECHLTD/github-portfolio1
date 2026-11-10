import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://sm.meertech.tech",
  trailingSlash: "never",
  build: { format: "directory", inlineStylesheets: "auto", assets: "_a" },
  compressHTML: true,
  markdown: { shikiConfig: { theme: "github-dark-dimmed" } },
});
