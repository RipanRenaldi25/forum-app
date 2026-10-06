/// <reference types="cypress" />

/**
 * Should show memuat detail thread... when there is no detail data
 * Should be able to view the detail page of a specific item when clicking on it from the list page.
 * Should display the detail of the item, including its title, content, and any other relevant information.
 * Should back to the list page when clicking the back button
 * Should upvote when clicking the upvote button correctly
 * Should downvote when clicking the downvote button correctly
 * Should show the comment section when detail page is loaded
 * Should show login and not comment form when user is not logged in
 * Should show comment form when user is logged in
 * Should show alert when user is not not filled the comment form
 * Should be able to add new comment when user is logged in
 * Should be able to upvote and downvote comment correctly
 * Should be able to neutral vote comment correctly
 */
describe('Detail Page', () => {
  const mockThread = {
    id: 1,
    title: 'Thread Title',
    body: 'Thread Body',
    category: 'Thread Category',
    createdAt: '2023-01-01T00:00:00.000Z',
    owner: {
      id: 1,
      name: 'Owner Name',
      email: 'owner@example.com'
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [{
      id: 1,
      content: 'Comment Content',
      createdAt: '2023-01-01T00:00:00.000Z',
      owner: {
        id: 2,
        name: 'Commenter Name',
        email: 'commenter@example.com'
      },
      upVotesBy: [],
      downVotesBy: []
    }]
  };

  it('Should show loading message when there is no detail data', () => {


    cy.visit('http://localhost:5173/detail/1');
    cy.contains('Memuat detail thread...').should('be.visible');
  });

  it('Should be able to view the detail page of a specific item when clicking it from the list page', () => {
    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { threads: [mockThread] },
      },
    }).as('getThreads');
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { detailThread: mockThread },
      },
    }).as('getThreadDetail');

    cy.visit('http://localhost:5173/');
    cy.wait('@getThreads');

    cy.get('a').contains(mockThread.title).click();

    cy.wait('@getThreadDetail');
    cy.url().should('include', '/detail/1');
    cy.contains(mockThread.title).should('be.visible');
  });

  it('Should back to the list page when clicking the back button', () => {
    cy.visit('http://localhost:5173/detail/1');
    cy.get('a').contains('Kembali ke threads').click();

    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('Should show the comment section when detail page is loaded', () => {
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThread
        }
      }
    }).as('getThreadDetail');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          threads: [mockThread]
        }
      }
    }).as('getThreads');

    cy.visit('http://localhost:5173/');
    cy.wait('@getThreads');
    cy.get('a').contains(mockThread.title).click();
    cy.wait('@getThreadDetail');
    cy.get('.total-comment').get('.header').should('have.length', 1);
  });

  it('Should show login and not comment form when user is not logged in', () => {
    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { threads: [mockThread] },
      },
    }).as('getThreads');
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { detailThread: mockThread },
      },
    }).as('getThreadDetail');

    cy.visit('http://localhost:5173/');
    cy.wait('@getThreads');
    cy.get('a').contains(mockThread.title).click();
    cy.wait('@getThreadDetail');

    cy.get('a[href="/login"]').should('be.visible');
  });

  it('Should show comment form when user is logged in', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg'
    };

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { user: mockUser },
      },
    }).as('getOwnProfile');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { threads: [mockThread] },
      },
    }).as('getThreads');

    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { detailThread: mockThread },
      },
    }).as('getThreadDetail');

    cy.visit('http://localhost:5173', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
      }
    });
    cy.wait('@getThreads');
    cy.get('a').contains(mockThread.title).click();
    cy.wait('@getThreadDetail');
    cy.wait('@getOwnProfile');
    cy.get('textarea').should('be.visible');
  });

  it('Should show alert when user is not filled the comment form', () => {
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThread
        }
      }
    }).as('getThreadRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com'
          }
        }
      }
    }).as('getOwnProfile');

    cy.visit('http://localhost:5173/detail/1', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
        cy.stub(win, 'alert').as('alert');
      }
    });
    cy.intercept('POST', '**/threads/1/comments', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: '"content" is not allowed to be empty'
      }
    }).as('postCommentRequest');
    cy.wait('@getThreadRequest');
    cy.wait('@getOwnProfile');
    cy.get('textarea').should('be.visible');
    cy.get('button[type="submit"]').click();
    cy.wait('@postCommentRequest');
    cy.get('@alert').should('have.been.calledWith', '"content" is not allowed to be empty');
  });

  it('Should be able to add new comment when user is logged in', () => {
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThread
        }
      }
    }).as('getThreadRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@gmail.com',
            avatar: 'https://example.com/avatar.jpg'
          }
        }
      }
    }).as('getOwnProfile');

    cy.intercept('POST', '**/threads/1/comments', {
      statusCode: 201,
      body: {
        status: 'success',
        data: {
          'comment': {
            'id': 'comment-1',
            'content': 'Comment Baru',
            'createdAt': '2021-06-21T07:00:00.000Z',
            'upVotesBy': [],
            'downVotesBy': [],
            'owner': {
              ...mockThread.owner
            }
          }
        }
      }
    }).as('postCommentRequest');

    cy.intercept('GET', '**/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data:{
          threads: [mockThread]
        }
      }
    }).as('getThreads');

    cy.visit('http://localhost:5173', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
      }
    });
    cy.wait('@getThreads');
    cy.visit('http://localhost:5173/detail/1', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
      }
    });
    cy.wait('@getThreadRequest');
    cy.wait('@getOwnProfile');

    cy.get('textarea').type('Comment Baru');
    cy.get('button[type="submit"]').click();
    cy.wait('@postCommentRequest');
    cy.get('[data-testid="comment-item"]').should('have.length', 2);
    cy.contains('p', /comment baru/i).should('be.visible');
  });

  it('Should be able to upvote ', () => {
    const mockUser ={
      id: 1,
      name: 'Test User',
      email: 'test@gmail.com',
      avatar: 'https://example.com/avatar.jpg'
    };
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThread
        }
      }
    }).as('getThreadDetailRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: mockUser
        }
      }
    }).as('getOwnProfileRequest');

    cy.intercept('POST', '**/threads/1/comments/1/up-vote', {
      fixture: 'upvoteCommentResponse.json'
    }).as('upVoteCommentRequest');

    cy.visit('http://localhost:5173/detail/1', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
      }
    });
    cy.wait('@getThreadDetailRequest');
    cy.wait('@getOwnProfileRequest');
    cy.get('[data-testid="comment-item"]').first().within(() => {
      cy.get('button').first().click();
    });
    cy.wait('@upVoteCommentRequest');
    cy.get('[data-testid="comment-item"]').first().within(() => {
      cy.get('button').first().children().should('have.class', 'text-cyan-400');
    });
  });

  it('Should be able to downvote comment correctly', () => {
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThread
        }
      }
    }).as('getThreadDetailRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@gmail.com',
            avatar: 'https://example.com/avatar.jpg'
          }
        }
      }
    }).as('getOwnProfileRequest');

    cy.intercept('POST', '**/threads/1/comments/1/down-vote', {
      fixture: 'downvoteCommentResponse.json'
    }).as('downVoteCommentRequest');

    cy.visit('http://localhost:5173/detail/1', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
      }
    });
    cy.wait('@getThreadDetailRequest');
    cy.wait('@getOwnProfileRequest');

    cy.get('[data-testid="comment-item"]').first().within(() => {
      cy.get('button').last().click();
    });

    cy.wait('@downVoteCommentRequest');
    cy.get('[data-testid="comment-item"] button').last().children().should('have.class', 'text-red-400');

    cy.get('[data-testid="comment-item"]  span').last().should('contain.text', '1');
  });

  it('Should be able to neutral vote comment correctly', () => {
    cy.intercept('GET', '**/threads/1', {
      statusCode: 200,
      body: {
        status :'success',
        data: {
          detailThread: mockThread
        }
      }
    }).as('getThreadDetailRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@gmail.com'
          }
        }
      }
    }).as('getOwnProfileRequest');

    cy.intercept('POST', '**/threads/1/comments/1/neutral-vote', {
      fixture: 'vote/neutralVoteCommentResponse.json'
    }).as('neutralVoteCommentRequest');

    cy.intercept('POST', '**/threads/1/comments/1/up-vote', {
      fixture: 'upvoteCommentResponse.json'
    }).as('upVoteCommentRequest');

    cy.intercept('POST', '**/threads/1/comments/1/down-vote', {
      fixture: 'downvoteCommentResponse.json'
    }).as('downVoteCommentRequest');

    cy.visit('http://localhost:5173/detail/1', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('AUTH_TOKEN', 'mockAccessToken');
      }
    });
    cy.wait('@getThreadDetailRequest');
    cy.wait('@getOwnProfileRequest');
    cy.get('[data-testid="comment-item"] button').first().click();
    cy.wait('@upVoteCommentRequest');
    cy.get('[data-testid="comment-item"] button').first().click();
    cy.wait('@neutralVoteCommentRequest');
    cy.get('[data-testid="comment-item"] button').first().children().should('not.have.class', 'text-cyan-400');
    cy.get('[data-testid="comment-item"] div:last-child span').first().should('contain.text', '0');

    cy.get('[data-testid="comment-item"] button').last().click();
    cy.wait('@downVoteCommentRequest');
    cy.get('[data-testid="comment-item"] button').last().click();
    cy.wait('@neutralVoteCommentRequest');
    cy.get('[data-testid="comment-item"] button').last().children().should('not.have.class', 'text-red-400');
    cy.get('[data-testid="comment-item"] div:last-child span').last().should('contain.text', '0');
  });
});