const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        title: String!
        link: String
    }
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]

    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        test: Int
    }
    type Mutation {
createUser(username: String!, email: String!, password: String!): Auth

}
;`

module.exports = typeDefs;