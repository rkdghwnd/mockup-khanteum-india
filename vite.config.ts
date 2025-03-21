import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    build: {
      commonjsOptions: {
        strictRequires: ["node_modules/aws-sdk/**/*.js"],
      },
    },
  },
  server: {
    port: 3000, // 포트번호 3000으로 변경
  },
});
