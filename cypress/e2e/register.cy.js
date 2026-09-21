/// <reference types="cypress" />

/**
 * Should show alert when some field is missing
 * Should show alert when email is taken
 * Should show alert when password is less than 6 character
 * Should show alert user created when register success
 * Should change to login page when login button is clicked
 */

describe('signup page', () => {
  const expectAlert = (message) => {
    cy.get('@alert').should('have.been.calledWith', message);
  };

  beforeEach(() => {
    cy.visit('http://localhost:5173/signup', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'alert').as('alert');
      },
    });
  });

  it('Should show alert when some field is missing', () => {
    cy.get('button[type="submit"]').click();
    expectAlert('"name" is required');

    cy.get('#name').type('cobaakun0090');
    cy.get('button[type="submit"]').click();
    expectAlert('"email" is required');

    cy.get('#name').type('cobaakun0090');
    cy.get('#email').type('cobaakun0090@gmail.com');
    cy.get('button[type="submit"]').click();
    expectAlert('"password" is required');
  });

  it('Should show alert when email is taken', () => {
    cy.get('#name').type('cobaakun0090');
    cy.get('#email').type('cobaakun0090@gmail.com');
    cy.get('#password').type('cobaakun0090');
    cy.get('button[type="submit"]').click();

    expectAlert('email is already taken');
  });

  it('Should show alert when password is less than 6 character', () => {
    const date = Date.now();

    cy.get('#name').type(`cobaakun${date}`);
    cy.get('#email').type(`cobaakun${date}@gmail.com`);
    cy.get('#password').type('test');
    cy.get('button[type="submit"]').click();

    expectAlert('password must be at least 6 characters long');
  });

  it('Should show alert user created when register success', () => {
    const date = Date.now();

    cy.get('#name').type(`cobaakun${date}`);
    cy.get('#email').type(`cobaakun${date}@gmail.com`);
    cy.get('#password').type(`cobaakun${date}`);
    cy.get('button[type="submit"]').click();

    expectAlert('user created');
  });

  it('Should change to login page when login button is clicked', () => {
    cy.contains('p', 'Sudah punya akun?').contains('a', 'Login').click();
    cy.location('pathname').should('eq', '/login');
  });
});