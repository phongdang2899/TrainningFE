import React from 'react'
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  Skeleton, Tag, message} from "antd";  
import Swal from 'sweetalert2'
import { 
  apiGetCustomerByDate,
  apiGetCutomers,
  apiSearchCutomers,
 } from '../../api/customer'; 
import { AiOutlineSearch,AiOutlineDownload,AiFillEye} from 'react-icons/ai';
import { FaSearchengin} from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import moment from 'moment';
// npm install moment
import { CSVLink } from 'react-csv';  

// npm install --save react-toastify
// Tạo tiêu đề cho file excel
const headers = [
  { label: 'id', key: 'customer_id' },
  { label: 'Họ', key: 'first_name' },
  { label: 'Tên', key: 'last_name' },
  { label: 'Tỉnh/ Thành phố', key: 'province.name' },
  { label: 'Số CMND', key: 'id_card_number' },
  { label: 'Thời gian giao dịch', key: 'created_at' },
  { label: 'Trạng thái', key: 'status.name' }  
]; 

const Customer = ( ) => {
  const [customers,setCustomers]=useState([]); 
  const [dataSearch, setDataSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');  

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => { 
    setEndDate(value);
  }; 

  const handlePhoneChange=()=>{
    //  if(dataSearch===''){
      fetchCustomers();
    //  } 
  }
  const handleChangeInputPhoneNumber=async()=>{ 
    const dataResult = await apiSearchCutomers({search:dataSearch});
    if (dataResult.status === "OK") {
      setCustomers(dataResult.data);
    } 
    console.log(dataResult);
  }
  useEffect(()=>{
    fetchCustomers();  
  },[]); 

  const fetchCustomers =async()=>{ 
    const response = await apiGetCutomers();
    if(response?.data?.length>0) {
      setCustomers(response?.data);
    } 
  };
  const { handleSubmit, formState:{errors} }=useForm( 
    )  
  
  
  const onFilter = async () => {
    const value = {
      start_date:startDate,
      end_date:endDate
    } 
    console.log(startDate, endDate);
    console.log(value);
      const response=await apiGetCustomerByDate(value);
      if(response.status==="OK"){
        setCustomers(response.data); 
      }else{
        Swal.fire(
          'Fail',
          response.message,
          response.status,
        ).then(async()=>{
            await  fetchCustomers();
        })
        console.log(response.message);
      } 
  };
    
  const onSubmit=()=>{  
    onFilter();
  };  
  return (
    <div className='Customer px-[20px]'>
       <div className="title-customer bg-[#0ca7cd] shadow-lg shadow-[#bfbfbf] rounded-sm">
          <h2 className='text-white uppercase text-[20px] font-semibold p-[15px]'>Danh sách khách hàng</h2>
       </div>
       <div className="content">
        <div className="filter border-[#d8d8d8f2] border-b-[3px] py-[15px]"> 
          <div className="flex justify-center items-center gap-[20px] py-[10px] h-[50px]"> 
          <div name='phone' className='mb-0 relative' > 
                <input value={dataSearch} 
                  onKeyDown={e=>{ 
                    if(e.which === 13){
                      handleChangeInputPhoneNumber();
                    }}}
                    onChange={(e) => {
                    setDataSearch(e.target.value);
                    console.log(dataSearch); 
                     handlePhoneChange()
                  }} className='outline-0 px-[30px] py-[10px] rounded-[5px] shadow-md  shadow-[rgba(0, 0, 0, 0.15) 0px 5px 15px 0px]'  
                  placeholder="Nhâp tên hoặc số điện thoại" 
                  />
                 <AiOutlineSearch className='absolute top-[30%] left-[10px] text-[16px]'/> 
              </div>  
            <form className='flex gap-[10px] mr-[200px] items-center ' onSubmit={handleSubmit(onSubmit)}> 
              <div className='mb-0 px-[15px]' > 
                <label className='text-[12px] text-[#747474]' htmlFor="startdate">Từ ngày</label><br/>
                <input type="date" value={startDate}  onChange={(e) => handleStartDateChange(e.target.value)} 
                className='outline-0 border-[#d8d8d8] border-b-[2px] text-[16px] ' id='startdate' /> 
              </div> 
              
              <div className='mb-0 px-[15px]' > 
                <label className='text-[12px] text-[#747474]' htmlFor="startdate">Đến ngày</label><br/>
                <input type="date" value={endDate} onChange={(e) => handleEndDateChange(e.target.value)}
                 className='outline-0 border-[#d8d8d8] border-b-[2px] text-[16px] ' id='startdate' /> 
              </div> 
              <button  type="primary" className='flex gap-[10px] px-[15px] py-[10px] border-[1px] rounded-[5px] border-[#0000d0] text-[#0000d0] font-semibold' htmlType="submit">
               <FaSearchengin className='text-[20px] site-form-item-icon flex self-center'/> <h2>LỌC</h2>
              </button>
            </form>
            <div className="export-excel">
              <CSVLink data={customers} headers={headers} filename={'Danh-sach-khach-hang.csv'}className='flex gap-[10px] px-[15px] py-[10px] border-[1px] rounded-[5px] border-[#0000d0] text-[#0000d0] font-semibold'>
                <AiOutlineDownload className="text-[20px] site-form-item-icon flex self-center"/><h2 >Xuất Excel</h2>
              </CSVLink>
            </div>
            
          </div> 
        </div> 
       {customers?.length === 0 ? (
            <Skeleton   paragraph={{ rows: 6,}} active />
            //  <Spin className='flex justify-center pt-[100px]' tip="Loading data ...." indicator={antIcon} />
          ) : (
        <div className="data">
          <h2 className='text-black text-[16px] font-medium p-[10px]'>Tổng số kết quả : {customers?.length}</h2>  
          
            <table className="rounded-[3px] w-full p-[10px] border-[3px]">
                <thead >
                    <tr className="border-b-[1px] border-[#ccc]">
                        <th className="text-[16px] font-medium  p-[10px]">
                            ID
                        </th>
                        <th className="text-[16px] font-medium ">
                            Họ và Tên 
                        </th>
                        <th className="text-[16px] font-medium">
                            Số Điện Thoại
                        </th>
                        <th className="text-[16px] font-medium ">
                            Tỉnh/Thành Phố
                        </th>
                        <th className="text-[16px] font-medium ">
                            Số CMND
                        </th>
                        <th className="text-[16px] font-medium ">
                            Thời gian giao dịch
                        </th>
                        <th className="text-[16px] font-medium">
                            Trạng Thái
                        </th>
                        <th className="text-[16px] font-medium">
                            Chức Năng
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((item) => (
                        <tr
                            className="border-b-[1px] border-[#ccc] text-center"
                            key={item?.customer_id} 
                        >
                            <td className="text-[14px] p-[10px] ">{item?.customer_id}</td>
                            <td className="text-[14px] p-[10px]">{item?.first_name}{item?.last_name} </td> 
                            <td className="text-[14px] p-[10px]">{item?.phone_number}</td>
                            <td className="text-[14px] p-[10px]">{item?.province?.name}</td> 
                            <td className="text-[14px] p-[10px]">{item?.id_card_number}</td>  
                            <td className="text-[14px] p-[10px]">{item?.created_at}</td>  
                            <td className="text-[14px] p-[10px]"> {item?.status?.name} </td>
                            <td className="text-[14px] p-[10px]">
                                <div className="flex items-center justify-center gap-[15px]  p-[10px]"> 
                                    <Link to={`/customers/detail/${item?.customer_id}`} className="" > 
                                        <AiFillEye className="text-[#0000d0] text-[20px] font-bold cursor-pointer" />
                                    </Link>
                                     
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

export default Customer;