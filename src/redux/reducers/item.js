const initialState = {
    itemList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

const item = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITEM_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'GET_ITEM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_ITEM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                itemList: action.payload.data.result
            }
/////////////////////////////////////////////////////            
        case 'ADD_ITEM_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'ADD_ITEM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'ADD_ITEM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                itemList: action.payload.data.result
            }


            
        default:
            return state
    }
}

export default item