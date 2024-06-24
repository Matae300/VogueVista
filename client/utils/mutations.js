import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      username
    }
  }
}`;

export const REMOVE_ITEM_FROM_CART = gql`
mutation RemoveItemFromCart($userId: ID!, $productId: ID!) {
  removeItemFromCart(userId: $userId, productId: $productId) {
    _id
  }
}`;

export const ADDITEMTOCART = gql`
mutation AddItemToCart($userId: ID!, $productId: ID!, $size: String!, $color: String!, $quantity: Int!) {
  addItemToCart(userId: $userId, productId: $productId, size: $size, color: $color, quantity: $quantity) {
    _id
    items {
      product {
        _id
        productName
        description
        price
        size
        color
        stock
        image
        rating
      }
      size
      color
      quantity
    }
  }
}`

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
    }
  }
}`;