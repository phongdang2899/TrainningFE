import React from "react";

const MyModal2 = ({ setToggleModal2, toggleModal2, campaign }) => {
    const handleCancel = () => {
        setToggleModal2(!toggleModal2);
    };

    return (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center m-auto bg-overlay z-20">
            <div className="w-[80%] h-screen bg-[#fff] shadow-sm rounded-md">
                <div className="bg-main w-full p-[15px]">
                    <p className="text-[20px] text-[#fff]">
                        Thông tin cấu hình #{campaign?.campaign_id}
                    </p>
                </div>

                <div className="flex gap-2 justify-end p-[30px]">
                    <button
                        type="submit"
                        className="bg-main py-[10px] w-[175px] rounded-md text-[#fff]"
                    >
                        TẠO DỮ LIỆU CODE
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-[#999] py-[10px] w-[175px] rounded-md text-[#fff]"
                    >
                        XUẤT DỮ LIỆU CODE
                    </button>
                </div>

                <div className="px-[20px] flex flex-col  text-[18px]">
                    <table className="flex border-none pb-7 gap-[20%]">
                        <thead className="">
                            <tr className="flex flex-col">
                                <th>Tên</th>
                                <th>Mã chiến dịch</th>
                                <th>Địa chỉ trang nhận thưởng</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex flex-col items-center">
                                <td>{campaign?.name}</td>
                                <td>{campaign?.code}</td>
                                <td>{campaign?.reward_url}</td>
                                <td>{campaign?.start_date}</td>
                                <td>{campaign?.end_date}</td>
                                <td>{campaign?.status?.name}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="border-t-[1px]">
                        <tr>
                            <th rowSpan={campaign?.config.length + 1}>
                                Cấu hình
                            </th>
                            <th>Mệnh giá</th>
                            <th>Số lượng</th>
                        </tr>
                        {campaign?.config.map((item) => (
                            <tr key={item?.config_id}>
                                <td>{`${(+item.type).toLocaleString(
                                    "vi-VN"
                                )}đ`}</td>
                                <td>{item?.value}</td>
                            </tr>
                        ))}
                    </table>

                    {/* <table className="flex full">
            <tr className="flex flex-col">
              <td className="border-t-[1px] border-[#999]">Tên</td>
              <td className="border-t-[1px] border-[#999]">Mã chiến dịch</td>
              <td className="border-t-[1px] border-[#999]">
                Địa chỉ trang nhận thưởng
              </td>
              <td className="border-t-[1px] border-[#999]">Ngày bắt đầu</td>
              <td className="border-t-[1px] border-[#999]">Ngày kết thúc</td>
              <td className="border-t-[1px] border-[#999]">Trạng thái</td>
              <td className="flex border-t-[1px] border-[#999]">
                Cấu hình
                <table border="2" bordercolor="blue">
                  <tr>
                    <td>inner Table row 1 column 1</td>
                    <td>inner Table row 1 column 2</td>
                  </tr>
                  <tr>
                    <td>inner Table row 2 column 1 </td>
                    <td>inner Table row 2 column 2</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="flex flex-col items-center">
              <td className="border-t-[1px] border-[#999]">{campaign?.name}</td>
              <td className="border-t-[1px] border-[#999]">{campaign?.code}</td>
              <td className="border-t-[1px] border-[#999]">
                {campaign?.reward_url}
              </td>
              <td className="border-t-[1px] border-[#999]">
                {campaign?.start_date}
              </td>
              <td className="border-t-[1px] border-[#999]">
                {campaign?.end_date}{" "}
              </td>
              <td className="border-t-[1px] border-[#999]">
                {campaign?.status?.name}
              </td>
            </tr>
          </table> */}
                </div>

                <div className="w-full py-[20px] justify-center flex items-center">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-[#999] py-[10px] w-[90px] rounded-md text-[#fff]"
                    >
                        Trở về
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyModal2;
