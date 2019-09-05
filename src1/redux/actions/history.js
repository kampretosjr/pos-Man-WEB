import axios from 'axios';
import URL from "../URL";

//let URL = 'http://localhost:5000'

export const getHist = () => {
  return {
    type: 'GET_HISTORY',
    payload: axios.get(URL+'/history'),
  };
};
/////////////////////////////////////////////
export const postHist = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_HISTORY",
    payload: axios.post(URL+'/history', data[0])
  };
};
/////////////////////////////////////////////
export const deleteHist = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_HISTORY',
		payload: axios.delete(URL +`/history/${param}`)
	}
}
/////////////////////////////////////////////
export const getHist1asli = (bookid) => {
  console.log("book id: " + bookid)
  return {
      type: 'GET_HISTORY01',
      payload: axios.get(URL +`/history1/${bookid}`)
  }
}
/////////////////////////////////////////////
export const getHist1 = (bookid) => {
  console.log("book id: " + bookid)
  return {
      type: 'GET_HISTORY1',
      payload: axios.get(URL +`/history/${bookid}`)
  }
}
/////////////////////////////////////////////
export const updateHist = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_HISTORY',
      payload: axios.patch(URL +`/history/${bookid}`, data)
  }
}
