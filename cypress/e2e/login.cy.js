/// <reference types="cypress"/>

/**
 * Should render correcltly
 * Should show alert when input field is empty
 * should show alert when email is not valid email
 * should show alert when credential is not match
 * should redirect to / when credential is match
 */


describe('Login E2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'alert').as('alert');
      }
    });
  });

  it('Should render correcltly', () => {
    // cy.contains('Login').should('be.visible');
    cy.get('h1').contains('Login').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');

  });

  it('Should show alert when input field is empty', () => {
    const emptyEmailMessage = '"email" is required';
    const emptyPasswordMessage ='"password" is required';
    cy.get('button[type="submit"]').click();
    cy.get('@alert').should('have.been.calledWith', emptyEmailMessage);


    cy.get("input[placeholder='Email']").type('test@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.get('@alert').should('have.been.calledWith', emptyPasswordMessage);

  });

  it('should show alert when email is not valid email', () => {
    const invalidEmailMessage = '"email" must be a valid email';

    cy.get('input[placeholder="Email"]').type('test');
    cy.get('input[type="password"]').type('test');

    cy.get('button[type="submit"]').click();

    cy.get('@alert').should('have.been.calledWith', invalidEmailMessage);
  });

  it('should show alert when credential is not match', () => {
    const invalidCredentialMessage = 'email or password is wrong';

    cy.get('input[placeholder="Email"]').type('test@gmail.com');
    cy.get("input[type='password']").type('tset');
    cy.get('button[type="submit"]').click();

    cy.get('@alert').should('have.been.calledWith', invalidCredentialMessage);
  });

  it('should redirect to / when credential is match', () => {
    cy.intercept('POST', '**/login').as('loginRequest');
    const email = 'cobaakun00902@gmail.com';
    const password = 'cobaakun00902@gmail.com';

    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get("button[type='submit']").click();

    cy.location('pathname').should('not.equal', '/login');
    cy.location('pathname').should('equal', '/');
    cy.wait('@loginRequest').then((interception) => {
    cy.log(JSON.stringify(interception.response)); // ini akan tampil di output Cypress
  });
  });

});
