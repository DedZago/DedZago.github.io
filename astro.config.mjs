// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";

const isDev = process.env.NODE_ENV !== "production";

// Keystatic is only used in dev mode (local CMS editor).
// Production builds are fully static for GitHub Pages.
const devIntegrations = isDev
  ? [(await import("@keystatic/astro")).default()]
  : [];

// https://astro.build/config
export default defineConfig({
  site: "https://dedzago.github.io",

  integrations: [react(), markdoc(), ...devIntegrations],

  output: isDev ? "server" : "static",

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@keystatic/core", "@keystatic/astro"],
    },
    build: {
      target: "es2022",
    },
  },

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },

  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },
});
