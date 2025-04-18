import EnvironmentPlugin from "vite-plugin-environment";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), EnvironmentPlugin("all")],
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "./src/"),
            "@hooks": path.resolve(__dirname, "./src/hooks/"),
            "@client": `${path.resolve(__dirname, "./src/clientfolder/")}`,
            "@modules": `${path.resolve(__dirname, "./src/modules/")}`,
            "@features": `${path.resolve(
                __dirname,
                "./src/modules/features/"
            )}`,
            "@rsc": `${path.resolve(__dirname, "./src/resource/")}`,
            "@moduleRoot": `${path.resolve(__dirname, "./src/modules/root/")}`,
            "@supaFuncs": `${path.resolve(__dirname, "./supabase/functions/")}`,
            "@netlFuncs": `${path.resolve(__dirname, "./netlify/functions/")}`,
        },
    },
});
