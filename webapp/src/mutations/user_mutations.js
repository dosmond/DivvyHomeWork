import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $dob: String!) {
    createUser(firstName: $firstName, lastName: $lastName, dob: $dob){
      id
      firstName
      lastName
      dob
    }
  }
`

export const EDIT_USER = gql`
  mutation EditUser($id: ID!, $firstName: String!, $lastName: String!, $dob: String!) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, dob: $dob){
      id
      firstName
      lastName
      dob
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id){
      id
    }
  }
`
