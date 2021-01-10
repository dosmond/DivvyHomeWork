import gql from 'graphql-tag'

export const CREATE_MERCHANT = gql`
  mutation CreateMerchant($name: String!, $description: String!) {
    createMerchant(name: $name, description: $description){
      id
      name
      description
    }
  }
`

export const EDIT_MERCHANT = gql`
  mutation EditMerchant($id: ID!, $name: String!, $description: String!) {
    updateMerchant(id: $id, name: $name, description: $description){
      id
      name
      description
    }
  }
`

export const DELETE_MERCHANT = gql`
  mutation DeleteMerchant($id: ID!) {
    deleteMerchant(id: $id){
      id
    }
  }
`
