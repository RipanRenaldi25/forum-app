# Description

Forum discussion, an application that can make user interact with each other such as create a discussion, create a comment, upvote comment, and downvote comment. This is part of the project work for the Dicoding course. It used [Dicoding API](https://forum-api.dicoding.dev/v1/#/?id=see-all-threads) as part of its development.

## Spesification
 - User can authenticate itself (register and login)
 - User can create a new discussion
 - User can create a comment within a discussion
 - User can Upvote, Downvote, and Neutral Vote the discussion and the comment


## What im proud about
 - I Create unit test for each React Component using react-testing-library and vitest
 - I use redux to manage application state.
 - I Create unit test for every action including thunk and reducer
 - I use cypress and create End To End test for each page

## Challenges and How I Solved Them
 - **Automatic test wont run automatically if there is an alert**
   - I use stubbing technique for window.alert, so i just need to verify if the alert is already called with some message
 - **redux middleware (thunk)**: Its hard to understand how redux middleware work with function that return a function that return a function
   - I break down the function and log for each function inside the middleware. I understand that for 2 first function on middleware is will initialize first, and for the last function will be return a dispatch with an action in it. And if the argument is a function, then it will call the function and give the argument of an action and getState in redux store to function parameter. So now the thunk action (async function that return a function) will have an access to every state that stored in redux.
   - **Unit Test with RTL**: I dont understand how to create a test using RTL library when the component is use redux store
     - I use wrapper component, that wrap the component to be test with <Provider> in react-redux, and set the initial state that mock the state that will be used in the component

This is not perfect project, but it gives me understanding on how React work, how create a reusable component using props, how create unit test, integration test, end to end test for front end web application, how state management is implemented, and how CI / CD using github action is working from end to end.
