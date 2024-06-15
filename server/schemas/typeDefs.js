const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
}

type Product {
  _id: ID!
  name: String!
  description: String
  price: Float!
  category: [Category]!
  size: String!
  color: [String!]!
  stock: Int!
  image: String!
  rating: Float!
}

type Order {
  _id: ID
  purchaseDate: String
  products: [Product]
}

type Category {
  _id: ID!
  name: String!
}

type Review {
  _id: ID!
  user: User!
  product: Product!
  rating: Float!
}

type Checkout {
  session: ID
}

type Auth {
  token: ID!
  user: User!
}

input ProductInput {
  _id: ID
  purchaseQuantity: Int
  name: String
  image: String
  price: Float
  quantity: Int
}


type Query {
  users: [User]!
  user(username: String!): User
  me: User
  products: [Product]!
  productById(id: ID!): Product
  orders: [Order]!
  orderById(id: ID!): Order
  categories: [Category]!
  categoryById(id: ID!): Category
  reviews: [Review]!
  reviewById(id: ID!): Review
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addOrder(products: [ID]!): Order
  updateUser(firstName: String, lastName: String, email: String, password: String): User
  updateProduct(_id: ID!, quantity: Int!): Product
  addReview(user: ID!, product: ID!, name: String!, rating: Int!): Review
  deleteReview(id: ID!): Review
}
`;

module.exports = typeDefs;
