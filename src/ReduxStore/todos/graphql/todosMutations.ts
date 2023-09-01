import { gql } from 'graphql-request'

export const CreateTodo = gql`
  mutation CreateTodo($data: TodoInput!) {
    createTodo(data: $data) {
      data {
        id
        attributes {
          text
          targetCycles
          currentCycles
        }
      }
    }
  }
`

export const DeleteTodo = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      data {
        id
        attributes {
          text
          targetCycles
          currentCycles
        }
      }
    }
  }
`

export const UpdateTodo = gql`
  mutation UpdateTodo($id: ID!, $data: TodoInput!) {
    updateTodo(id: $id, data: $data) {
      data {
        id
        attributes {
          text
          targetCycles
          currentCycles
        }
      }
    }
  }
`
