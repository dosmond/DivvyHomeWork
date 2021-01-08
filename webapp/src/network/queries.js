import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
    {
      transactions {
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
    }
`

export const GET_MERCHANT = gql`
  {
    merchants {
        id
        name
    }
  }
`
