import React from "react";
import { HomeOutlined, FireOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Sidebar } from "../../components/";
import { Outlet } from "react-router-dom";
import user_img from "../../assets/avatar_default.png";

const AdminLayout = () => {
    return (
        <div className="grid grid-cols-6">
            <div className="p-[10px] h-screen bg-sidebar bg-cover text-[#fff]">
                <Sidebar />
            </div>
            <div className="col-span-5 bg-white px-[20px] py-[10px] h-screen">
                <div className="flex justify-between items-center w-full mb-[30px]">
                    <div className="flex items-center">
                        <Breadcrumb
                            className="flex items-center"
                            items={[
                                {
                                    href: "/",
                                    title: (
                                        <div className="flex items-center gap-[5px] text-[16px] font-semibold">
                                            <HomeOutlined />
                                            <span>Trang chủ</span>
                                        </div>
                                    ),
                                },
                                {
                                    href: "/campaigns",
                                    title: (
                                        <div className="flex items-center gap-[5px] text-[16px] font-semibold">
                                            <FireOutlined />
                                            <span>Chiến dịch</span>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <div className="flex items-center gap-[6px] cursor-pointer">
                        <p className="text-[14px] font-semibold text-[#000]">
                            Admin
                        </p>
                        <img
                            src={user_img}
                            alt=""
                            className="rounded-full w-[30px] h-[30px]"
                        />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
