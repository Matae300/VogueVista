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

export const QUERY_CATEGORIES = gql`
query Category {
  categories {
    _id
    categoryName
  }
}`

export const QUERY_CATEGORIESBYID = gql`
query CategoryById($categoryByIdId: ID!) {
  categoryById(id: $categoryByIdId) {
    _id
    categoryName
    products {
      _id
    }
  }
}`;