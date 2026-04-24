import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    rollupOptions: {
      input: {
        index: "index.html",
        app: "app.html",
        done: "done.html",
        form: "form.html",
      },
    },
  },
});

