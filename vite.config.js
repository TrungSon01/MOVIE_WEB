import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Cho phép truy cập từ IP LAN
    port: 5173,
    allowedHosts: [
      "3a4e-14-231-180-177.ngrok-free.app", // Thêm domain ngrok vào đây
      "localhost",
      "127.0.0.1",
    ],
  },
});
