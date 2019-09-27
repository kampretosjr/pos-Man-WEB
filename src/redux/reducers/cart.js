const initialState = {
		CartList: [],
		CartCount: 0,
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
  };
  
  const users = (state = initialState, action) => {
    switch (action.type) {
      /////////////////////////////////////////////////////    
      case 'CART_INC':
				return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          CartList: action.data,
        };
			case 'CART_DEC':
				return {
					...state,
					isLoading: false,
					isFulfilled: true,
					CartList: action.data,
				};
			case 'CART_OPERATOR':
				let count
					if (action.data == "plus") {
						count = state.CartCount += 1
					} else {
						count = state.CartCount -= 1
					}
				return {
					...state,
					isLoading: false,
					isFulfilled: true,
					CartCount: count
				};
      default:
        return state;
    }
  };
  
  export default users;
  