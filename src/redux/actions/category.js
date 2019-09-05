import Axios from "axios";
import linknya from "../link";

export const getAllCategory = () => {
    return {
        type: 'GET_CATEGORY',
        payload: Axios.get(`${linknya}/category/`)
    }
}