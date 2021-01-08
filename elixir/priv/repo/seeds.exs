# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Homework.Transactions
alias Homework.Users
alias Homework.Merchants


users = [
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1234"
    first_name: "Daniel",
    last_name: "Osmond",
    dob: "09/04/1996"
  },
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1235"
    first_name: "Elon",
    last_name: "Musk",
    dob: "06/28/1971"
  },
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1236"
    first_name: "Jeff",
    last_name: "Bezos",
    dob: "01/12/1964"
  }
];

merchants = [
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1237"
    name: "Walmart",
    description: "#peopleofwalmart"
  },
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1238"
    name: "Tesla",
    description: "It's a truck, not a lunchbox"
  },
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1239"
    name: "Amazon",
    description: "#NotSkynet"
  },
  {
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa3214"
    name: "Swig",
    description: "So freaking good"
  }
]

transactions = [
  {
    amount: 5.99,
    credit: false,
    debit: true,
    description: "Best SWIG",
    merchant_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1238",
    user_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1239"
  },
  {
    amount: 64500.00,
    credit: true,
    debit: false,
    description: "Lunchbox",
    merchant_id: "b20a7ce9-684e-4ff4-86a4-dce38efa3214",
    user_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1234"
  },
  {
    amount: 1000000000.00,
    credit: true,
    debit: false,
    description: "Most expensive item on amazon because why not",
    merchant_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1239",
    user_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1236"
  }
]

Enum.each(users, fn(user) => {
  Homework.Repo.insert! %Users{
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    dob: user.dob
  }
})

Enum.each(merchants, fn(merchant) => {
  Homework.Repo.insert! %Merchants{
    id: merchant.id,
    name: merchant.name,
    description: merchant.description
  }
})


Enum.each(transactions, fn(transaction) => {
  Homework.Repo.insert! %Transactions{
    amount: transaction.amount,
    credit: transaction.credit,
    debit: transaction.debit,
    description: transaction.description,
    merchant_id: transaction.merchant_id,
    user_id: transaction.user_id
  }
})
