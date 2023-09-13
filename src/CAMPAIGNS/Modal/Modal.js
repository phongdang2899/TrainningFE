import React from 'react';
import { useState } from 'react';
import { Button, Modal, Alert } from 'antd'
import './Modal.css'

import axios from 'axios';
import icons from "../utils/icons"
import { notification } from 'antd';




export const Modall = (props) => {
  // console.log('item',datas.datas.campaign_id)
  let { item, token, total, render, setRender } = props

  const [status, setStatus] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {

    setIsModalOpen(true);
  };
  const handleOk = async (e) => {
    var status1;
    if (status === "Mới") {
      var status1 = 1;
    }
    else if (status === "Đã khóa") {
      var status1 = 3;
    }
    try {
      let res = await axios.put(`http://172.23.144.1:8383/api/v1/admin/codes/status?ids[]=${item.code_id}&status=${status1}`, {},
        {
          headers: {
            'Authorization': token
          }
        });
      setRender(!render);
      setIsModalOpen(false);
      setRender(!render);

      notification.success({
        message: 'Thành công',
        description: 'Cập nhập trạng thái mã thưởng  thàng công!',

      });
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Cập nhập trạng thái mã thưởng không thàng công!'
      });
    }


  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {

    setStatus(e.target.value)

  }
  return (
    <>{
    }

      <Button className='btn-bt' onClick={showModal}>
        <icons.AiFillEye />

      </Button>
      <Modal className='Modal-slt' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <>
          <h1>Thông Tin Mã Thưởng: {total}</h1>
          <div className='body-select' >
            <select className='select-op' id="cars" onChange={handleChange} >
              <option className='option-op' value="Mới"> Mới</option>
              <option className='option-op' value="Đã khóa">Đã Khóa</option>

            </select>

          </div>

          <table className='table-body'>
            <tbody>
              <tr className='table-tr'>
                <td className='table-td-td'  >Tên chiến dịch:</td>
                <td className='table-td' >{item.campaign_name}</td>

              </tr>
              <tr>
                <td className='table-td-td'> Mã Thưởng:</td>
                <td className='table-td' >{item.code}</td>

              </tr>
              <tr>
                <td className='table-td-td'>Giá Trị:</td>
                <td className='table-td'>{item.value}</td>

              </tr>
              <tr>
                <td className='table-td-td'>Thời gian:</td>
                <td className='table-td'>-</td>

              </tr>
            </tbody>


          </table>
        </>
      </Modal>
    </>
  )
}
