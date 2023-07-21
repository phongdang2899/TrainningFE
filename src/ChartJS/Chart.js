import React from "react";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from 'react-chartjs-2'
import { useState, useEffect } from "react";
import './chartcss.css'
import { AiOutlineSearch } from "react-icons/ai";
import TransactionTable from "./Transaction";


ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
)

var paraDate;
const Page = () => {
    //khởi tạo biến với giá trị ban đầu null
    const [chartData, setChartData] = useState(null);
    const [chartDataMonth, setChartDataMonth] = useState(null);
    const getChartDate = async () => {
        var arrHour = new Array(24);
        var arrNew = new Array(24);
        var arrDate = [];

        const token = "36|QjjRab5SffZ5DglL2QTzdruIcZ8anXf5LQ2OPQZl";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        // var paraDate = '2023-07-11';
        const url = "http://172.31.48.1:8383/api/v1/admin/reports/transaction/day?get_chart=1&date=" + paraDate + "&campaign_id=1";
        console.log("click url", url)
        const data1 = await axios.get(url, config);
        console.log(data1);
        const listHour = data1.data.data_transaction.date.all;
        console.log("kiểm tra dữ liệu thành công", listHour)
        const listHourNew = data1.data.data_transaction.date.new;
        console.log("kiểm tra dữ liệu mới ", listHourNew)

        listHour.map(e => {
            arrHour[e.hour] = e.num;
        });
        listHourNew.map(e => {
            arrNew[e.hour] = e.num
        });

        // const listDate = data1.data.data_transaction.month.all;
        var listLabelHour = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];
        console.log("xử lý listLabelHour", listLabelHour)
        console.log("xử lý arrh", arrHour)
        return {
            labels: listLabelHour,
            datasets: [{
                label: '# of votes',
                data: arrHour,
                backgroundColor: [
                    'rgba(162,235,54)',
                    // 'rgba(54,162,235,0.2)',
                    // 'rgba(255,206,86,0.2)',
                    // 'rgba(75,192,192,0.2)',
                    // 'rgba(153,102,255,0.2)',
                    // 'rgba(255,159,64,0.2)',

                ],

            }, {
                label: listLabelHour,
                data: arrNew,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',

            }]
        };
    }
    const getChartMonth = async (defaultMonth = null) => {
        const token = "36|QjjRab5SffZ5DglL2QTzdruIcZ8anXf5LQ2OPQZl";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        // var paraDate = '2023-07-11';

        const monthInput = document.getElementById('month-input');
        var selectedMonth;
        if (defaultMonth) {
            selectedMonth = defaultMonth;
        }
        else {
            selectedMonth = monthInput.value;
        }
        var [year, month] = selectedMonth.split('-');
        month = parseInt(month, 10);
        const url = "http://172.31.48.1:8383/api/v1/admin/reports/transaction/day?get_chart=1&month=" + month + "&campaign_id=1";
        console.log("click url", url)
        const data1 = await axios.get(url, config);
        console.log(data1);
        console.log("kiểm tra month", selectedMonth)
        var listLabelDate = getDaysInMonth(month, year);

        var countDate = listLabelDate.length;
        var arrDate = new Array(countDate);
        const listDate = data1.data.data_transaction.month.all;
        var arrNew = new Array(countDate);
        const ListDateNew = data1.data.data_transaction.month.new;
        console.log("kiểm tra dữ liệu mới của tháng", ListDateNew)
        // Duyệt qua mảng listDate
        listDate.map(e => {
            listLabelDate.forEach((day, index) => {
                // Kiểm tra nếu ngày trong listLabelDate khớp với ngày trong phần tử e của listDate
                if (day === e.date) {
                    console.log('ngay', day);
                    arrDate[index] = e.num;
                }
            });
        })
        ListDateNew.map(e => {
            listLabelDate.forEach((day, index) => {
                if (day === e.date) {
                    console.log('ngay', day);
                    arrNew[index] = e.num;
                }
            });
        })
        console.log("danh sach ngay", listLabelDate)
        return {
            labels: listLabelDate,
            datasets: [{
                label: '# of votes',
                data: arrDate,
                backgroundColor: [
                    'rgba(162,235,54)',
                    // 'rgba(54,162,235,0.2)',
                    // 'rgba(255,206,86,0.2)',
                    // 'rgba(75,192,192,0.2)',
                    // 'rgba(153,102,255,0.2)',
                    // 'rgba(255,159,64,0.2)',
                ]

            }, {
                label: ListDateNew,
                data: arrNew,
                backgroundColor: 'rgba(0, 0, 255, 1)',
                borderColor: 'rgba(255, 0, 0, 1)',

            }]
        };
    }
    //hàm trả về danh sách các ngày trong tháng dưới dạng chuỗi
    const getDaysInMonth = (month, year) => {
        const numDays = new Date(year, month, 0).getDate();
        const days = [];
        //duyệt qua từng ngày trong tháng và định dạng chuỗi
        for (let day = 1; day <= numDays; day++) {
            const formattedDay = day.toString().padStart(2, '0');
            const formattedMonth = month.toString().padStart(2, '0');
            //tạo chuỗi định dạng
            const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
            days.push(formattedDate);

        }

        return days;
    }
    //đặt ngày mặc định cho biểu đồ ngày
    const loadChartFirst = async () => {
        const defaultDate = '2023-07-11'; // Ngày mặc định
        paraDate = defaultDate;
        const data = await getChartDate();
        setChartData(data);
    };
    const loadChartMonthFirst = async () => {
        const defaultMonth = '2023-07';
        const dataMonth = await getChartMonth(defaultMonth);
        setChartDataMonth(dataMonth);
    };
    const getDateByFilter = async () => {
        // ...mã xử lý khác...
        paraDate = document.getElementById('input_celander').value;
        console.log("vào ", paraDate)
        const data = await getChartDate();
        setChartData(data);
    };
    const getMonthByFilter = async () => {
        // ...mã xử lý khác...
        const dataMonth = await getChartMonth();
        setChartDataMonth(dataMonth);
    };
    useEffect(() => {
        loadChartFirst();
        loadChartMonthFirst();
    }, []);
    return (
        <>
            <div className="chart-rext">
                <div className="date-chart-inter">
                    <div className="date-chart-info">
                        <input type="date" id="input_celander" name="trip-start" />
                    </div>
                    <div className="date-chart-drive">
                        <button id="button-filter" onClick={getDateByFilter}><AiOutlineSearch />Lọc</button>
                    </div>
                </div>
                <div className="month-chart-inter">
                    <div className="month-chart-info">
                        <input type="month" id="month-input" class="month-input" />
                    </div>
                    <div className="month-chart-drive">
                        <button class="filter-button" onClick={getMonthByFilter}><AiOutlineSearch />Lọc</button>
                    </div>
                </div>
            </div>
            <div className="chart-app" >
                <div className="chartdate">
                    <div className="transaction-date">
                        <div className="transaction-success">
                            <button />
                            <p>Giao dịch thành công</p>
                        </div>
                        <div className="transaction-faulty">
                            <button />
                            <p>Giao dịch  lỗi</p>
                        </div>
                        <div className="transaction-dream">
                            <button />
                            <p>Giao dịch mới</p>
                        </div>
                        <div className="transaction-unfinished">
                            <button />
                            <p>Giao dịch chưa hoàn thành</p>
                        </div>

                    </div>
                    {chartData && (
                        <div className="">
                            <Bar data={chartData}
                            />
                        </div>
                    )}
                    <div className="transaction-during">
                        <p>Giao dịch trong ngày</p>
                    </div>
                </div>
                <div className="chartmonth">
                    <div className="transaction-month">
                        <div className="transaction-success">
                            <button />
                            <p>Giao dịch thành công</p>
                        </div>
                        <div className="transaction-faulty">
                            <button />
                            <p>Giao dịch  lỗi</p>
                        </div>
                        <div className="transaction-dream">
                            <button />
                            <p>Giao dịch mới</p>
                        </div>
                        <div className="transaction-unfinished">
                            <button />
                            <p>Giao dịch chưa hoàn thành</p>
                        </div>

                    </div>
                    {chartDataMonth && (
                        <div className="chartmonth-ate" >
                            <Bar data={chartDataMonth}
                            />
                            <div className="transaction-during">
                                <p>Giao dịch trong tháng</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <TransactionTable />
        </>
    )
}

export default Page