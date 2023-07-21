import React, { useEffect, useState } from "react";
import axios from "axios";
import './chartcss.css'
import { AiOutlineSearch } from "react-icons/ai";
import TransactionActived from "./TransactionActived";

const TransactionTable = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [transactionActivedData, setTransactionActivedData] = useState([]);
    const [filteredTransactionActivedData, setFilteredTransactionActivedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [transactionData, setTransactionData] = useState([])
    console.log("kiểm tra transactionData", transactionData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "36|QjjRab5SffZ5DglL2QTzdruIcZ8anXf5LQ2OPQZl";
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const transactionTableUrl = "http://172.31.48.1:8383/api/v1/admin/reports/transaction/day?per_page=10&page=1&start_date=2023-07-11&campaign_id=1&get_chart=0&end_date=2023-07-13";
                const transactionActivedUrl = `http://172.31.48.1:8383/api/v1/admin/reports/codes/activated?per_page=10&page=1&start_date=2023-07-11&end_date=2023-07-11&campaign_id=1`;

                const [transactionResponse, transactionActivedResponse] = await Promise.all([
                    axios.get(transactionTableUrl, config),
                    axios.get(transactionActivedUrl, config)
                ]);
                setTransactionData(transactionResponse.data.data);
                setTransactionActivedData(transactionActivedResponse.data.data);
                setFilteredData([...transactionResponse.data.data, ...transactionActivedResponse.data.data]);
                console.log("Dữ liệu chi tiết giao dịch trong ngày:", transactionResponse.data.data);
                console.log("Dữ liệu mã đã kích hoạt:", transactionActivedResponse.data.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const handleFilterClick = () => {
        if (!startDate || !endDate) {
            alert("Vui lòng chọn đầy đủ khoảng thời gian.");
            return;
        }
        // Lọc dữ liệu cho TransactionTable
        const filtered = [...transactionData, ...transactionActivedData].filter(item => {
            const transactionTime = new Date(item.time_transaction);
            return transactionTime >= new Date(startDate) && transactionTime <= new Date(endDate);
        });

        // Cập nhật dữ liệu sau khi lọc vào state filteredData
        setFilteredData(filtered);
        const filteredTransactionActived = transactionActivedData.filter(item => {
            const activatedTime = new Date(item.activated_date);
            return activatedTime >= new Date(startDate) && activatedTime <= new Date(endDate);
        });

        // Cập nhật dữ liệu sau khi lọc vào state filteredTransactionActivedData
        setFilteredTransactionActivedData(filteredTransactionActived);

    };


    return (
        <>
            <div className="transaction-dateall">
                <div className="transaction-dateall-info">
                    <div className="trasaction-start-date">
                        <div className="trasaction-start-date-info">
                            <p>Từ Ngày</p>
                            <input type="date" id="start-date" name="trip-start" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="trasaction-end-date">
                        <div className="trasaction-end-date-info">
                            <p>Đến Ngày</p>
                            <input type="date" id="end-date" name="trip-start" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="trasaction-handle">
                        <button className="filter-button" onClick={handleFilterClick}><AiOutlineSearch />Lọc</button>
                    </div>
                </div>
            </div>
            <div className="transaction">
                <div className="transaction-during">
                    <div className="transaction-during-date">
                        <p>Danh Sách Các Giao Dịch Trong Ngày</p>
                    </div>
                    <div className="transaction-during-name">
                        <table>
                            <tr>
                                <th>Mã số giao dịch</th>
                                <th>Tên người dùng</th>
                                <th>Số điện thoại</th>
                                <th>Tổng giá trị</th>
                                <th>Thời gian giao dịch</th>
                                <th>Trạng thái</th>
                            </tr>
                            {filteredData.map((item, index) => {
                                return (
                                    <tbody key={item.campaign_id}>
                                        <tr >
                                            <td>{item.transaction_id}</td>
                                            <td>{item.first_name}<br />{item.last_name}</td>
                                            <td>{item.phone_number}</td>
                                            <td>{item.total_value}</td>
                                            <td>{item.time_transaction}</td>
                                            <td>{item.status.name}</td>

                                        </tr>
                                    </tbody>
                                )
                            })

                            }

                        </table>
                    </div>
                </div>
                <TransactionActived filteredData={filteredTransactionActivedData} />
            </div >
        </>
    );
}
export default TransactionTable;