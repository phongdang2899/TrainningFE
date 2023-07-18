import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { BsPersonVcard } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { createCustomerApi, getAllProvinces } from '../../../services/codeService';
import * as Yup from 'yup';
import Notification from './modalNotification';
import { Spin } from 'antd';
import Input from '../../InputFields';



const ModalSignIn = ({ open, onClose, phone_number, setPhone_number, codes }) => {
    const [province, setProvince] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [image, setImage] = useState(null);
    const [province_id, setProvince_id] = useState('');
    const [id_card_number, setId_card_number] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [notifi, setNotifi] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors2, setErrors2] = useState({})



    useEffect(() => {
        const getProvince = async () => {
            const getProvinces = await axios.get('http://localhost:8383/api/v1/provinces');
            // const getProvinces = await getAllProvinces()
            if (getProvinces.data) {
                setProvince(getProvinces.data.data);
            }
        };
        getProvince();
    }, []);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setImage(file);
        console.log(file);
    };

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string().required('Vui lòng nhập số điện thoại'),
        last_name: Yup.string().required('Vui lòng nhập Tên'),
        first_name: Yup.string().required('Vui lòng nhập Họ và Tên Đệm'),
        id_card_number: Yup.string().required('Vui lòng nhập Số CMND/CCCD'),
        province_id: Yup.string().required('Vui lòng chọn Tỉnh/Thành Phố'),
    });

    const handleCreateCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await validationSchema.validate(
                {
                    phone_number,
                    last_name,
                    first_name,
                    id_card_number,
                    province_id,
                },
                { abortEarly: false }
            );

            const formattedCodes = codes.map((item) => item.code);

            const formData = new FormData();
            formData.append('phone_number', phone_number);
            formData.append('last_name', last_name);
            formData.append('first_name', first_name);
            formData.append('id_card_number', id_card_number);
            formData.append('province_id', province_id);
            formattedCodes.forEach((code) => {
                formData.append('codes[]', code);
            });

            if (image) {
                formData.append('image', image);
            }
            const res = await createCustomerApi(formData);

            if (res && res.status === 'FAIL') {
                // Handle error
                const errorMessages = Object.values(res.errors).flat();
                setErrors2(errorMessages);
            }

            if (res && res.status === 'OK') {
                // Show success notification
                setNotifi(true);
                setErrorMessages('Hệ Thống Đã Ghi Nhận Thông Tin Của Bạn Vui Lòng Chờ Nhân Viên Liên Hệ Xác Thực');
            } else {
                setErrorMessages(errorMessages);
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const yupErrors = {};
                error.inner.forEach((err) => {
                    yupErrors[err.path] = err.message;
                });
                setErrors(yupErrors);
            } else {
                setErrorMessages(error.message);
                setNotifi(true);
            }
        } finally {
            setLoading(false);
        }
    };


    const handleCloseNotification = () => {
        setNotifi(false);
        window.location.reload();
    };

    useEffect(() => {
        setErrors({});
    }, [phone_number, last_name, first_name, id_card_number, province_id]);

    return (
        <>
            {open && (
                <div className="fixed w-[600px] py-[1.5rem] px-4 border-[1px] z-50 bg-white  rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md">
                    <Notification message={errorMessages} openNotifi={notifi} onClose={handleCloseNotification} />
                    <div className="text-left">
                        <h2 className="text-[20px]">ĐĂNG KÝ SỐ ĐIỆN THOẠI</h2>
                        <div onClick={() => onClose()} className="cursor-pointer absolute right-[-7px] top-[-7px]">
                            <IoCloseOutline className=" rounded-[50%] border-[1px] border-[#A8A8A8] text-[25px] bg-white" />
                        </div>
                    </div>


                    <div className="">
                        <form onSubmit={handleCreateCustomer} >
                            <div className="text-left mb-5 mt-3">
                                <Input label="Số điện thoại" data={phone_number} setData={setPhone_number} placeholder="Nhập số điện thoại" />
                                {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
                            </div>
                            <div className="text-left mb-5">
                                <Input label="Tên" data={last_name} setData={setLast_name} placeholder="Ví dụ: Hoàng" />
                                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                            </div>
                            <div className="text-left mb-5">
                                <Input label="Họ và Tên Đệm" data={first_name} setData={setFirst_name} placeholder="Ví dụ: Nguyễn Văn" />
                                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                            </div>
                            <div className="text-left mb-5">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected" className="mb-2 w-[90px] h-[90px] object-cover" />
                                ) : (
                                    <BsPersonVcard className="text-[50px] ml-3 mb-2" />
                                )}
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <span className="flex items-center gap-2 rounded-[20px] p-1 w-[100px] justify-center text-[16px] border-[1px]">
                                        <AiFillCamera className="text-[18px]" />
                                        CHỌN
                                    </span>
                                    <input id="file-upload" type="file" accept="image/*" hidden onChange={handleImage} />
                                </label>
                            </div>
                            <div className="text-left mb-5">
                                <Input label="Số CMND/CCCD" data={id_card_number} setData={setId_card_number} placeholder="123456789/987654321" />
                                {errors.id_card_number && <p className="text-red-500">{errors.id_card_number}</p>}
                            </div>
                            <div className="text-left mb-3">
                                <div>Tỉnh/Thành Phố</div>
                                <select
                                    value={province_id}
                                    onChange={(e) => setProvince_id(e.target.value)}
                                    className="h-[50px] mt-2 w-full outline-none border-[#A8A8A8] rounded-[5px]  border-[1px] px-2"
                                    name=""
                                    id=""
                                >
                                    <option value="">Chọn Tỉnh thành Phố</option>
                                    {province.map((item) => (
                                        <option selected={item.province_id} key={item.id} value={item.province_id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.province_id && <p className="text-red-500">{errors.province_id}</p>}
                            </div>
                            {Array.isArray(errors2) && (
                                errors2.map((item, index) => (
                                    <p className='text-red-500' key={index}>{item}</p>
                                ))
                            )}
                            <div className="text-center mt-5">
                                <button
                                    className={`rounded-[5px] bg-[#A8A8A8] w-[150px] h-16 text-white font-semibold ${loading ? 'bg-yellow-500' : 'bg-[#A8A8A8]'}`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? <Spin className="text-[#33554b]" active size="small" /> : <span className="ml-3">ĐĂNG KÝ</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalSignIn;
