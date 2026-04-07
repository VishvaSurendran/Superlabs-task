const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SuperLabs E-commerce API',
            version: '1.0.0',
        },
        paths: {
            '/api/products': {
                get: {
                    summary: 'Search products',
                    parameters: [
                        { name: 'q', in: 'query', schema: { type: 'string' } },
                        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } }
                    ],
                    responses: { 200: { description: 'Success' } }
                },
                post: {
                    summary: 'Admin - Create product',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        price: { type: 'number' },
                                        sku: { type: 'string' },
                                        availability: { type: 'boolean' },
                                        reviews: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    user: { type: 'string' },
                                                    rating: { type: 'integer' },
                                                    comment: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: { 201: { description: 'Created' } }
                }
            },
            '/api/products/{sku}': {
                get: {
                    summary: 'Get product detail',
                    parameters: [
                        { name: 'sku', in: 'path', required: true, schema: { type: 'string' } }
                    ],
                    responses: { 200: { description: 'Success' } }
                }
            }
        }
    },
    apis: [], 
};

module.exports = swaggerJsdoc(options);