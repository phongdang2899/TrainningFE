import React, { useState } from 'react'
import { createCodeApi } from '../../../services/codeService';
import { MdQrCode2 } from 'react-icons/md';
import { Skeleton, Spin, Alert } from 'antd';
import ModalSignIn from '../modal/modalSignin';
import Notification from './../modal/modalNotification';

const BonusCode = () => {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [notifi, setNotifi] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [codes, setCodes] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [dataCode, setDataCode] = useState([]);
    const [errorAlert, setErrorAlert] = useState('')


    const signIn = () => {
        setOpen(true);
    };

    const handleCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createCodeApi({ codes: [codes] });
            console.log(res, 'add');
            if (!res) return;
            if (res && res.failedMsg) {
                // Handle error
                setMessage(res.data[0].message);
                setErrorAlert(res.failedMsg, "đ");
                // setNotifi(true);
                setShowAlert(true);
                // setTimeout(handleAlertClose, 5000);
                setDataCode(d => [...d, { code: codes, value: "Mã không hợp lệ" }]);
            } else {
                // Handle success
                setDataCode(d => [...d, ...res.data]);
            }
        } catch (error) {
            setMessage(error.message)
            setNotifi(true);
            setShowAlert(false)
            setErrorAlert(true)
        } finally {
            setLoading(false);
        }
    };
    const handleCloseNotification = () => {
        setNotifi(false);

    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };
    return (
        <>
            {showAlert && (
                <Alert
                    message="Lỗi"
                    description={errorAlert}
                    type="error"
                    showIcon
                    closable
                    onClose={handleAlertClose}
                />
            )}
            <ModalSignIn codes={dataCode} setPhone_number={setPhone_number} phone_number={phone_number} open={open} onClose={() => setOpen(false)} />
            <Notification message={message} openNotifi={notifi} onClose={handleCloseNotification} />

            <div className="">
                <div className="w-full h-full justify-center items-center flex">
                    <div className="p-8 w-[700px]" style={{ backgroundColor: 'rgba(255, 248, 205, 0.6)' }}>
                        <div>
                            <div className="mb-4 px-14">
                                <div className="mb-3 float-left text-black text-[19px] font-medium">Số điện thoại</div>
                                <input
                                    className="h-[50px] w-full outline-none border-[#A8A8A8] rounded-[5px] border-[1px] px-2"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                    disabled={dataCode.length === 0}
                                />
                            </div>
                            <button
                                onClick={signIn}
                                disabled={phone_number.length === 0}
                                className={`cursor-pointer relative  text-white text-[18px] flex justify-center mx-auto w-[160px] rounded-[6px] h-[50px] bg-[#A8A8A8] py-3 items-center text-center ${phone_number.length === 0 ? 'bg-[#A8A8A8]' : 'bg-[#EAB308]'}`}
                                style={{ cursor: phone_number.length === 0 ? 'not-allowed' : 'pointer' }}
                            >
                                Xác thực
                            </button>

                        </div>
                        <form onSubmit={handleCode} className="mt-10">
                            <div className="p-3 text-[15px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                                <p className="leading-7 text-center">
                                    Dùng camera để quét tất cả các mã QR mà bạn đang có khi mua sản phẩm của Vĩnh Tường hoặc nhập mã số in trên tem vào đây. Và nhấn nút{' '}
                                    <span className="font-bold">THÊM</span>{' '}
                                </p>
                                <div className="flex items-center justify-around mt-5">
                                    <div className="font-semibold bg-white rounded-[6px] text-[#33554b] flex items-center justify-center w-[130px] h-[50px] gap-1 shadow-lg">
                                        <MdQrCode2 className="text-[19px] text-[#33554b]" /> QUÉT MÃ QR
                                    </div>
                                    <input
                                        className="h-[50px] focus:outline-[#F55A4E] focus:outline-offset-[-1px] outline-none border-[#A8A8A8] rounded-[5px] w-[330px] border-[1px] px-2"
                                        type="text"
                                        placeholder="D2ACR9288QE0"
                                        value={codes}
                                        onChange={(e) => setCodes(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        disabled={codes.length === 0}
                                        className={`cursor-pointer text-[17px] text-white font-semibold rounded-[6px] flex items-center justify-center w-[100px] h-[50px] ${codes.length ? 'bg-yellow-500' : 'bg-[#A8A8A8]'
                                            }`}
                                        // disabled={loading}
                                        style={{ cursor: codes.length === 0 ? 'not-allowed' : 'pointer' }}
                                    >
                                        {loading && <Spin className='text-[#33554b]' active size="small" />}
                                        <span className='ml-1' >Thêm</span>
                                    </button>
                                </div>
                            </div>
                            <div className=""></div>
                        </form>
                        <div className="table-container mt-8" style={{ maxHeight: '260px', overflow: 'auto' }}>
                            <table className="w-full bg-white">
                                <thead>
                                    <tr className="h-[60px] bg-[#F5F5F5]">
                                        <th className="py-2">STT</th>
                                        <th className="text-center py-2">Tên Mã</th>
                                        <th className="py-2">Giá Trị</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="3" className="py-2">
                                                <Skeleton paragraph={{ rows: 1 }} />
                                            </td>
                                        </tr>
                                    ) : dataCode.length > 0 ? (
                                        dataCode.map((item, index) => (
                                            <tr key={index} className="h-[50px] text-center  font-normal">
                                                <td className="py-2">{index + 1}</td>
                                                <td className="py-2">{item.code}</td>
                                                <td className="py-2">{(item.value ? item.value : "Mã không hợp lệ").toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="h-[60px]">
                                            <td colSpan="3" className="py-2 text-center text-[18px]">
                                                Không có dữ liệu!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BonusCode