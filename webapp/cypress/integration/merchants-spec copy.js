/* eslint-disable no-undef */
describe('Transactions page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/merchants')
    cy.get('#delete-transactions').click()
    cy.wait(500)
  })

  it('Should be able to edit a transaction', () => {
    let random = Math.random().toString(36).substring(7)
    cy.get('#amount').clear().type('5.99')
    cy.get('#merchant').clear().type('Walmart{enter}')
    cy.get('#user').clear().type('Daniel Osmond{enter}')
    cy.get('#description').clear().type(random)
    cy.get('#radio-debit').click()

    cy.get('#add-transaction-submit').click()

    cy.wait(1000)

    cy.get('[data-cy="edit"]').last().click()

    cy.get('#edit-amount').clear().type('50.00')

    cy.get('#edit-transaction-submit').click()

    cy.wait(1000)

    cy.get('table').should('contain.text', '50.00')
  })

  it('Should be able to delete a transaction', () => {
    let random = Math.random().toString(36).substring(7)
    cy.get('#amount').clear().type('5.99')
    cy.get('#merchant').clear().type('Walmart{enter}')
    cy.get('#user').clear().type('Daniel Osmond{enter}')
    cy.get('#description').clear().type(random)
    cy.get('#radio-debit').click()

    cy.get('#add-transaction-submit').click()

    cy.wait(1000)

    cy.get('[data-cy="delete"]').last().click()
    cy.get('#delete-transaction-submit').click()

    cy.wait(1000)

    cy.get('table').should('not.contain.text', random)
  })

  it('Should show roman numerals when switch is flipped', () => {
    let random = Math.random().toString(36).substring(7)
    cy.get('#amount').clear().type('5.99')
    cy.get('#merchant').clear().type('Walmart{enter}')
    cy.get('#user').clear().type('Daniel Osmond{enter}')
    cy.get('#description').clear().type(random)
    cy.get('#radio-debit').click()

    cy.get('#add-transaction-submit').click()

    cy.wait(1000)

    cy.get('#roman-switch').click()

    cy.wait(500)

    cy.get('table').should('contain.text', '\u2164\u2160')
  })

  describe('Add Transaction component', () => {
    it('should clear fields on clicking cancel', () => {
      cy.get('#amount').clear().type('123123')
      cy.get('#merchant').clear().type('Walmart{enter}')
      cy.get('#user').clear().type('Daniel Osmond{enter}')
      cy.get('#description').clear().type('test')
      cy.get('#radio-debit').click()

      cy.get('#add-transaction-cancel').click()

      cy.get('#amount').should('have.value', '')
      cy.get('#merchant').should('have.value', '')
      cy.get('#description').should('have.value', '')
      cy.get('#radio-debit').should('not.be.checked', '')
    })

    it('Should be able to add a transacton', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#amount').clear().type('5.99')
      cy.get('#merchant').clear().type('Walmart{enter}')
      cy.get('#user').clear().type('Daniel Osmond{enter}')
      cy.get('#description').clear().type(random)
      cy.get('#radio-debit').click()

      cy.get('#add-transaction-submit').click()

      cy.wait(1000)
      cy.get('table').should('contain.text', random)
    })
  })
})
