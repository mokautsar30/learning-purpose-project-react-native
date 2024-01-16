//schema
const typeDefs = `#graphql
    type LoginResponse {
        token: String!
    }

    type User {
        _id: ID
        name: String!
        username: String!
        email: String!
        password: String!
    }
    
    input NewUser {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    type RegisterResponse {
        _id: ID
        username:String
        email: String
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type Query {
        GetUsers: [User]
        GetUserById(id:ID!): User
        GetUserByName(username:String): User
    }

    type Mutation {
        register(newUser: NewUser) : RegisterResponse
        login(loginInput: LoginInput) : LoginResponse


    }
`;


module.exports = typeDefs;
