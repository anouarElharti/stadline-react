import React, { createContext, useReducer } from 'react';

export const IssueContext = createContext();

const initialState = {
  issueNumber: '',
  comments: [],
  issuePrompt: 'facebook/react/issues/7901',
  filteredUsers: [],
};

const issueReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISSUE_NUMBER':
      return { ...state, issueNumber: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    case 'SET_ISSUE_PROMPT':
      return { ...state, issuePrompt: action.payload };
    case 'SET_FILTERED_USERS':
      return { ...state, filteredUsers: action.payload };
    case 'SET_FILTERED_COMMENTS':
      return { ...state, filteredComments: action.payload };
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

  const updateFilteredUsers = (newFilteredUsers) => {
    const filteredComments = state.comments.filter((comment) => {
      return newFilteredUsers.includes(comment.user);
    });
    dispatch({ type: 'SET_FILTERED_COMMENTS', payload: filteredComments });
    dispatch({ type: 'SET_FILTERED_USERS', payload: newFilteredUsers });
  };

  return (
    <IssueContext.Provider value={{ state, dispatch, updateIssueNumber, updateIssuePrompt, updateComments,updateFilteredUsers, filteredComments }}>
      {children}
    </IssueContext.Provider>
  );
};