const typeDefs = `

type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Product {
}

type Order {
}

type Category {
}

type Review {
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  me: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;