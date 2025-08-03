import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend Next.js and TypeScript recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Your custom rules
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/quotes": "off",
      quotes: [0], // 0 = off
      "no-useless-escape": 0,
    },
  },
];
