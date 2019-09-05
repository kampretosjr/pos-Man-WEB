import axios from 'axios';
import linknya from "../link";

//let linknya = 'http://localhost:5000'

export const getUser = () => {
  return {
    type: 'GET_USERS',
    payload: axios.get(linknya+'/user'),
  };
};
/////////////////////////////////////////////
export const postUser = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_USERS",
    payload: axios.post(linknya+'/users', data[0])
  };
};
/////////////////////////////////////////////
export const postUserIn = (data) => {
  return {
    type: "POST_USERSIN",
    payload: axios.post(linknya+'/user/login', data)
  };
};
/////////////////////////////////////////////
export const deleteUser = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_USERS',
		payload: axios.delete(linknya +`/users/${param}`)
	}
}
/////////////////////////////////////////////
export const getUser1 = (param1) => {
  console.log("book id: " + param1)
  return {
      type: 'GET_USER1',
      payload: axios.get(linknya +`/users/${param1}`)
  }
}
/////////////////////////////////////////////
export const updateUser = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_USERS',
      payload: axios.patch(linknya +`/users/${bookid}`, data)
  }
}
///////////LOGOUT/////////////////////////////
export const logoutUser = (bookid) => {
  return {
      type: 'LOGOUT_USERS',
      payload: axios.patch(linknya +`/user/logout/${bookid}`)
  }
}
