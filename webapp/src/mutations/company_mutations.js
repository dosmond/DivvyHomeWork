import gql from 'graphql-tag'

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!, $available_credit: Integer!, $credit_line: Integer!) {
    createCompany(name: $name, available_credit: $available_credit, credit_line: $credit_line){
      id
    }
  }
`

export const EDIT_COMPANY = gql`
  mutation EditCompany($id: ID!, $name: String!, $available_credit: Integer!, $credit_line: Integer!) {
    updateCompany(id: $id, name: $name, available_credit: $available_credit, credit_line: $credit_line){
      id
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
