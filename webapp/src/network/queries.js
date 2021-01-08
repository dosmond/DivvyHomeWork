import { gql } from 'apollo-client'

export const GET_TRANSACTIONS = gql`
    query transactions {
        id
        amount
        credit
        debit
        description
        insertedAt
        merchant {
          id
          name
        }
        updatedAt
        user {
          id
          firstName
          lastName
        }
    }
`
