import  axios from "../axios"; 
export const apiGetUsers=()=> 
    axios({
        url:"users/",
        method:"GET"
    });
export const apiPostUsers=(data)=> 
    axios({
        url:"users/",
        method:"POST",
        data, 
    });
export const apiPutUsersById=(id, data)=> 
    axios({
        url: `users/` + id,
        method: "PUT",
        data,
    });
export const apiDeleteUsers=(id)=> 
    axios({
        url: `users/`,
        method: "DELETE",
        params: id
    });
export const apiGetUsersById=(id)=> 
    axios({
        url: `users/` + id,
        method: "GET",
    });
export const apiSearchUsers=(search)=> 
    axios({
        url:"users/",
        method:"GET",
        params:search
    });