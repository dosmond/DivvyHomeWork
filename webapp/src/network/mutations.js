import gql from 'graphql-tag'

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction ($amount: Integer!, $credit: Boolean!, $debit: Boolean!, $description: String!, $userId: ID!, $merchantId: ID!) {
    createTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, userId: $userId, merchantId: $merchantId) {
      id
      amount
      credit
      debit
      description
    }
  }
`

export const EDIT_TRANSACTION = gql`
  mutation UpdateTransaction ($id: ID!, $amount: Integer!, $credit: Boolean!, $debit: Boolean!, $description: String!, $userId: ID!, $merchantId: ID!) {
    updateTransaction(id: $id, amount: $amount, credit: $credit, debit: $debit, description: $description, userId: $userId, merchantId: $merchantId) {
      id
      amount
      credit
      debit
      description
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id){
      id
    }
  }
`

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
    updateUser(id: $id, firstName: $name, lastName: $description, dob: $dob){
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
