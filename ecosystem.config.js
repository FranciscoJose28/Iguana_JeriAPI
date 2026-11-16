module.exports = {
  apps: [
    {
      name: "api",
      script: "./src/index.js",   // ajuste para o seu arquivo de entrada
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};