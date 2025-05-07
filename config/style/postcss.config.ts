import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "config/style/tailwind.config";

export default {
  plugins: [tailwindcss(tailwindConfig), autoprefixer],
};
