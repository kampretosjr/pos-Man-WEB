import axios from 'axios';
import URL from "../URL";

export const getItem = () => {
  return {
    type: 'GET_ITEMS',
    payload: axios.get(URL+'/item'),
  };
};
/////////////////////////////////////////////
export const postItem = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_ITEM",
    payload: axios.post(URL+'/item', data,{})
  };
};
/////////////////////////////////////////////
export const deleteItem = (param) =>{
  //console.log('action id', param)
	return{
    type: 'DELETE_ITEM',
		payload: axios.delete(URL +`/item/${param}`)
	}
}
/////////////////////////////////////////////
export const getItem1 = (bookid) => {
  console.log("book id: " + bookid)
  return {
      type: 'GET_ITEM1',
      payload: axios.get(URL +`/item/${bookid}`)
  }
}
/////////////////////////////////////////////
export const updateItem = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_ITEM',
      payload: axios.patch(URL +`/item/${bookid}`, data)
  }
}