/* eslint-disable no-undef */
describe('Users page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/users')
  })

  it('Should be able to edit a user', () => {
    let random = Math.random().toString(36).substring(7)
    cy.get('#add-firstName').clear().type(random)
    cy.get('#add-lastName').clear().type('tester')
    cy.get('#dob').clear({ force: true }).type('2010-01-12{enter}')

    cy.get('#add-user-submit').click()

    cy.wait(1000)

    cy.get('[data-cy="edit"]').last().click()
    random = Math.random().toString(36).substring(7)
    cy.get('#edit-firstName').clear().type(random)

    cy.get('#edit-user-submit').click()

    cy.wait(1000)

    cy.get('table').should('contain.text', random)
  })

  describe('Add User component', () => {
    it('should clear fields on clicking cancel', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#add-firstName').clear().type(random)
      cy.get('#add-lastName').clear().type('tester')
      cy.get('#dob').clear({ force: true }).type('2010-01-12{enter}')

      cy.get('#add-user-cancel').click()

      cy.get('#add-firstName').should('have.value', '')
      cy.get('#add-lastName').should('have.value', '')
      cy.get('#dob').should('have.value', '')
    })

    it('Should be able to add a user', () => {
      let random = Math.random().toString(36).substring(7)
      cy.get('#add-firstName').clear().type(random)
      cy.get('#add-lastName').clear().type('tester')
      cy.get('#dob').clear({ force: true }).type('2010-01-12{enter}')

      cy.get('#add-user-submit').click()

      cy.wait(1000)
      cy.get('table').should('contain.text', random)
    })
  })
})
