import React, { useReducer, useEffect } from 'react';
import { useMeQuery } from './graphql/client';
import Loading from './loading';

type State = {
  authState: 'AUTHENTICATED' | 'UNAUTHENTICATED';
};

type Action = { type: 'AUTH_STATE_CHANGED'; payload: State['authState'] };

type Dispatch = (action: Action) => void;

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

/**
 * Auth reducer function
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED':
      return {
        ...state,
        authState: action.payload,
      };

    default:
      return state;
  }
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    authState: localStorage.getItem('access_token')
      ? 'AUTHENTICATED'
      : 'UNAUTHENTICATED',
  });

  const [meResult] = useMeQuery({ requestPolicy: 'network-only' });

  useEffect(() => {
    if (meResult.fetching) {
      return;
    }

    if (meResult.error) {
      return dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: 'UNAUTHENTICATED',
      });
    }
  }, [meResult]);

  return (
    <>
      {meResult.fetching && <Loading fullPage />}

      <AuthStateContext.Provider value={state}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    </>
  );
}

/**
 * Hook for getting Auth State
 */
export function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

/**
 * Hook for getting Auth Dispatch
 */
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}
