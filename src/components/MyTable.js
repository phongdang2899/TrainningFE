import React from "react";
import icons from "../utils/icons";
import { useContext } from "react";
import { ManageContext } from "../pages/admin/ManageCampaigns";

const MyTable = () => {
    const { campaigns, handleDelete, handleDetail, handleUpdate } =
        useContext(ManageContext);

    return (
        <div className="">
            <h3 className="text-[16px] font-semibold text-[#000] my-[15px]">
                Tổng số kết quả: {campaigns?.length}
            </h3>
            <table className="rounded-[3px] w-full">
                <thead>
                    <tr className="border-b-[1px] border-[#ccc]">
                        <th className="text-[16px] font-bold text-[#000]">
                            ID
                        </th>
                        <th className="text-[16px] font-bold text-[#000]">
                            Tên
                        </th>
                        <th className="text-[16px] font-bold text-[#000]">
                            Thời gian bắt đầu
                        </th>
                        <th className="text-[16px] font-bold text-[#000]">
                            Thời gian kết thúc
                        </th>
                        <th className="text-[16px] font-bold text-[#000]">
                            Trạng thái
                        </th>
                        <th className="text-[16px] font-bold text-[#000]">
                            Chức năng
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns?.map((item) => (
                        <tr
                            className="border-b-[1px] border-[#ccc]"
                            key={item?.campaign_id}
                        >
                            <td className="text-[16px]">{item?.campaign_id}</td>
                            <td className="text-[16px]">{item?.name}</td>
                            <td className="text-[16px]">{item?.start_date}</td>
                            <td className="text-[16px]">{item?.end_date}</td>
                            <td className="text-[16px]">
                                {item?.status?.name}
                            </td>
                            <td className="text-[16px]">
                                <div className="flex items-center gap-[15px]">
                                    <div
                                        onClick={() => {
                                            handleDetail(item?.campaign_id);
                                        }}
                                        className=""
                                    >
                                        <icons.AiFillEye className="text-main text-[21px] font-bold cursor-pointer" />
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleUpdate(item?.campaign_id);
                                        }}
                                        className=""
                                    >
                                        <icons.FaPencilAlt className="text-[#757575] text-[14px] font-bold cursor-pointer" />
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleDelete(item?.campaign_id);
                                        }}
                                        className=""
                                    >
                                        <icons.RiDeleteBin6Line className="text-[#fb92b8] text-[18px] font-bold cursor-pointer" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTable;
