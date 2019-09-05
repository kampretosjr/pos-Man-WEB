const initialState = {
  ListUser: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    /////////////////////////////////////////////////////    
    case 'GET_USERS_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_USERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_USERS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListUser: action.payload.data.result,
      };
/////////POST//////////////////////////////////////////////
    case "POST_USERS_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_USERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "POST_USERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListUser: action.payload.data.result
      };
////////POST//////////////////////////////////////////////
    case "POST_USERSIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_USERSIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "POST_USERSIN_FULFILLED":
      
      localStorage.setItem('token','bearer ' + action.payload.data.result.token)
      localStorage.setItem('number', action.payload.data.result.id_user)
      localStorage.setItem('data', JSON.stringify(action.payload.data.result))

      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListUser: action.payload.data.result
      };

/////////////GET1//////////////////////////////////////////
    case 'GET_USER1_PENDING': // in case when loading post data
      return {
        ...state,
        isLoading: true,
        isFulFilled: false,
        isRejected: false
        }
    case 'GET_USER1_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'GET_USER1_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListUser: action.payload.data.result,
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
            ListUser: [state.ListUser, action.payload.data[0]],
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
            ListUser: [state.ListUser, action.payload.data[0]],
        }
//////////////LOGOUT/////////////////////////////////////////    

      case 'LOGOUT_USERS_PENDING': // in case when loading post data
          return {
            ...state,
            isLoading: true,
            isFulFilled: false,
            isRejected: false
        }
      case 'LOGOUT_USERS_REJECTED': // in case error network/else
          return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
      case 'LOGOUT_USERS_FULFILLED': // in case successfuly post data
      localStorage.clear()
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListUser: [state.ListUser, action.payload.data[0]],
        }
    default:
      return state;
  }
};

export default users;
