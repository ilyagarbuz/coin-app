describe('APP E2E', () => {
  it('should have a form for log in', () => {
    cy.visit('/');

    cy.get('#login').invoke('attr', 'placeholder').should('contain', 'Введите логин')
    cy.get('#password').invoke('attr', 'placeholder').should('contain', 'Введите пароль')
    cy.get('button').should('have.text', 'Войти');
  });

  it('submit button should be disabled', () => {
    cy.get('button').should('be.disabled');
  });

  it('inputs validation', () => {
    cy.get('#login').type('a').blur()
    cy.get('#password').type('a').blur()
    cy.get('button').should('be.disabled');
  });

  it('do not login with invalid credentials', () => {
    cy.get('#login').clear()
    cy.get('#password').clear()
    cy.get('#login').type('developers').blur()
    cy.get('#password').type('skillboxes').blur()
    cy.get('button').click()
    cy.get('.error-block').should('have.text', 'Не верный логин или пароль!')
  });

  it('login with correct credentials', () => {
    cy.get('#login').clear()
    cy.get('#password').clear()
    cy.get('#login').type('developer').blur()
    cy.get('#password').type('skillbox').blur()
    cy.get('button').click()
    cy.url().should('include', '/#accounts')
  });

  it('add new account', () => {
    // we do not know how many items are in the list
    // so first we need to find out and store this information
    let N = 0
    cy.get('.accounts__list li')
      .its('length')
      .then((n) => {
        N = n
        // we can even confirm there are a few items if needed
        expect(N).to.be.gt(0)
      })
    // now add an item
    cy.get('.accounts__new-account-button')
      .click()
      .then(() => {
        // by the time this callback runs the N value is set
        // and we can use it directly in the assertion
        cy.get('.accounts__list li').should('have.length', N + 1)
      })
  });

  it('transfer between accounts', () => {
    cy.get('.accounts__open-button').first().click()
    cy.get('#benefic-number').type('61253747452820828268825011').blur()
    cy.get('#transfer-sum').type('500').blur()
    cy.get('.transfer-block__button').click()
    .then(() => {
      cy.get('#benefic-number').should('have.text', '')
      cy.get('#transfer-sum').should('have.text', '')
    })
  });
})
