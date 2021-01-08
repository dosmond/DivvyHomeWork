import gql from 'graphql-tag'

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction ($amount: Float!, $credit: Boolean!, $debit: Boolean!, $description: String!, $userId: ID!, $merchantId: ID!) {
    createTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, userId: $userId, merchantId: $merchantId) {
      id
      amount
      credit
      debit
      description
    }
  }
`
