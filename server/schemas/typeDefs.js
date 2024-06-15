const typeDefs = `

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
}

type Product {
  _id: ID!
  description: String!
  price: Int!
  category: Category!
  size: String!
  color: String!
  stock: Int!
  image: String!
  rating: Int!
}

type Order {
  _id: ID!
  products: [Product]!
}

type Category {
  _id: ID!
  name: String!
}

type Review {
  _id: ID!
  user: User!
  product: Product!
  rating: Int!
}

type Auth {
  token: ID!
  user: User!
}

type Query {
  users: [User]!
  user(username: String!): User
  me: User
  products: [Product]!
  product(id: ID!): Product
  orders: [Order]!
  order(id: ID!): Order
  categories: [Category]!
  category(id: ID!): Category
  reviews: [Review]!
  review(id: ID!): Review
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addProduct(description: String!, price: Int!, category: ID!, size: String!, color: String!, stock: Int!, image: String!, rating: Int!): Product
  addOrder(products: [ID!]!): Order
  addCategory(name: String!, description: String, image: String): Category
  addReview(user: ID!, product: ID!, name: String!, rating: Int!): Review
}
`;

module.exports = typeDefs;
