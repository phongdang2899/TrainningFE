import React, { useEffect, useState, createContext } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import MyTable from "../../components/MyTable";
import {
    apiGetCampaigns,
    apiSearchCampaign,
    apiCreateCampaign,
    apiDeleteCampaign,
    apiShowCampaign,
    apiUpdateCampaign,
    apiCreateCampaignConfig,
} from "../../apis/campaign";
import MyModal from "../../components/MyModal";
import MyModal2 from "../../components/MyModal2";
import { ClipLoader } from "react-spinners";

export const ManageContext = createContext();

const ManageCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [campaign, setCampaign] = useState(null);
    const [campaignConfig, setCampaignConfig] = useState([""]);
    const [toggleModal, setToggleModal] = useState(false);
    const [toggleModal2, setToggleModal2] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isConfig, setIsConfig] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const dateFormat = "YYYY-MM-DD";
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date, dateString) => {
        setStartDate(moment(dateString, dateFormat));
    };

    const handleEndDateChange = (date, dateString) => {
        setEndDate(moment(dateString, dateFormat));
    };
    const handleFilterDate = async () => {
        const data = {
            start_date: startDate.format(dateFormat),
            end_date: endDate.format(dateFormat),
        };
        const response = await apiGetCampaigns(data);
        if (response.status === "OK") {
            setCampaigns(response.data);
        }
    };

    function addFormConfiguration() {
        setCampaignConfig([...campaignConfig, ""]);
    }

    function handleChangeConfiguration(event, index) {
        const newFormConfiguration = [...campaignConfig];
        newFormConfiguration[index] = event.target.value;
        setCampaignConfig(newFormConfiguration);
    }

    function handleRemove(index) {
        const removeFormData = [...campaignConfig];
        removeFormData.splice(index, 1);
        setCampaignConfig(removeFormData);
    }

    const onSubmit = async (data) => {
        if (isEdit) {
            const id = data?.campaign_id;
            const response = await apiUpdateCampaign(id, data);
            if (response.status === "OK") {
                Swal.fire(
                    "Congratulations!",
                    "Chỉnh sửa chiến dịch thành công!",
                    "success"
                ).then(async () => {
                    setCampaign(null);
                    setToggleModal(!toggleModal);
                    await fetchCampaigns();
                });
            } else {
                Swal.fire("Oops!", `${response?.message}`, "error");
            }
        } else if (isConfig) {
            const id = data?.campaign_id;
            if (data) {
                await apiCreateCampaignConfig(id, {
                    ...data,
                    config: data?.config,
                });
            }
        } else {
            const response = await apiCreateCampaign(data);
            if (response.status === "OK") {
                Swal.fire(
                    "Congratulations!",
                    "Thêm mới chiến dịch thành công!",
                    "success"
                ).then(async () => {
                    setCampaign(null);
                    setToggleModal(!toggleModal);
                    await fetchCampaigns();
                });
            } else {
                Swal.fire("Oops!", `${response?.message}`, "error");
            }
        }
    };

    const handleDelete = async (id) => {
        if (id) {
            Swal.fire({
                title: "Bạn có chắc muốn xóa chiến dịch này không?",
                text: "Bạn sẽ không thể lấy lại được thông tin!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Có, chắc chắn rồi!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await apiDeleteCampaign({ "ids[]": id });
                    if (response.status === "OK") {
                        Swal.fire(
                            "Đã xóa chiến dịch!",
                            "Xóa chiến dịch thành công.",
                            "success"
                        ).then(async () => {
                            await fetchCampaigns();
                        });
                    } else {
                        Swal.fire("Oops!", `${response?.message}`, "error");
                    }
                }
            });
        }
    };

    const handleDetail = async (id) => {
        if (id) {
            const response = await apiShowCampaign(id);
            if (response.status === "OK") {
                setCampaign(response.data);
                setToggleModal2(!toggleModal2);
            } else {
                Swal.fire("Oops!", `${response?.message}`, "error");
            }
        }
    };

    const handleUpdate = async (id) => {
        setLoading(true);
        if (id) {
            const response = await apiShowCampaign(id);
            if (response.status === "OK") {
                setCampaign(response.data);
                setCampaignConfig(response.data?.config);
                setIsEdit(true);
                setToggleModal(!toggleModal);
                setLoading(false);
            } else {
                Swal.fire("Oops!", `${response?.message}`, "error");
            }
        }
    };

    const handleAdd = async () => {
        setToggleModal(!toggleModal);
        setIsEdit(false);
    };

    const handleQueryChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async () => {
        const response = await apiSearchCampaign({ search: searchValue });
        if (response.status) {
            setCampaigns(response.data);
        }
    };

    const fetchCampaigns = async () => {
        const response = await apiGetCampaigns();
        if (response.status) {
            setCampaigns(response.data);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return (
        <div className="">
            <ManageContext.Provider
                value={{
                    campaigns,
                    setCampaigns,
                    campaign,
                    setCampaign,
                    toggleModal,
                    setToggleModal,
                    campaignConfig,
                    setCampaignConfig,
                    handleDelete,
                    handleDetail,
                    handleUpdate,
                    isEdit,
                    setIsEdit,
                    setIsConfig,
                    addFormConfiguration,
                    handleChangeConfiguration,
                    handleRemove,
                    onSubmit,
                }}
            >
                <div className="p-[15px] bg-main rounded-sm w-full flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold text-[#fff]">
                        DANH SÁCH CHIẾN DỊCH
                    </h3>
                    <button
                        className="px-[10px] py-[6px] bg-[#fff] rounded-[4px] flex items-center gap-[5px]"
                        type="primary"
                        onClick={handleAdd}
                    >
                        <icons.BsPlusCircleFill className="text-[20px] text-main" />
                        <p className="text-[14px] font-semibold text-main">
                            THÊM MỚI
                        </p>
                    </button>
                </div>
                {toggleModal && <MyModal />}
                {toggleModal2 && (
                    <MyModal2
                        campaign={campaign}
                        toggleModal2={toggleModal2}
                        setToggleModal2={setToggleModal2}
                    />
                )}
                <div className="flex flex-col">
                    <div className="flex items-center justify-center py-[10px] border-b-2 border-[#ccc] gap-[10px]">
                        <div className="flex items-center gap-[6px] drop-shadow-md py-[8px] px-[15px] bg-[#fff] rounded-[3px]">
                            <icons.HiOutlineSearch
                                className="text-[18px] text-[#000]"
                                onClick={handleSearch}
                            />
                            <input
                                value={searchValue}
                                onChange={handleQueryChange}
                                onKeyDown={(e) => {
                                    if (e.which === 13) {
                                        handleSearch();
                                    }
                                }}
                                type="text"
                                className="border-none outline-none bg-transparent text-[16px]"
                                placeholder="Nhập tên chiến dịch"
                            />
                        </div>
                        <DatePicker
                            inputReadOnly={true}
                            placeholder="Từ ngày"
                            format="YYYY-MM-DD"
                            className="py-[8px] text-[15px] font-semibold cursor-pointer placeholder:text-[#000]"
                            onChange={handleStartDateChange}
                        />
                        <DatePicker
                            inputReadOnly={true}
                            placeholder="Đến ngày"
                            format="YYYY-MM-DD"
                            className="py-[8px] text-[15px] font-semibold cursor-pointer placeholder:text-[#000]"
                            onChange={handleEndDateChange}
                        />
                        <button
                            onClick={handleFilterDate}
                            className="px-[10px] py-[8px] bg-[#fff] border-[1px] border-main rounded-[4px] flex items-center gap-[5px]"
                        >
                            <icons.TbZoomReset className="text-[20px] text-main" />
                            <p className="text-[14px] font-semibold text-main">
                                LỌC
                            </p>
                        </button>
                    </div>
                    <div className="">
                        {campaigns?.length === 0 ? (
                            <div className="flex items-center justify-center m-auto mt-[160px]">
                                {/* <Spin tip="Loading data..." size="large">
                                    <div className="content" />
                                </Spin> */}
                                <ClipLoader
                                    color="#26c6da"
                                    size={100}
                                    speedMultiplier={0.7}
                                />
                            </div>
                        ) : (
                            <MyTable />
                        )}
                    </div>
                </div>
            </ManageContext.Provider>
        </div>
    );
};

export default ManageCampaigns;
