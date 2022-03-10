const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    test: string
}
`;

module.exports = typeDefs;
