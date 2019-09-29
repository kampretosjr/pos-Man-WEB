const initialState = {
	CartList: [],
	CartCount: 0,
	CartQty: 0,
	TotalPrice: 0,
	isLoading: false,
	isFulfilled: false,
	isRejected: false,
};

const users = (state = initialState, action) => {
	switch (action.type) {
		case 'CART_OPERATOR':
			let tempItem
			if (action.item == "cancel") {
				state.CartList.splice(0, [state.CartList.length])
				return {
					...state,
					isLoading: false,
					isFulfilled: true,
				};
			} else {
				return {
				...state,
				isLoading: false,
				isFulfilled: true,
				CartList: action.item,
			};
			}
			

		case 'CART_PRICE':
			console.log('action.harga :', action.harga);
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				TotalPrice: action.harga,
			};
		case 'CART_QUANTITY':
			let data
			action.data == 0 ? data = 0 : data = (state.CartQty) + action.data
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				CartQty: data
			};
		case 'CART_INTERNAL':
			action.value == "inc" ? state.CartList[action.id].quantity += 1 : state.CartList[action.id].quantity -= 1
			return {
				...state,
				isLoading: false,
				isFulfilled: true,
			};
		default:
			return state;
	}
};

export default users;
