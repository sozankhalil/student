import swaggerJSDoc from "swagger-jsdoc";

const option = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "student manager app",
      description: "an application to manage students",
      version: "1.0.0",
    },
  },
  servers: [{ url: "http://localhost:4000" }],
  apis: ["./routes/*.js"],
};

export const swaggerSpecs = swaggerJSDoc(option);
