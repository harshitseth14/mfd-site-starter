import { defineConfig } from "vitest/config";

/** Unit tests for the new site's own logic (run: npx vitest run --config site/vitest.config.ts). */
export default defineConfig({
  test: { root: __dirname, include: ["**/*.test.ts"], exclude: ["node_modules/**", ".next/**"] },
});
