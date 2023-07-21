import React, { useEffect, useState } from "react";
import axios from "axios";

import './chartcss.css'

const TransactionActived = ({ filteredData }) => {
    const [TransactionActived, setTransactionActived] = useState([])
    console.log("kiểm tra TransactionActived", TransactionActived)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "36|QjjRab5SffZ5DglL2QTzdruIcZ8anXf5LQ2OPQZl";

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const url = "http://172.31.48.1:8383/api/v1/admin/reports/codes/activated?per_page=10&page=1&start_date=2023-07-11&end_date=2023-07-11&campaign_id=1";
                const { data } = await axios.get(url, config);
                setTransactionActived(data.data)
                console.log("kiểm tra setTransactionActived của chiến dịch", data)

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="transaction-code-list">
            <div className="transaction-code">
                <p>Danh Sách Mã Đã Sử Dụng</p>
            </div>
            <div className="transaction-during-name">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Họ và Tên Khách Hàng</th>
                        <th>Số điện thoại</th>
                        <th>Mã kích hoạt</th>
                        <th>Thời gian kích hoạt</th>

                    </tr>
                    {filteredData.map((item, index) => {
                        return (
                            <tbody key={item.code_id}>
                                <tr >
                                    <td>{item.code_id}</td>
                                    <td>{item.customer.first_name}{item.customer.last_name}</td>
                                    <td>{item.customer.phone_number}</td>
                                    <td>{item.code}</td>
                                    <td>{item.activated_date}</td>


                                </tr>
                            </tbody>
                        )
                    })

                    }
                </table>
            </div>
        </div>
    )
}
export default TransactionActived