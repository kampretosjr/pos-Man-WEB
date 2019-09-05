import Axios from "axios";
import linknya from "../link";

export const getAllItem = () => {
    return {
        type: 'GET_ITEM',
        payload: Axios.get(`${linknya}/item/`)
    }
}

export const postItem = (data) => {
    return {
        type: 'ADD_ITEM',
        payload: Axios.post(`${linknya}/item/`, data)
    }
}