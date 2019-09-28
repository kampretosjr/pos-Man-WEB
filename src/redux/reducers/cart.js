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
			const {item} = action
			let curentTotal 

			return {
				...state,
				isLoading: false,
				isFulfilled: true,
				CartList: item,
			};

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
		default:
			return state;
	}
};

export default users;
