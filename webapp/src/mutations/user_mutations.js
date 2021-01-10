import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $dob: String!, $company_id: ID!) {
    createUser(firstName: $firstName, lastName: $lastName, dob: $dob, company_id: $company_id){
      id
    }
  }
`

export const EDIT_USER = gql`
  mutation EditUser($id: ID!, $firstName: String!, $lastName: String!, $dob: String!, $company_id: ID!) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, dob: $dob, company_id: $company_id){
      id
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
