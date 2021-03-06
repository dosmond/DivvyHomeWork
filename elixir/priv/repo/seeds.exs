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
alias Homework.Transactions.Transaction
alias Homework.Users.User
alias Homework.Merchants.Merchant
alias Homework.Companies.Company

companies = [
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38e123456",
    name: "Divvy",
    available_credit: 9999301,
    credit_line: 9999900
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38e123654",
    name: "Amazon",
    available_credit: 0,
    credit_line: 9999900
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38e123987",
    name: "Tesla",
    available_credit: 3009900,
    credit_line: 9999900
  },
]


users = [
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1234",
    first_name: "Daniel",
    last_name: "Osmond",
    dob: "09/04/1996",
    company_id: "b20a7ce9-684e-4ff4-86a4-dce38e123456"
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1235",
    first_name: "Elon",
    last_name: "Musk",
    dob: "06/28/1971",
    company_id: "b20a7ce9-684e-4ff4-86a4-dce38e123987"
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1236",
    first_name: "Jeff",
    last_name: "Bezos",
    dob: "01/12/1964",
    company_id: "b20a7ce9-684e-4ff4-86a4-dce38e123654"
  }
];

merchants = [
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1237",
    name: "Walmart",
    description: "#peopleofwalmart"
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1238",
    name: "Tesla",
    description: "It's a truck, not a lunchbox"
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa1239",
    name: "Amazon",
    description: "#NotSkynet"
  },
  %{
    id: "b20a7ce9-684e-4ff4-86a4-dce38efa3214",
    name: "Swig",
    description: "So freaking good"
  }
]

transactions = [
  %{
    amount: -599,
    credit: false,
    debit: true,
    description: "Daily swig",
    merchant_id: "b20a7ce9-684e-4ff4-86a4-dce38efa3214",
    user_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1234"
  },
  %{
    amount: -6990000,
    credit: true,
    debit: false,
    description: "Lunchbox Truck",
    merchant_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1238",
    user_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1235"
  },
  %{
    amount: -9999900,
    credit: true,
    debit: false,
    description: "It's expensive because I can",
    merchant_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1239",
    user_id: "b20a7ce9-684e-4ff4-86a4-dce38efa1236"
  }
]

Enum.each(companies, fn(company) ->
  Homework.Repo.insert! %Company{
    id: company.id,
    credit_line: company.credit_line,
    available_credit: company.available_credit,
    name: company.name
  }
end)

Enum.each(users, fn(user) ->
  Homework.Repo.insert! %User{
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    company_id: user.company_id,
    dob: user.dob
  }
end)

Enum.each(merchants, fn(merchant) ->
  Homework.Repo.insert! %Merchant{
    id: merchant.id,
    name: merchant.name,
    description: merchant.description
  }
end)


Enum.each(transactions, fn(transaction) ->
  Homework.Repo.insert! %Transaction{
    amount: transaction.amount,
    credit: transaction.credit,
    debit: transaction.debit,
    description: transaction.description,
    merchant_id: transaction.merchant_id,
    user_id: transaction.user_id
  }
end )
