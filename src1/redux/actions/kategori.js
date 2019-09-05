import axios from 'axios';
import URL from "../URL";

//let URL = 'http://localhost:5000'

export const getKategory= () => {
  return {
    type: 'GET_KATEGORI',
    payload: axios.get(URL+'/kategori'),
  };
};
