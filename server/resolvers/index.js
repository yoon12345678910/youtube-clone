const path = require('path');
const mergeGraphqlSchemas = require('merge-graphql-schemas');
const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeResolvers = mergeGraphqlSchemas.mergeResolvers;

const typesArray = fileLoader(path.join(__dirname, '.'), { recursive: true });

module.exports = mergeResolvers(typesArray, { all: true });