import React, { useEffect } from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form,Input, Button, Space,Table, Skeleton, Tag ,Spin} from "antd";
import { SearchOutlined ,PlusCircleFilled ,LoadingOutlined } from '@ant-design/icons'; 
import { FaPen} from 'react-icons/fa';
import { MdDeleteForever} from 'react-icons/md';
import { AiOutlineSearch} from 'react-icons/ai';
import { apiDeleteUsers, apiGetUsers, apiGetUsersById, apiSearchUsers } from '../../api/user';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import debounce from '../../debounce';
const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên hoặc tên đăng nhập"), 
});  
const User = () => { 
  const [users,setUsers]=useState([]);
  const [dataSearch,setDataSearch]=useState(''); 

  useEffect(()=>{
    fetchUsers();  
  },[]); 
  
  const fetchUsers =async()=>{ 
    const users = await apiGetUsers();
    if(users?.data.length>0) {
      setUsers(users?.data);
    } 
  };
  const { register, handleSubmit,formState:{errors} }=useForm({resolver:yupResolver(schema)}) 
    
   const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

   const handleChangeNullDataSearch=()=>{
    if(!dataSearch){
    console.log("data search k co");
    }
    else{fetchUsers();}
   }
   

   const handleChangeInputSearch=async()=>{
      const response= await apiSearchUsers({search:dataSearch});
      const debouncedSearch = debounce(apiSearchUsers, 500);
      if(response.status==="OK"){
        setUsers(response.data);
        debouncedSearch(response.data);
      }
      // console.log(response);
   }
  

   const DeleteUsers= async(id)=>{ 
    Swal.fire({
      title: "Bạn có chắc muốn xóa tài khoản này không?",
      text: "Bạn sẽ không thể lấy lại được thông tin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, chắc chắn rồi!",
      }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await apiDeleteUsers(id);
            console.log("delete"+response);
              if (response.status === "OK") {
                  Swal.fire(
                      "Đã xóa tài khoản!",
                      "Xóa tài khoản thành công.",
                      "success"
                  ).then(async () => {
                      await fetchUsers();
                  });
              } else {
                  Swal.fire("Oops!", `${response?.message}`, "error");
              }
          }
      }); 
    }  
// console.log(users);
  return (
    <div className='Customer px-[20px]'>
       <div className="title-customer flex justify-between  bg-[#0ca7cd] shadow-lg shadow-[#bfbfbf] rounded-sm p-[15px]">
          <h2 className='text-white uppercase text-[20px] font-semibold '>Danh sách tài khoản</h2>
          <Button type="primary" href='/users/create' className='items-center flex text-[#0ca7cd] font-semibold bg-[#fff]'>
          <PlusCircleFilled />  THÊM MỚI
         </Button>
       </div>
       <div className="content">
        <div className="filter border-[#d8d8d8f2] border-b-[3px]"> 
          <div className="flex justify-center items-center py-[20px] h-[60px]">   
              <div className='mb-0 p' > 
                   <Input size="large" value={dataSearch} onKeyDown={(e)=>{
                    if(e.which===13){
                      handleChangeInputSearch();
                    }}} onChange={(e) => {
                      setDataSearch(e.target.value);
                      console.log(dataSearch); 
                      handleChangeNullDataSearch()
                    }}  
                      className="w-[300px] outline-0 px-[15px] py-[10px] rounded-[5px] shadow-md  shadow-[rgba(0, 0, 0, 0.15) 0px 5px 15px 0px]"
                    placeholder="Nhập họ tên hoặc tên đăng nhập"
                    prefix={<SearchOutlined />}/>
            </div> 
          </div> 
        </div>
        {/* {console.log(users)} */}
        {users?.length === 0 ? (
            <Skeleton   paragraph={{ rows: 6,}} active />
            //  <Spin className='flex justify-center pt-[100px]' tip="Loading data ...." indicator={antIcon} />
          ) : (
        <div className="data">
          <h2 className='text-black text-[16px] font-medium p-[10px]'>Tổng số kết quả : {users?.length}</h2>  
          
            <table className="rounded-[3px] w-full p-[10px] border-[3px]">
                <thead >
                    <tr className="border-b-[1px] border-[#ccc]">
                        <th className="text-[16px] font-medium  p-[10px]">
                            ID
                        </th>
                        <th className="text-[16px] font-medium ">
                            Tên Đăng Nhập 
                        </th>
                        <th className="text-[16px] font-medium">
                            Ngày Giờ Khởi Tạo
                        </th>
                        <th className="text-[16px] font-medium ">
                            Họ và Tên Người dùng
                        </th>
                        <th className="text-[16px] font-medium ">
                            Nhóm Quyền
                        </th>
                        <th className="text-[16px] font-medium ">
                            Trạng thái
                        </th>
                        <th className="text-[16px] font-medium">
                            Chức Năng
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((item) => (
                        <tr
                            className="border-b-[1px] border-[#ccc] text-center"
                            key={item?.user_id} 
                        >
                            <td className="text-[14px] p-[10px] ">{item?.user_id}</td>
                            <td className="text-[14px] p-[10px]">{item?.username}</td>
                            <td className="text-[14px] p-[10px]">{item?.created_at}</td>
                            <td className="text-[14px] p-[10px]">{item?.last_name} {item?.first_name}</td> 
                            <td className="text-[14px] p-[10px]">{item?.role.name}</td>  
                            <td className="text-[14px] p-[10px]"> {item?.status?.name} </td>
                            <td className="text-[14px] p-[10px]">
                                <div className="flex items-center justify-center gap-[15px]  p-[10px]"> 
                                    <Link to={`/users/edit/${item?.user_id}`} className="" >
                                      {/* onClick={() => handleClickDetail(item?.user_id) } */}
                                        <FaPen className="text-[#757575] text-[15px] font-bold cursor-pointer" />
                                    </Link>
                                    <div className="" onClick={()=>DeleteUsers(item?.user_id)}>
                                        <MdDeleteForever className="text-[red] text-[20px] font-bold cursor-pointer" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
         )}
       </div>
    </div>
  )
}

export default User;