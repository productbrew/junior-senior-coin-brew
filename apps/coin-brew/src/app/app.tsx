import React from 'react';
import styled from '@emotion/styled';
import { Route, Link } from 'react-router-dom';

const StyledApp = styled.div`
  background-color: green;
`;

export function App() {
  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to coin-brew!</h1>
      </header>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>

      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
    </StyledApp>
  );
}

export default App;
