/* eslint-disable no-undef */
describe('Merchants page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/merchants')
  })

  it('Should be able to edit a merchant', () => {
    let random = Math.random().toString(36).substring(7)
    cy.get('#add-name').clear().type(random)
    cy.get('#add-description').clear().type('tester')

    cy.get('#add-merchant-submit').click()

    cy.wait(1000)

    cy.get('[data-cy="edit"]').first().click()
    random = Math.random().toString(36).substring(7)
    cy.get('#edit-name').clear().type(random)

    cy.get('#edit-merchant-submit').click()

    cy.wait(1000)

    cy.get('table').should('contain.text', random)
  })

  describe('Add Merchant component', () => {
    it('should clear fields on clicking cancel', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#add-name').clear().type(random)
      cy.get('#add-description').clear().type('tester')

      cy.get('#add-merchant-cancel').click()

      cy.get('#add-name').should('have.value', '')
      cy.get('#add-description').should('have.value', '')
    })

    it('Should be able to add a merchant', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#add-name').clear().type(random)
      cy.get('#add-description').clear().type('tester')

      cy.get('#add-merchant-submit').click()

      cy.wait(1000)

      cy.get('table').should('contain.text', random)
    })
  })
})
