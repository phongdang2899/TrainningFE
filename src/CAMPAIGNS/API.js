import React from 'react'
import ReactPaginate from 'react-paginate';
import { Input, Button, Spin } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Campaigns.css'
import { Modall } from './Modal/Modal';
import icons from './utils/icons';
import { Admin } from './UseAdmin/Admin';
import * as XLSX from 'xlsx';


export const API = () => {
    const [data, setData] = useState([])
    const [dataInput, setDataInput] = useState([])
    // const [search, setsearch] = useState('')

    const [render, setRender] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const token = 'Bearer 28|xXKfSJsRAbkvdXAqLPFQrP9Elwbap026I7z7CFVH'
    const dataCode = `http://172.23.144.1:8383/api/v1/admin/codes?page=${page}&per_page=50`
    const [loading, setloading] = useState(true)

    useEffect(() => {

        /////codde
        async function fetchData() {
            try {
                let res = await axios.get(dataCode, {
                    headers: {
                        'Authorization': token
                    }
                })

                console.log('res', res.data.meta.total)
                setTotal(res.data.meta.total)
                setData(res.data.data)
                setDataInput(res.data.data)
                setloading(false)

            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [render, page]);
    /// của campaings
    console.log('datainput', dataInput)
    const onchangeinput = (e) => {
        // setsearch(e.target.value)
        // let currentData = data.filter(item => item.code.includes(e.target.value));
        // setData(currentData);
        if (e.target.value === "") {
            setData(dataInput);
        }
        else {
            let currentData = data.filter(item => item.code.includes(e.target.value));
            setData(currentData);
        }
    }

    const onClickXoa = async (code_id, campaign_id) => {
        console.log("Check code id campaign ", campaign_id, "code", code_id)

        let res = await axios.delete(`http://172.23.144.1:8383/api/v1/admin/codes?ids[]=${code_id}&campaign_id=${campaign_id}`,
            {
                headers: {
                    'Authorization': token
                }

            })
        alert(res.data.status)
        console.log(">>res dêlete", res)
        setRender(!render);
    };

    /// lấy theo chiến l ược

    const handleChange = (e) => {
        const value = (e.target.value)
        console.log("check value", value)
        let current = data;
        if (value === "value") {
            setData(dataInput)
        }
        else {
            current = current.filter(item => item.campaign_name === value)
            setData(current)
        }

    }
    //// render lại giao diện
    // const handlerender = () => {
    //     setRender(!render)
    // }
    const handlePageClick = (event) => {

        console.log(event.selected + 1)
        setPage(event.selected + 1)
    }
    /// Trạng thái ??
    const handleChangeStatus = (e) => {
        const value = (e.target.value)
        console.log("check value", value)
        let current = data;
        if (value === "value") {
            setData(dataInput)
        }
        else {
            current = current.filter(item => item.status.name === value)
            setData(current)
        }
    }
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data); // chuyển dữ liệu thành định dạng Excel
        const workbook = XLSX.utils.book_new(); // tạo workbook mới
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách khách hàng"); // thêm worksheet vào workbook
        XLSX.writeFile(workbook, "danh-sach-khach-hang.xlsx"); // tạo file Excel và tải xuống
    }
    return (
        <div>
            {console.log('data', data)}
            <div >
                <h2 className='title-title'>DANH SÁCH MÃ THƯỞNG  </h2>
            </div>
            <div className='button-check'>
                {/* <Button danger>Xóa Mã Thưởng </Button> */}

                <div className='Body-container'>
                    <div className="select-cd" htmlFor="cars">Chọn Chiến dịch :
                        <select id="cars" onChange={handleChange} >
                            <option > Chiến dịch 01</option>
                            <option  > Chiến dịch 02 </option>
                            <option  > Chiến dịch 03 </option>
                            <option > Chiến dịch 04 </option>
                            <option value="value">
                                tất cả
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    {/* <input className='btn-input' onChange={(e) => onchangeinput(e)}></input> */}
                    <Input onChange={(e) => onchangeinput(e)} size="large" placeholder="Nhập Mã Thưởng" prefix={<SearchOutlined />} />
                    {/* <button onClick={onClickbutton} > Button </button> */}
                </div>
                <div className='Body-container'>

                    <div className="select-cd" htmlFor="cars">Chọn Trạng Thái:
                        <select id="cars" onChange={handleChangeStatus}   >
                            <option  > Mới</option>
                            <option  > Đã khóa </option>
                            <option value="value">
                                tất cả
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="select-Xuat" htmlFor="cars">Xuất Excel:
                        <Button type="primary" danger onClick={exportExcel} >
                            <UploadOutlined />
                        </Button>
                    </div>
                    {/* <Button type="primary" danger onClick={exportExcel} >
                        <UploadOutlined />
                    </Button> */}
                </div>
                <div>
                    <div className="select-Admin" htmlFor="cars">Admin:
                        <Admin />
                    </div>
                </div>
            </div>
            {/* <button onClick={() => { setShow(true) }}> BUTTON </button> */}
            <h1 className='title-title-h1'>Tổng Số kết quả :{total} </h1>
            <table  >
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Tên Chiến Dịch</th>
                        <th>Mã thưởng </th>
                        <th>Giá trị </th>
                        <th>Trạng Thái  </th>
                        <th>Chức năng </th>
                    </tr>
                </tbody>
                {loading === false && data.map((item) => {
                    return (
                        <tbody key={item.code_id}>
                            <tr >
                                <td>{item.code_id}</td>
                                <td>{item.campaign_name}</td>
                                <td>{item.code}</td>
                                <td>{item.value}</td>
                                <td>{item.status.name}</td>
                                <td>
                                    <Modall
                                        item={item}
                                        token={token}
                                        render={render}
                                        setRender={setRender}
                                        total={total}
                                    />
                                    <Button className='btn-bt' danger onClick={() => onClickXoa(item.code_id, item.campaign_id)}><icons.AiOutlineDelete /> </Button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })
                }

            </table>
            <div className='loading-api'>
                {loading === true &&

                    <Spin size="large" className='pin'>
                        {/* ... */}
                    </Spin>

                }</div>
            <ReactPaginate
                nextLabel="Next  >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={4}
                pageCount={total / 50}
                previousLabel="< Back"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>

    )
}
