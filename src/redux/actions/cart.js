export const cartPlus = (data) => {
    return {
        type: 'CART_INC',
        data,
    }
}
export const cartMinus = (data) => {
    return {
        type: 'CART_DEC',
        data
    }
}
export const cartOperator = (data) => {
    return {
        type: 'CART_OPERATOR',
        data,
    }
}
