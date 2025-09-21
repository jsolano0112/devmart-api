import swaggerAutogen from 'swagger-autogen';
const outputFile = './swagger.json';
const endpointsFiles = ['./app.ts'];
const doc = {
  info: {
    title: 'DevMart - API',
    description:
      'API for an e-commerce platform with real-time shipment tracking',
  },
  host: 'localhost:3000',
  scheme: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
