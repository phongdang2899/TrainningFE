import  axios from "../axios"; 
export const apiGetCutomers=()=> 
    axios({
        url:"customers/",
        method:"GET",
         
    });
export const apiSearchCutomers=(search)=> 
    axios({
        url:"customers/",
        method:"GET",
        params:search
    });
export const apiGetCustomerByDate = ({start_date, end_date}) => 
    axios({
        url: `customers?start_date=${start_date}&end_date=${end_date}`,
        method: "GET"
    });
export const apiGetCustomerById=(id)=> 
    axios({
        url: `customers/` + id,
        method: "GET",
    });
export const apiPatchCustomerStatus = (id, status) => 
    axios({
        url: `customers/${id}/approve?status=${status}`,
        method: "PATCH"
    });
 