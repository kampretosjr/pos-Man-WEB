const initialState = {
  ListHistory: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_HISTORY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_HISTORY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListHistory: action.payload.data,
      };
///////////////////////////////////////////////////////
    case "POST_HISTORY_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "POST_HISTORY_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "POST_HISTORY_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          ListHistory: action.payload.data
        };
/////////////GET1//////////////////////////////////////////
    case 'GET_HISTORY1_PENDING': // in case when loading post data
    return {
      ...state,
      isLoading: true,
      isFulFilled: false,
      isRejected: false
      }
  case 'GET_HISTORY1_REJECTED': // in case error network/else
      return {
          ...state,
          isLoading: false,
          isRejected: true,
      }
  case 'GET_HISTORY1_FULFILLED': // in case successfuly post data
      return {
          ...state,
          isLoading: false,
          isFulFilled: true,
          ListHistory: action.payload.data,
      }
/////////////GET1 asli//////////////////////////////////////////
    case 'GET_HISTORY01_PENDING': // in case when loading post data
    return {
      ...state,
      isLoading: true,
      isFulFilled: false,
      isRejected: false
      }
  case 'GET_HISTORY01_REJECTED': // in case error network/else
      return {
          ...state,
          isLoading: false,
          isRejected: true,
      }
  case 'GET_HISTORY01_FULFILLED': // in case successfuly post data
      return {
          ...state,
          isLoading: false,
          isFulFilled: true,
          ListHistory: action.payload.data,
      }
///////////////DELETE////////////////////////////////////////        
    case 'DELETE_BOOK_PENDING': // in case when loading post data
        return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false
        }
    case 'DELETE_BOOK_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'DELETE_BOOK_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListHistory: [state.ListHistory, action.payload.data[0]],
        }
//////////////UPDATE/////////////////////////////////////////          
    case 'UPDATE_BOOK_PENDING': // in case when loading post data
        return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false
        }
    case 'UPDATE_BOOK_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'UPDATE_BOOK_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListHistory: [state.ListHistory, action.payload.data[0]],
        }
    default:
      return state;
  }
};

export default buku;
