const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  cart: Cart!
  orders: [Order!]!
}

type Product {
  _id: ID!
  productName: String!
  description: String!
  price: Float!
  size: [String!]!
  color: [String!]!
  stock: Int!
  image: String!
  rating: Float!
}

type Category {
  _id: ID!
  categoryName: String!
  products: [Product!]!
}

type Collect {
  _id: ID!
  collectName: String!
  products: [Product!]!
}

type Cart {
  _id: ID!
  user: User!
  items: [CartItem]!
}

type CartItem {
  product: Product!
  size: String!
  color: String!
  quantity: Int!
}

type Order {
  _id: ID!
  user: User!
  orderNumber: String!
  orderDate: String!
  cart: Cart!
  totalAmount: Float!
  stripePaymentId: String!
}

type Review {
  _id: ID!
  user: User!
  product: Product!
  rating: Float!
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
  productById(productById: ID!): Product
  orders: [Order]!
  orderById(id: ID!): Order
  getUserCart(userId: ID!): Cart
  categories: [Category]!
  categoryById(categoryById: ID!): Category
  collect: [Collect]!
  collectById(_id: ID!): Collect
  reviews: [Review]!
  reviewById(id: ID!): Review
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addProduct(
    productName: String!
    description: String
    price: Float!
    size: [String!]!
    color: [String!]!
    stock: Int!
    image: String!
    rating: Float!
  ): Product!
  updateProduct(
    id: ID!
    productName: String
    description: String
    price: Float
    size: [String!]!
    color: [String]
    stock: Int
    image: String
    rating: Float
  ): Product!
  deleteProduct(deleteProductId: ID!): Product
  removeProductToCategory(
    productId: ID!
    categoryId: ID!
  ): Product
  removeProductToCollect(
    productId: ID!
    collectId: ID!
  ): Product
  addProductToCategory(
    productId: ID!
    categoryId: ID!
  ): Product
  addProductToCollect(
    productId: ID!
    collectId: ID!
  ): Product
  addItemToCart(
    userId: ID!
    productId: ID!
    size: String!
    color: String!
    quantity: Int!
  ): Cart!
  removeItemFromCart(
    userId: ID!
    productId: ID!
  ): Cart!
  placeOrder(
    userId: ID!
    cartId: ID!
    orderNumber: String!
    orderDate: String!
    totalAmount: Float!
    stripePaymentId: String!
  ): Order!
  updateOrder(
    id: ID!
    totalAmount: Float
    stripePaymentId: String
  ): Order!
  deleteOrder(id: ID!): Order
  addCategory(categoryName: String!): Category!
  updateCategory(
    id: ID!
    categoryName: String!
  ): Category!
 deleteCategory(deleteCategoryId: ID!): Category
 addCollect(collectName: String!): Collect!
 updateCollect(
    id: ID!
    collectName: String!
  ): Collect!
  deleteCollect(deleteCollectId: ID!): Collect
  addReview(
    userId: ID!
    productId: ID!
    rating: Float!
  ): Review!
  updateReview(
    id: ID!
    rating: Float!
  ): Review!
  deleteReview(id: ID!): Review
}
`;

module.exports = typeDefs;
