const initialState = {
    issueNumber: '',
  };
  
  const issueReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ISSUE_NUMBER':
        return { ...state, issueNumber: action.payload };
      default:
        return state;
    }
  };
  
  export default issueReducer;