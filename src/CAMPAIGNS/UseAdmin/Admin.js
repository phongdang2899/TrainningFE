import React from 'react'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { ModalAdmin } from './ModalAdmin/ModalAdmin';
import { UserAddOutlined } from '@ant-design/icons';

export const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState([])
    console.log('userdata', user)
    const token = 'Bearer 31|pSMsrWjx53XsaIv0s7myNv0dJLiz9CwLm4o2RJlM'
    const DataUse = `http://172.23.144.1:8383/api/v1/admin/users`
    const [render, setRender] = useState(false)

    useEffect(() => {

        /////codde
        async function fetchData() {
            try {
                let res = await axios.get(DataUse, {
                    headers: {
                        'Authorization': token
                    }
                })
                setUser(res.data.data)
            }
            catch (error) {
                console.error(error);
            }

        }
        fetchData()
    }, [render]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button style={{ width: '50px' }} type="primary" onClick={showModal} icon={<UserAddOutlined />} />

            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <div>
                        <h1 className='title-tetle-h1'> Thông Tin Tài Khoản</h1>
                    </div>
                    <table  >
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tên Đăng Nhập</th>
                                <th>Tên </th>
                                <th>Họ Và Tên Đệm </th>
                                <th> Số Điện Thoại  </th>
                                <th>Email </th>
                                <th>Chi Tiết </th>
                            </tr>
                        </tbody>
                        {user.map((item, index) => {
                            return (
                                <tbody key={item.user_id}>
                                    <tr >
                                        <td>{item.user_id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.phone_number}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <ModalAdmin
                                                item={item}
                                                token={token}
                                                render={render}
                                                setRender={setRender}
                                            />
                                        </td>
                                    </tr>
                                </tbody>

                            )


                        })

                        }

                    </table>
                </div>
            </Modal>
        </>
    )
};
