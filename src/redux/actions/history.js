import Axios from "axios";
import linknya from "../link";

export const getAllHistory = () => {
    return {
        type: 'GET_HISTORY',
        payload: Axios.get(`${linknya}/history/`)
    }
}
export const postHistory = (data) => {
    return {
        type: 'ADD_HISTORY',
        payload: Axios.post(`${linknya}/history/`, data[0])
    }
}