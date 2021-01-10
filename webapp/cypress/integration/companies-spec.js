/* eslint-disable no-undef */
describe('Companies page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/companies')
  })

  it('Should be able to edit a company', () => {
    let random = Math.random().toString(36).substring(7)
    cy.get('#add-name').clear().type(random)
    cy.get('#add-credit-line').clear().type(1000)

    cy.get('#add-company-submit').click()

    cy.wait(1000)

    cy.get('[data-cy="edit"]').first().click()
    random = Math.random().toString(36).substring(7)
    cy.get('#edit-name').clear().type(random)

    cy.get('#edit-company-submit').click()

    cy.wait(1000)

    cy.get('table').should('contain.text', random)
  })

  describe('Add Company component', () => {
    it('should clear fields on clicking cancel', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#add-name').clear().type(random)
      cy.get('#add-credit-line').clear().type(1000)

      cy.get('#add-company-cancel').click()

      cy.wait(1000)

      cy.get('#add-name').should('have.value', '')
      cy.get('#add-credit-line').should('have.value', '')
    })

    it('Should be able to add a company', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#add-name').clear().type(random)
      cy.get('#add-credit-line').clear().type(1000)

      cy.get('#add-company-submit').click()

      cy.wait(1000)

      cy.get('table').should('contain.text', random)
    })
  })
})
