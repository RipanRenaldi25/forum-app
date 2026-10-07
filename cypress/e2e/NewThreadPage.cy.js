/// <reference types="cypress" />

/**
 * Should render page correctly
 * Shold handle typing correctly
 * Should show alert when title is empty
 * Should show alert when body is empty
 * Should add thread with category general when category is not filled
 * Should add new thread when title, category, and body is filled
 * Should navigate to home page after thread is added
 */

describe('NewThreadPage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/users/me', {
      fixture: 'profileResponse.json'
    }).as('getProfile');

    cy.visit('http://localhost:5173', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'test-token');
        cy.stub(win, 'alert').as('alert');
      }
    });
    cy.wait('@getProfile');
  });

  it('Should render page correctly', () => {
    cy.contains(/add discussion/i).click();
    cy.get('h1').contains(/create a discussion/i).should('be.visible');
    cy.get('input[placeholder="Title"]').should('be.visible');
    cy.get('input').should('have.length', 2);
    cy.get('textarea').should('be.visible');
  });

  it('Should handle typing correctly', () => {
    cy.contains(/add discussion/i).click();
    cy.get('input[name="title"]').type('Coba Title');
    cy.get('input[name="category"]').type('Coba Category');
    cy.get('textarea').type('Coba Body');
    cy.get('input[name="title"]').should('have.value', 'Coba Title');
    cy.get('input[name="category"]').should('have.value', 'Coba Category');
    cy.get('textarea').should('have.value', 'Coba Body');
  });

  it('Should show alert when title is empty', () => {
    cy.intercept('POST', '**/threads', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"title" is not allowed to be empty'
      }
    });
    cy.contains(/add discussion/i).click();
    cy.get('button').contains('Send').click();
    cy.get('@alert').should('have.been.called');
    cy.get('@alert').should('have.been.calledWith', '"title" is not allowed to be empty');
  });

  it('Should show alert when body is empty', () => {
    cy.contains(/add discussion/i).click();
    cy.intercept('POST', '**/threads', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"body" is not allowed to be empty'
      }
    }).as('createThreadRequest');
    cy.get('input[name="title"]').type('Coba Title');
    cy.get('button').contains('Send').click();
    cy.wait('@createThreadRequest');
    cy.get('@alert').should('have.been.called');
    cy.get('@alert').should('have.been.calledWith', '"body" is not allowed to be empty');
  });

  it('Should add thread with category general when category is not filled', () => {
    const threads = [];

    cy.intercept('POST', '**/threads', (req) => {
      const { title, body, category } = req.body;
      const thread = {
        'id': 'thread-1',
        'title': title,
        'body': body,
        'category': category || 'general',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': [],
        'downVotesBy': [],
        'totalComments': 0
      };
      threads.push(thread);

      req.reply({
        statusCode: 201,
        body :{
          status: 'success',
          data: {
            'thread': {
              'id': 'thread-1',
              'title': title,
              'body': body,
              'category': category || 'general',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'ownerId': 'users-1',
              'upVotesBy': [],
              'downVotesBy': [],
              'totalComments': 0
            }
          }
        }
      });
    }).as('createThreadRequest');
    cy.intercept('GET', '**/threads', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          status: 'success',
          data: {
            threads
          }
        }
      });
    }).as('getThreadsRequest');

    cy.contains(/add discussion/i).click();
    cy.get('input[name="title"]').type('Coba Title');
    cy.get('textarea').type('Coba Body');
    cy.get('button').contains('Send').click();
    cy.wait('@createThreadRequest');
    cy.wait('@getThreadsRequest');
    cy.contains('#general').should('be.visible');
  });

  it('Should add new thread when title, category, and body is filled', () => {
    const threads = [];

    cy.intercept('POST', '**/threads', (req) => {
      const { title, body, category } = req.body;
      const thread = {
        'id': 'thread-1',
        'title': title,
        'body': body,
        'category': category || 'general',
        'createdAt': '2021-06-21T07:00:00.000Z',
        'ownerId': 'users-1',
        'upVotesBy': [],
        'downVotesBy': [],
        'totalComments': 0
      };
      threads.push(thread);

      req.reply({
        statusCode: 201,
        body :{
          status: 'success',
          data: {
            'thread': {
              'id': 'thread-1',
              'title': title,
              'body': body,
              'category': category || 'general',
              'createdAt': '2021-06-21T07:00:00.000Z',
              'ownerId': 'users-1',
              'upVotesBy': [],
              'downVotesBy': [],
              'totalComments': 0
            }
          }
        }
      });
    }).as('createThreadRequest');

    cy.intercept('GET', '**/threads', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          status: 'success',
          data: {
            threads
          }
        }
      });
    }).as('getThreadsRequest');


    cy.contains(/add discussion/i).click();
    cy.get('input[name="title"]').type('Coba Title');
    cy.get('input[name="category"]').type('Coba Category');
    cy.get('textarea').type('Coba Body');
    cy.get('button').contains('Send').click();
    cy.wait('@createThreadRequest');
    cy.wait('@getThreadsRequest');
    cy.contains('#Coba Category').should('be.visible');
  });
});