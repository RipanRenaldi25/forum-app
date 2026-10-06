/**
 * Should render leaderboard correctly
 * Should show leaderboard list
 * Should increase score by 5 when user is upvote a thread and user is showwed
 */

/// <reference types="cypress" />

describe('LeaderBoardPage', () => {
  it('Should render leaderboard correctly', () => {
    cy.visit('http://localhost:5173/leaderboard');
    cy.contains('p', 'Ranking').should('be.visible');
    cy.get('h1').contains('Leaderboard').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('Should show leaderboard list', () => {
    cy.intercept('**/leaderboards', {
      fixture: 'LeaderboardsResponse.json'
    }).as('getLeaderboards');

    cy.visit('http://localhost:5173/leaderboard');
    cy.wait('@getLeaderboards');
    cy.contains('John Doe').should('be.visible');
    cy.contains('Jane Doe').should('be.visible');
    cy.get('table tbody tr').should('have.length', 2);
  });

  it('Should increase score by 10 when user try to comment', () => {
    let leaderboards;
    cy.fixture('LeaderboardsResponse.json').then((data) => {
      leaderboards = structuredClone(data.data.leaderboards);
    });

    cy.intercept('**/leaderboards', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          status: 'success',
          data: {
            leaderboards: leaderboards
          }
        }
      });
    }).as('getLeaderboards');

    cy.intercept('**/threads', {
      fixture: 'ThreadsResponse.json'
    }).as('getThreads');

    cy.intercept('**/threads/*/comments', (req) => {
      const me = leaderboards.find((user) => user.user.id === 'user-1');
      if (me) {
        me.score += 10;
      } else {
        leaderboards.push({
          'user': {
            'id': 'users-1',
            'name': 'User Baru',
            'email': 'userbaru@example.com',
            'avatar': 'https://generated-image-url.jpg'
          },
          'score': 10
        });
        req.reply({
          statusCode: 201,
          body: {
            status: 'success',
            data: {
              comment: {
                id: 'comment-2',
                content: 'Comment Baru',
                createdAt: '2021-06-21T07:00:00.000Z',
                owner: {
                  id: 'users-2',
                  name: 'Jane Doe',
                  avatar: 'https://generated-image-url.jpg'
                },
                upVotesBy: [],
                downVotesBy: []
              }
            }
          }
        });
      }
    }).as('postComment');

    cy.intercept('**/threads/thread-1', {
      statusCode: 200,
      body: {
        status: 'sucecss',
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'Thread Title',
            body: 'Thread Body',
            category: 'General',
            createdAt: '2023-01-01T00:00:00.000Z',
            owner: {
              id: 'user-1',
              name: 'John Doe',
              avatar: 'https://example.com/avatar.jpg'
            },
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            'comments': [
              {
                'id': 'comment-1',
                'content': 'Ini adalah komentar pertama',
                'createdAt': '2021-06-21T07:00:00.000Z',
                'owner': {
                  'id': 'users-1',
                  'name': 'John Doe',
                  'avatar': 'https://generated-image-url.jpg'
                },
                'upVotesBy': [],
                'downVotesBy': []
              }
            ]
          }

        }
      }
    }).as('getThreadDetail');

    cy.intercept('**/users/me', {
      fixture: 'profileResponse.json'
    }).as('getOwnProfile');

    cy.visit('http://localhost:5173/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockuser');
      }
    });
    cy.wait('@getThreads');
    cy.wait('@getOwnProfile');

    cy.get('[data-testid="thread-item"]').first().click();
    cy.wait('@getThreadDetail');
    cy.get('textarea').type('Comment Baru');
    cy.get('button').contains(/kirim/i).click();
    cy.wait('@postComment');
    cy.visit('http://localhost:5173/leaderboard');
    cy.wait('@getLeaderboards');
    cy.contains('User Baru').should('be.visible');
    cy.get('table tbody tr').should('have.length', 3);
    cy.get('tr td:last-child').should('contain.text', 10);
  });

  it('Should increase score by 5 when user try to upvote a thread', () => {
    let leaderboards;
    cy.fixture('LeaderboardsResponse.json').then((data) => {
      leaderboards = structuredClone(data.data.leaderboards);
    });

    cy.intercept('**/leaderboards', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          status: 'success',
          data: {
            leaderboards: leaderboards
          }
        }
      });
    }).as('getLeaderboards');

    cy.intercept('**/threads', {
      fixture: 'ThreadsResponse.json'
    }).as('getThreads');

    cy.intercept('**/threads/thread-1', {
      statusCode: 200,
      body: {
        status: 'sucecss',
        data: {
          detailThread: {
            id: 'thread-1',
            title: 'Thread Title',
            body: 'Thread Body',
            category: 'General',
            createdAt: '2023-01-01T00:00:00.000Z',
            owner: {
              id: 'user-1',
              name: 'John Doe',
              avatar: 'https://example.com/avatar.jpg'
            },
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            'comments': [
              {
                'id': 'comment-1',
                'content': 'Ini adalah komentar pertama',
                'createdAt': '2021-06-21T07:00:00.000Z',
                'owner': {
                  'id': 'users-1',
                  'name': 'John Doe',
                  'avatar': 'https://generated-image-url.jpg'
                },
                'upVotesBy': [],
                'downVotesBy': []
              }
            ]
          }

        }
      }
    }).as('getThreadDetail');

    cy.intercept('**/users/me', {
      statusCode: 200,
      body: {
        status : 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'userbaru@gmail.com',
            avatar: 'https://generated-image-url.jpg'
          }
        }
      }
    }).as('getOwnProfile');

    cy.intercept('**/threads/thread-1/up-vote', (req) => {
      const me = leaderboards.find((user) => user.id === 'user-1');

      if (me) {
        me.score += 5;
      } else {
        leaderboards.push({
          'user': {
            'id': 'users-1',
            'name': 'User Baru',
            'email': 'userbaru@example.com',
            'avatar': 'https://generated-image-url.jpg'
          },
          'score': 5
        });
      }
      req.reply({
        statusCode: 200,
        body: {
          status: 'success',
          data: {
            thread: {
              id: 'thread-1',
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2023-01-01T00:00:00.000Z',
              owner: {
                id: 'user-1',
                name: 'John Doe',
                avatar: 'https://example.com/avatar.jpg'
              },
              upVotesBy: ['user-1'],
              downVotesBy: [],
              totalComments: 0,
            }
          }
        }
      });
    }).as('upVoteThread');

    cy.visit('http://localhost:5173/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockuser');
      }
    });
    cy.wait('@getThreads');
    cy.wait('@getOwnProfile');

    cy.get('[data-testid="thread-item"]').first().within(() => {
      cy.get('button').first().click();
    });
    cy.wait('@upVoteThread');
    cy.visit('http://localhost:5173/leaderboard');
    cy.wait('@getLeaderboards');
    cy.contains('User Baru').should('be.visible');
    cy.get('table tbody tr').should('have.length', 3);
    cy.contains('User Baru').parent().parent().next().should('contain.text', 5);
  });
});