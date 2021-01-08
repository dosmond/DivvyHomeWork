/* eslint-disable no-undef */
describe('Transactions page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/transactions')
  })

  it('Should be able to edit a transaction', () => {

  })

  it('Should be able to delete a transaction', () => {

  })

  describe('Add Transaction component', () => {
    it('should clear fields on clicking cancel', () => {
      cy.get('#amount').clear().type('123123')
      cy.get('#merchant').clear().type('Walmart')
      cy.get('#user').select('Daniel Osmond')
      cy.get('#description').clear().type('test')
      cy.get('#radio-debit').click()

      cy.get('#add-transaction-cancel').click()

      cy.get('#amount').should('have.value', '')
      cy.get('#merchant').should('have.value', '')
      cy.get('#description').should('have.value', '')
      cy.get('#radio-debit').should('not.be.checked', '')
    })

    it.only('Should be able to add a transacton', () => {
      cy.get('#amount').clear().type('5.99')
      cy.get('#merchant').clear().type('Walmart{enter}')
      cy.get('#user').clear().type('Daniel Osmond{enter}')
      cy.get('#description').clear().type('test')
      cy.get('#radio-debit').click()

      cy.get('#add-transaction-submit').click()

      cy.wait(1000)
    })
  })
})
