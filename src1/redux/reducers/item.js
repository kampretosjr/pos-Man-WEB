const initialState = {
  ListItem: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
/////////////////////////////////////////////////////    
  case 'GET_ITEMS_PENDING':
    return {
      ...state,
      isLoading: true,
      isFulfilled: false,
      isRejected: false,
    };
  case 'GET_ITEMS_REJECTED':
    return {
      ...state,
      isLoading: false,
      isRejected: true,
    };
  case 'GET_ITEMS_FULFILLED':
    return {
      ...state,
      isLoading: false,
      isFulfilled: true,
      ListBuku: action.payload.data,
    };
///////////POST////////////////////////////////////////////
    case "POST_ITEM_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
    case "POST_ITEM_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "POST_ITEM_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListBuku: action.payload.data
      };
/////////////GET1//////////////////////////////////////////
    case 'GET_ITEM1_PENDING': // in case when loading post data
      return {
        ...state,
        isLoading: true,
        isFulFilled: false,
        isRejected: false
        }
    case 'GET_ITEM1_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'GET_ITEM1_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListBuku: action.payload.data,
        }
///////////////DELETE////////////////////////////////////////        
      case 'DELETE_ITEM_PENDING': // in case when loading post data
          return {
              ...state,
              isLoading: true,
              isFulFilled: false,
              isRejected: false
          }
      case 'DELETE_ITEM_REJECTED': // in case error network/else
          return {
              ...state,
              isLoading: false,
              isRejected: true,
          }
      case 'DELETE_ITEM_FULFILLED': // in case successfuly post data
          return {
              ...state,
              isLoading: false,
              isFulFilled: true,
              ListBuku: [state.ListBuku, action.payload.data[0]],
          }
//////////////UPDATE/////////////////////////////////////////          
      case 'UPDATE_ITEM_PENDING': // in case when loading post data
          return {
              ...state,
              isLoading: true,
              isFulFilled: false,
              isRejected: false
          }
      case 'UPDATE_ITEM_REJECTED': // in case error network/else
          return {
              ...state,
              isLoading: false,
              isRejected: true,
          }
      case 'UPDATE_ITEM_FULFILLED': // in case successfuly post data
          return {
              ...state,
              isLoading: false,
              isFulFilled: true,
              ListBuku: [state.ListBuku, action.payload.data[0]],
          }
    default:
      return state;
  }
};

export default item;
