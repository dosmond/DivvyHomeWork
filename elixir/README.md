# Homework

This contains the backend server for the Divvy Homework project. Running the setup script will also seed the database. There is a schema for Users, Merchants, Transactions, and Companies.

## To Setup

You will need to have postgres running.
The easiest way to install postgres is through brew:
`brew install postgres`

Expected username and password are:

    Username: postgres

    Password: postgres

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Your server will be running @ [`localhost:8000`](http://localhost:8000).
You can use [`localhost:8000/graphiql`](http://localhost:8000/graphiql) to make basic graphql queries from your browser.


## To Run Tests

    mix test
