const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341',
        description: 'Project API Doc'
    },
    host: "testproj3.onrender.com",
    schemes: ["https"]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);