import { createContext, useReducer } from 'react';
import issueReducer from './issueReducer';

const IssueContext = createContext();

const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, {});

  return (
    <IssueContext.Provider value={{ state, dispatch }}>
      {children}
    </IssueContext.Provider>
  );
};

export { IssueContext, IssueProvider };

