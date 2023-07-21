import React, { useEffect } from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";  
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';  
import {useParams,useNavigate ,useLocation } from 'react-router-dom'; 
import Swal from 'sweetalert2'
import { apiGetCustomerById, apiPatchCustomerStatus } from '../../api/customer';  
const antIcon = ( <LoadingOutlined  style={{ fontSize: 24, }} spin />);

const FormCustomer = () => {   
  const {id} = useParams();
  const navigate = useNavigate(); 
   
    const [customerById,setCustomerById]=useState([]); 
    const [codeGift,setCodeGift]= useState([])


    const fetchDetail = async () => {
      console.log(id);
      const datacustomerid = await apiGetCustomerById(id);
      if(datacustomerid?.status==="OK"){
        setCustomerById(datacustomerid.data);
        console.log(customerById);
      } 
    }
    const PatchCustomerStatus= async()=>{
        console.log(id);
        const statusState = await apiPatchCustomerStatus(id, 1);
        if(statusState.status==="OK"){
            Swal.fire(
              'Success',
              statusState.message,
              'success'
            ).then( async() => { 
              setCodeGift(statusState.codes)
               await fetchDetail();
               
            })
          } else {
            Swal.fire(
              'Fail',
              statusState.message,
              'error'
            ) 
            setCodeGift(statusState.codes)
          } 
         console.log(statusState);
         console.log(codeGift);
    }
    useEffect( () => {
      fetchDetail();
    }, [])

  const {
    register, 
    handleSubmit,
    setValue, 
    defaultValue,
    watch,
    formState: { errors },
  } = useForm({ 
  })   
  const handleClickGoBack = () => {
      navigate("/customers/")
  };
  const onSubmit = () => {   
    PatchCustomerStatus();  
  }; 
//   const createUser= async(data)=>{ 
//     const response = await apiPostUsers(data);
//     if (response.status ==="OK") { 
//       Swal.fire(
//         'Success',
//         'Tạo tài khoản thành công',
//         'success'
//       ).then(async() => { 
//         navigate("/users");
//         await apiGetUsers();
//       })
//     } else {
//       Swal.fire(
//         'Fail',
//         'Tạo tài khoản không thành công',
//         'error'
//       )
//     }  
//   }
  
  return (
    <div className='Customer px-[20px]'>
       <div className="rounded-[10px] border-[#d8d8d8f2] border-[3px] p-[15px]">
        <div className="title-customer flex justify-between  bg-[#0ca7cd] shadow-lg shadow-[#bfbfbf] rounded-sm p-[15px]">
            <h2 className='text-white text-[18px] font-nomal '>Thông tin người dùng #1</h2> 
        </div>
        <form onSubmit={handleSubmit(onSubmit)}   className="details-input p-[15px]">   
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px] border-t-[1px]">
            <p>Số điện thoại</p>
            <p>{customerById?.phone_number|| '-'}</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px] ">
            <p>Họ và Tên</p>
            <p>{customerById?.first_name || ''}{ customerById?.last_name || '-'}</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px]  ">
            <p>Giới tính</p>
            <p>{customerById?.gender|| '-'}</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px]  ">
            <p>Địa chỉ</p>
            <p>{customerById?.address||"-" }</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px]  ">
            <p>Tỉnh/Thành Phố</p>
            <p>{customerById?.province?.name|| '-'}</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px]  ">
            <p>CMND/CCCD</p>
            <p>{customerById?.phone_number||'-'}</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px]  ">
            <p>Nhãn hàng</p>
            <p>{customerById?.brand_name|| "-"}</p> 
          </div>  
          <div className="flex justify-around py-[10px] outline-0 border-[#d8d8d8] border-b-[1px]  ">
            <p>Trạng thái</p>
            <p>{customerById?.status?.name||'-'}</p> 
          </div>  
          <div className="flex justify-around py-[10px]">
            <p></p>
            <button className='uppercase bg-[#0ca7cd] text-[#fff] px-[25px] py-[10px] rounded-[3px]' type="submit">Duyệt Và Top-Up</button> 
          </div>  
          {/* danh sách mã thưởng sau khi duyệt */}
          {codeGift.length===0?(
            <div></div>
          ):(
            <div className='rounded-[10px] border-[#d8d8d8f2] border-[2px] p-[10px] max-w-[78%]'>
            <h2 className='font-bold pb-[18px]'>Thông Tin Chi Tiết Các Mã Thưởng</h2>
           <div className='rounded-[10px] border-[#d8d8d8f2] border-[2px] p-[15px]'>
           <table class="table-fixed w-[100%]">
               <thead className='border-[#d8d8d8f2] border-b-[2px]  '>
                   <tr >
                       <th className='text-left'>Tên mã</th>
                       <th className='text-left'>Giá trị mã</th>
                       <th className='text-left'>Trạng thái của mã</th>
                   </tr>
               </thead>
               <tbody >
                 {codeGift?.map((item, index)=>{
                   return  <tr key={index}>
                       <td>{item.name}</td>
                       <td>{item.value}</td>
                       <td>{item.status.name}</td>
                   </tr> 
                 })}
                 
               </tbody>
               </table>
           </div>
         </div> 
          )}
          <div className="flex justify-center items-center mt-[30px] gap-[5px]" > 
              <button type="button" onClick={() =>handleClickGoBack()} className='bg-[#C0C0C0] uppercase text-[#fff] px-[25px] py-[10px] rounded-[3px] text-black'>Trở về</button>
          </div>  
        </form>

       </div>

    </div>
  )
}

export default FormCustomer;