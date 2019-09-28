export const cartOperator = (item) => {
    return {
        type: 'CART_OPERATOR',
        item,
    }
}
export const cartTotalPrice = (harga) => {
    return {
        type: 'CART_PRICE',
        harga
    }
}
export const cartQty = (data) => {
    return {
        type: 'CART_QUANTITY',
        data,
    }
}
