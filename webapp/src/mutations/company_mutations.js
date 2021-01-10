import gql from 'graphql-tag'

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!, $description: String!) {
    createCompany(name: $name, description: $description){
      id
      name
      description
    }
  }
`

export const EDIT_COMPANY = gql`
  mutation EditCompany($id: ID!, $name: String!, $description: String!) {
    updateCompany(id: $id, name: $name, description: $description){
      id
      name
      description
    }
  }
`

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id){
      id
    }
  }
`
