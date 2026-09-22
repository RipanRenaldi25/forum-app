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
    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"name" is required'
      }
    }).as('registerRequest');
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');
    expectAlert('"name" is required');

    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"email" is required'
      }
    }).as('registerRequest');

    cy.get('#name').type('cobaakun0090');
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');
    expectAlert('"email" is required');

    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"password" is required'
      }
    }).as('registerRequest');

    cy.get('#name').type('cobaakun0090');
    cy.get('#email').type('cobaakun0090@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');
    expectAlert('"password" is required');
  });

  it('Should show alert when email is taken', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email is already taken'
      }
    }).as('registerRequest');
    cy.get('#name').type('cobaakun0090');
    cy.get('#email').type('cobaakun0090@gmail.com');
    cy.get('#password').type('cobaakun0090');
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');

    expectAlert('email is already taken');
  });

  it('Should show alert when password is less than 6 character', () => {
    const date = Date.now();
    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'password must be at least 6 characters long'
      }
    }).as('registerRequest');

    cy.get('#name').type(`cobaakun${date}`);
    cy.get('#email').type(`cobaakun${date}@gmail.com`);
    cy.get('#password').type('test');
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');

    expectAlert('password must be at least 6 characters long');
  });

  it('Should show alert user created when register success', () => {
    const date = Date.now();
    cy.intercept('POST', '**/register', {
      statusCode: 201,
      body: {
        status: 'success',
        message: 'user created'
      }
    }).as('registerRequest');

    cy.get('#name').type(`cobaakun${date}`);
    cy.get('#email').type(`cobaakun${date}@gmail.com`);
    cy.get('#password').type(`cobaakun${date}`);
    cy.get('button[type="submit"]').click();
    cy.wait('@registerRequest');

    expectAlert('user created');
  });

  it('Should change to login page when login button is clicked', () => {
    cy.contains('p', 'Sudah punya akun?').contains('a', 'Login').click();
    cy.location('pathname').should('eq', '/login');
  });
});
