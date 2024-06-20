import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
  }
}`

export const QUERY_PRODUCTS = gql`
query Products {
  products {
    _id
    productName
    price
    size
    color
    stock
    image
    rating
  }
}`

export const QUERY_CATEGORIES = gql`
query Category {
  categories {
    _id
    categoryName
  }
}`

export const QUERY_USERCART = gql`
query GetUserCart($userId: ID!) {
  getUserCart(userId: $userId) {
    items {
      product {
        _id
      }
      color
      quantity
      size
    }
  }`

export const QUERY_PRODUCTBYID = gql`
query ProductById($productById: ID!) {
  productById(productById: $productById) {
    _id
    productName
    price
    size
    color
    stock
    image
    rating
  }
}`

export const QUERY_CATEGORIESBYID = gql`
query CategoryById($categoryById: ID!) {
  categoryById(categoryById: $categoryById) {
    _id
    categoryName
    products {
      _id
      productName
      price
      stock
      rating
      size
      image
      color
    }
  }
}`;