import {Menu} from 'antd';
import {AppstoreAddOutlined,EnvironmentOutlined,UserOutlined,UserAddOutlined,TransactionOutlined,FireOutlined,BankOutlined ,TrophyOutlined,SettingOutlined} from '@ant-design/icons';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className='SideMenu'>
      <Menu
        onClick={(item)=>{
          navigate(item.key)
          //
        }}
         items={[
        {
          label:"Bảng Điều khiển", 
          icon:<AppstoreAddOutlined />,
          key:"/",
        },
        {
          label:"Khách hàng mới",
          icon:<UserAddOutlined />,
          key:"/customers"
        },
        {
          label:"Giao dịch lỗi", 
          icon:<TransactionOutlined />,
          key:"/transaction"
        },
        {
          label:"Giao dịch trong ngày", 
          icon:<BankOutlined />,
          key:"/dsưf"
        },
        {
          label:"Chiến dịch", 
          icon:<FireOutlined />,
          key:"/sedf"
        },
        {
          label:"Mã thưởng", 
          icon:<TrophyOutlined />,
          key:"/sdẻf"
        },
        {
          label:"Báo cáo Mã đã sử dụng", 
          icon:<TrophyOutlined />,
          key:"/sdưef"
        },
        {
          label:"Báo cáo người dùng",
          icon:<UserOutlined />, 
          key:"/sfe"
        },
        {
          label:"Báo cáo khu vực", 
          icon:<EnvironmentOutlined />,
          key:"/sdfew"
        },
        {
          label:"Danh sách tài khoản ", 
          icon:<TrophyOutlined />,
          key:"/users"
        },
        {
          label:"Cấu hình", 
          icon:<SettingOutlined />,
          key:"/ửdd"
        },
      ]}>

      </Menu> 
    </div>
  )
}

export default SideMenu;