import { gql } from 'graphql-request'

export const GetTodos = gql`
  query GetTodos {
    todos {
      data {
        id
        attributes {
          text
          currentCycles
          targetCycles
        }
      }
    }
  }
`
