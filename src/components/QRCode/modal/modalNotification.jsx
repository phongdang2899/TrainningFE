import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'

const Notification = ({ openNotifi, onClose, message }) => {
    return (
        <>
            {openNotifi && (
                <div className="fixed w-[350px] rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[1.5rem] px-4 border-[1px] bg-white z-50 shadow-md">
                    <div className="">
                        <div className="flex justify-center ">
                            <BiCommentError size={50} />
                        </div>
                        {message && <p className='h-[80px] items-center justify-center flex'>{message}</p>}
                        <div onClick={onClose} className="flex cursor-pointer m-auto items-center justify-center border-[1px] rounded-[6px] gap-2 h-[40px] w-[140px]">
                            <AiFillHome className="text-[26px]" />
                            <span className="text-[18px]">Trang Chủ</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notification;
