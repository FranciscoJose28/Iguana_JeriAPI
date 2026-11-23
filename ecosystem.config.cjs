module.exports = {
  apps: [
    {
      name: "api",
      script: "./index.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};