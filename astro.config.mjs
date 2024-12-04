// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    icon({
      include: {
        mdi: ["*"],
      },
    }),
  ],
  site: "https://js-ts.ovfteam.com",
  build: {
    assets: "_ovftank",
    inlineStylesheets: "always",
    format: "directory",
  },
  output: "static",
  vite: {
    build: {
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  devToolbar: {
    enabled: true,
  },

  markdown: {
    smartypants: true,
    shikiConfig: {
      theme: "dracula",
      transformers: [
        {
          pre(node) {
            node.properties.style = "position: relative;";
          },
          code(node) {
            const className = node.properties.className;
            let lang = "";

            if (Array.isArray(className) && typeof className[0] === "string") {
              lang = className[0].split("-")[1] || "";
            } else if (typeof className === "string") {
              lang = className.split("-")[1] || "";
            }

            node.properties["data-language"] = lang;
          },
        },
      ],
    },
    syntaxHighlight: "shiki",
  },
});
