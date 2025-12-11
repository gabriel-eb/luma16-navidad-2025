import restart from "vite-plugin-restart";
import glsl from "vite-plugin-glsl";

export default {
  root: "src/",
  publicDir: "../static/",
  base: "/luma16-navidad-2025/",
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [restart({ restart: ["../static/**"] }), glsl()],
};
