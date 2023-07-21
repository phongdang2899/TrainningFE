import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import {  UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ModalAdmin.css'

export const ModalAdmin = (props) => {
    let { item, render, setRender, token } = props
    // const [user, setUser] = useState([])
    console.log('userdata', item)
    const [firstname, setFirstName] = useState(item.first_name)
    const [lastname, setLastName] = useState(item.last_name)
    const [phonenumber, setPhoneNumber] = useState(item.phone_number)
    const [Email, setEmail] = useState(item.email)
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailError, setEmailError] = useState("");



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e) => {
        let res = await axios.put(`http://172.23.144.1:8383/api/v1/admin/users/${item.user_id}?role_id=${item.role.role_id}&status=${item.status.id}&first_name=${firstname}&phone_number=${phonenumber}&gender=${item.gender}&last_name=${lastname}&email=${Email}`, {}, {
            headers: {
                'Authorization': token
            }
        });
        alert('Thay đổi Thành Công ')

        setRender(!render)

        setIsModalOpen(false);
    };

    const handleCancel = () => {

        setIsModalOpen(false);
    };
    const handleChangeFirtName = (event) => {
        const value = event.target.value;
        setFirstName(value);
        if (!value.trim()) {
            setFirstNameError("Vui lòng nhập tên của bạn.");
        } else {
            setFirstNameError("");
        }
    };

    const handleChangeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
        if (!value.trim()) {
            setLastNameError("Vui lòng nhập họ của bạn.");

        }
        else {
            setLastNameError("");
        }
    };

    const handleChangePhone = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        if (!value.match(/^\d{10}$/)) {
            setPhoneNumberError("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
        } else {
            setPhoneNumberError("");
        }


    }
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailError("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
        } else {
            setEmailError("");
        }


    }

    return (
        <div>
            <Button onClick={showModal} type="primary" shape="circle" icon={<UserAddOutlined />} />

            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h1>Thông Tin Tài Khoản</h1>

                {/* <p> Tên Đăng Nhập : {user.username}  </p>
                <p> Tên:   <input type="text" value={user.first_name} /> </p>
                <p> Họ Và Tên Đệm : <input type="text" value={user.last_name} /> </p>
                <p> Số Điện Thoại: <input type="text" value={""} /> </p>
                <p> Email: <input type="text" value={user.email} /> </p> */}



                <div className="container-contai">

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="fname">Tên Đăng Nhập :</label>
                        </div>
                        <div className="col-75">
                            <p className='fname-name'>{item.username}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lname">Tên :</label>
                        </div>
                        <div className="col-75">
                            <input onChange={handleChangeFirtName} value={firstname} type="text" id="lname" name="lastname" />
                            {firstNameError && <span style={{ color: "red" }}>{firstNameError}</span>}
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lname">Họ Và Tên Đệm :</label>
                        </div>
                        <div className="col-75">
                            <input onChange={handleChangeLastName} value={lastname} type="text" id="lname" name="lastname" placeholder="" />
                            {lastNameError && <span style={{ color: "red" }}>{lastNameError}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lname">Số Điện Thoại :</label>
                        </div>
                        <div className="col-75">
                            <input onChange={handleChangePhone} value={phonenumber} type="text" id="lname" name="lastname" />
                            {phoneNumberError && <span style={{ color: "red" }}>{phoneNumberError}</span>}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="lname">Name :</label>
                        </div>
                        <div className="col-75">
                            <input onChange={handleChangeEmail} value={Email} type="text" id="lname" name="lastname" />
                            {emailError && <span style={{ color: "red" }}>{emailError}</span>}
                        </div>
                    </div>



                </div>


            </Modal>
        </div>
    )
}
