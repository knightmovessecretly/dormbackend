const swaggerJsDoc = require("swagger-jsdoc");
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'http://173.208.142.58:10081';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation",
    },
    
    servers: [
      {
        url: API_URL,
      },
    ],
  },
  apis: ["./routes/*.js"], // location of route files
};

module.exports = swaggerJsDoc(options);