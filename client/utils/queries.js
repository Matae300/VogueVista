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
query Categories {
  categories {
    _id
    name
  }
}`;