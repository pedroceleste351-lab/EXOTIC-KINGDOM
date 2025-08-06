// postcss.config.js - Correto
module.exports = {
  plugins: {
    tailwindcss: {}, // <--- ADICIONE ESTA LINHA
    autoprefixer: {},
  },
};
