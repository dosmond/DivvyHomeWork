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
          company {
            id
            name
            available_credit
            credit_line
          }
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
        company{
          id
          name
          available_credit
          credit_line
        }
        insertedAt
    }
  }
`

export const GET_COMPANIES = gql`
  {
    companies {
        id
        name
        credit_line
        available_credit
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
        company {
          id
          name
          available_credit
          credit_line
        }
    }
  }
`
