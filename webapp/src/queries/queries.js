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

export const GET_MERCHANTS = gql`
  {
    merchants {
        id
        name
        description
        insertedAt
    }
  }
`

export const GET_USERS = gql`
  {
    users {
        id
        firstName
        lastName
        dob
        insertedAt
    }
  }
`

export const GET_MERCHANTS_AND_USERS = gql`
  {
    merchants {
      id
      name
    },
    users {
        id
        firstName
        lastName
    }
  }
`
