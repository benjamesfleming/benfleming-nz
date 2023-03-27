import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from "rehype-external-links";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [mdx(), tailwind(), compress({ html: true, logger: 0 })],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank" }]
    ]
  }
});