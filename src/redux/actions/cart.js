export const cartOperator = (item,id) => {
    return {
        type: 'CART_OPERATOR',
        item,
        id
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
export const cartInternalPlus = (value) => {
    return {
        type: 'CART_INTERNAL_PLUS',
        value,
    }
}
export const cartInternal = (value,id) => {
    return {
        type: 'CART_INTERNAL',
        value,
        id
    }
}