import React, { useEffect } from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";  
import { LoadingOutlined } from '@ant-design/icons';
import { apiPutUsersById, apiPostUsers, apiGetUsers, apiGetUsersById } from '../../api/user'; 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useParams,useNavigate} from 'react-router-dom'; 
import Swal from 'sweetalert2'
const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Tên tài khoản phải có ít nhất 3 ký tự")
    .max(20, "Tên tài khoản không được dài hơn 20 ký tự")
    .required("Tên tài khoản không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu pải có ít nhất 8 kí tự")
    .required("Mật khẩu không được để trống"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Mật khẩu không được bỏ trống'),
  gender: yup 
    .number()
    .required('Giới tính không được để trống'),
  phone_number: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Số điện thoại không được để trống"), 
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email không được để trống"),
  first_name: yup
    .string() 
    .required("Họ và tên đệm không được để trống"),
  last_name: yup
    .string() 
    .required("Tên không được để trống"),
});
const antIcon = ( <LoadingOutlined  style={{ fontSize: 24, }} spin />);
const FormUser = () => {  
  const {id} = useParams();
  const navigate = useNavigate();

  const PutUsersById= async(id, data)=>{ 
    const response = await apiPutUsersById(id, data);
        if(response.status==="OK"){
          Swal.fire(
            'Success',
            response.message,
            response.status,
          ).then(() => { 
            navigate("/users");
          })
        } else {
          Swal.fire(
            'Fail',
            response.message,
            response.status,
          )
        }  
    } 
    const [userById,setUserById]=useState([]); 
    const fetchDetail = async () => {
      console.log(id);
      const datauserid = await apiGetUsersById(id);
      if(datauserid?.status==="OK"){
        setUserById(datauserid.data);
        console.log(userById);
      } 
    } 
    useEffect( () => {
      fetchDetail();
    }, [])

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    defaultValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })   
  // 
  const onSubmit = (data) => { 
    if (id) { 
      PutUsersById(id, data); 
    } else {
      createUser(data); 
    }
  }; 
  const createUser= async(data)=>{ 
    const response = await apiPostUsers(data);
    if (response.status ==="OK") { 
      Swal.fire(
        'Success',
        'Tạo tài khoản thành công',
        'success'
      ).then(async() => { 
        navigate("/users");
        await apiGetUsers();
      })
    } else {
      Swal.fire(
        'Fail',
        'Tạo tài khoản không thành công',
        'error'
      )
    }  
  }
  
  return (
    <div className='Customer px-[20px]'>
       <div className="rounded-[10px] border-[#d8d8d8f2] border-[3px] p-[15px]">
        <div className="title-customer flex justify-between  bg-[#0ca7cd] shadow-lg shadow-[#bfbfbf] rounded-sm p-[15px]">
            <h2 className='text-white text-[18px] font-nomal '>Chỉnh Sửa Người Dùng</h2> 
        </div>
        <form onSubmit={handleSubmit(onSubmit)}   className="details-input p-[15px]"> 
          <div className="grid grid-cols-2">
            <div className="state"  > 
                <h1 className='text-bold text-[16px]'>Trạng thái</h1>  
                <select name="status" defaultValue={userById?.status||0}
                 {...register("status")}  className='outline-0'  >
                  <option  value="0">Hoạt động</option>
                  <option value="1">Đã khóa</option> 
                </select>
            </div>
            <div className="state" > 
                <h1 className='text-bold text-[16px]'>Chức vụ</h1> 
                <select name="role_id" defaultValue={userById?.role_id||3}
                 {...register("role_id")}  className='outline-0' >
                  {/* <option value="1">Quản trị viên</option> */}
                  <option defaultValue={userById?.role_id||2} value={2}>Điều hành viên</option>
                  <option defaultValue={userById?.role_id||3} selected value={3}>Thành viên</option>
                  <option defaultValue={userById?.role_id||4} value={4}>Hệ thống</option>
                </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[30px] mt-[70px]">
              <input name='gender' value="0"
              {...register("gender", { required: true })} 
              className='hidden' 
             type="text"  /> 
            <div className="state" name="username"   >
              <input name='username' 
               onChange={(e) =>
                setValue("username", e.target.value)
                }
              defaultValue={userById?.username || ''}
              {...register("username")} 
              className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]' 
             type="text" placeholder='Tài khoản người dùng' />
              <p className='text-[#ff0000]'>{errors.username?.message}</p>
            </div>
            <div className="state"   >
              <input name='first_name' defaultValue={userById?.first_name||''}
               {...register("first_name", { required: true })} 
               className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]' type="text" placeholder='Họ và Tên đệm' />
              <p className='text-[#ff0000]'>{errors.first_name?.message}</p>
            </div>
            <div className="state" >
              <input name='last_name' defaultValue={userById?.last_name||''}
               {...register("last_name", { required: true })} 
              className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]' type="text" placeholder='Tên' />
              <p className='text-[#ff0000]'>{errors.last_name?.message}</p>
            </div> 
          </div>
          <div className="grid grid-cols-2 gap-[30px] mt-[50px]">
            <div className="state" >
              <input name="email" defaultValue={userById?.email||''}
               {...register("email", { required: true })} 
              className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]' type="Email" placeholder='Email' />
               <p className='text-[#ff0000]'>{errors.email?.message}</p>
            </div>
            <div className="state"  >
              <input name='phone_number' defaultValue={userById?.phone_number||''}
               {...register("phone_number", { required: true })} className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]'type="text" placeholder='Số điện thoại' />
                <p className='text-[#ff0000]'>{errors.phone_number?.message}</p>
            </div>
              
          </div>
          <div className="grid grid-cols-2 gap-[30px] mt-[50px]">
            <div className="state"  > 
              <input  name="password" defaultValue={userById?.password ||''}
               {...register("password", { required: true })} 
                className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]' type="password" placeholder='Mật khẩu(Nhập tối thiểu 8 ký tự).'
                autocomplete="new-password" />
              <p className='text-[#ff0000]'>{errors.password?.message}</p>
            </div>
            <div className="state" >
              <input name='password_confirmation' defaultValue={userById.password}
               {...register("password_confirmation", { required: true })} 
              className='w-[100%] py-[5px] outline-0 border-[#d8d8d8] border-b-[2px]' type="password" placeholder='Xác nhận lại mật khẩu (Nhập tối thiểu 8 ký tự).' 
              autocomplete="new-password"/>
              <p className='text-[#ff0000]'>{errors.password_confirmation?.message}</p>
            </div> 
          </div>
           
          <div className="flex justify-center items-center mt-[30px] gap-[5px]" >
              <button className='bg-[#0ca7cd] text-[#fff] px-[25px] py-[10px] rounded-[3px]' type="submit">Lưu</button>
              <a href="/users" className='bg-[#C0C0C0] text-[#fff] px-[25px] py-[10px] rounded-[3px] text-black'>Hủy</a>
          </div>  
        </form>

       </div>

    </div>
  )
}

export default FormUser;