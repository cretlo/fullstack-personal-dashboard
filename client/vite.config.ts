/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          process.env.VITE_PROXY_STRING ||
          "http://planner-api.ianreimers.com:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
//import.meta.env.VITE_PROXY_STRING
