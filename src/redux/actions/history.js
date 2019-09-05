import Axios from "axios";
import linknya from "../link";

export const getAllHistory = () => {
    return {
        type: 'GET_HISTORY',
        payload: Axios.get(`${linknya}/history/`)
    }
}