import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Iguana-Jeri',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './src/docs/documentacao.json';
const routes = ['../../index.js'];

swaggerAutogen()(outputFile, routes, doc);