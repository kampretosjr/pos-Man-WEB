export const cartOperator = (data) => {
    return {
        type: 'CART_OPERATOR',
        data,
    }
}
export const cartMinus = (data) => {
    return {
        type: 'CART_DEC',
        data
    }
}
export const cartQty = (data) => {
    return {
        type: 'CART_QUANTITY',
        data,
    }
}
