/// <reference types="cypress" />


/**
 * Should render page correctly
 * Shuold show add discussion page when user is logged in
 * Should Show login to write discussion when user is not logged in
 * Should show thread list
 */

describe('HomePage', () => {
  it('Should render page correctly', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').contains('Active Threads').should('be.visible');
  });

  it('Should show add discussion page when user is logged in', () => {
    cy.intercept('GET', '**/users/me', {
      fixture: 'profileResponse.json'
    }).as('getOwnProfile');

    cy.visit('http://localhost:5173/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockuser');
      }
    });

    cy.get('a[href="/newthread"]').contains(/add discussion/i).should('be.visible');
  });

  it('Should Show login to write discussion when user is not logged in', () => {
    cy.visit('http://localhost:5173/', {});
    cy.get('a[href="/login"]').contains(/login untuk menulis/i).click();
    cy.url().should('include', '/login');
  });

  it('Should show thread list', () => {
    cy.intercept('GET', '**/threads', {
      fixture: 'threadsResponse.json'
    }).as('getThreads');
    cy.visit('http://localhost:5173/');
    cy.wait('@getThreads');
    cy.get('[data-testid="thread-item"').should('have.length', 2);
  });
});