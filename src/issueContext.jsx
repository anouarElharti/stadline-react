import React, { createContext, useReducer } from 'react';

export const IssueContext = createContext();

const initialState = {
  issueNumber: '',
  comments: [],
  issuePrompt: 'facebook/react/issues/7901',
};

const issueReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISSUE_NUMBER':
      return { ...state, issueNumber: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_ISSUE_PROMPT':
      return { ...state, issuePrompt: action.payload };
    default:
      return state;
  };
};
export const IssueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, initialState);

  const updateIssueNumber = (newIssueNumber) => {
    dispatch({ type: 'SET_ISSUE_NUMBER', payload: newIssueNumber });
  };

  const updateIssuePrompt = (newIssuePrompt) => {
    dispatch({ type: 'SET_ISSUE_PROMPT', payload: newIssuePrompt });
  };

  const updateComments = (newComments) => {
    dispatch({ type: 'SET_COMMENTS', payload: newComments });
  };

  return (
    <IssueContext.Provider value={{ state, dispatch, updateIssueNumber, updateIssuePrompt, updateComments }}>
      {children}
    </IssueContext.Provider>
  );
};