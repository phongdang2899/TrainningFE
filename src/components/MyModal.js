import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import icons from "../utils/icons";
import { ManageContext } from "../pages/admin/ManageCampaigns";

const schema = yup
    .object()
    .shape({
        name: yup.string().required("Tên chiến dịch không được bỏ trống"),
        reward_url: yup
            .string()
            .required("Địa chỉ trang nhận thưởng không được bỏ trống"),
        start_date: yup
            .string()
            .required(
                "Thời gian bắt đầu trang nhận thưởng không được bỏ trống"
            ),
        end_date: yup
            .string()
            .required(
                "Thời gian kết thúc trang nhận thưởng không được bỏ trống"
            ),
        // type: yup.string().required("Mệnh giá không được bỏ trống"),
        // value: yup.string().required("số lượng in mã QR không được bỏ trống"),
        // quota: yup
        //     .string()
        //     .required("Hạn ngạch nhận thưởng không được bỏ trống"),
        config: yup.array().of(
            yup.object().shape({
                type: yup.string().required("Mệnh giá không được bỏ trống"),
                value: yup
                    .string()
                    .required("Số lượng in mã QR không được bỏ trống"),
                quota: yup
                    .string()
                    .required("Hạng ngạch nhận thưởng không được bỏ trống"),
            })
        ),
    })
    .required();

const MyModal = () => {
    const {
        onSubmit,
        toggleModal,
        setToggleModal,
        campaign,
        campaignConfig,
        isEdit,
        setIsEdit,
        setIsConfig,
        addFormConfiguration,
        handleRemove,
    } = useContext(ManageContext);

    const [activeTab, setActiveTab] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleCancel = () => {
        setToggleModal(!toggleModal);
    };

    return (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center m-auto bg-overlay z-20">
            <div className="w-[60%] bg-[#fff] shadow-sm rounded-md">
                <div className="bg-main w-full p-[15px]">
                    <div className="flex items-center">
                        <div
                            className={`uppercase px-[10px] py-[10px] rounded-md text-[#fff] cursor-pointer font-semibold ${
                                activeTab === 0 ? `bg-[#ffffff35]` : ``
                            }`}
                            onClick={() => {
                                setActiveTab(0);
                                setIsEdit(true);
                                setIsConfig(false);
                            }}
                        >
                            Thông tin
                        </div>
                        <div
                            className={`uppercase px-[10px] py-[10px] rounded-md text-[#fff] ${
                                isEdit && "cursor-pointer"
                            } font-semibold ${
                                activeTab === 1 ? `bg-[#ffffff35]` : ``
                            }`}
                            onClick={() => {
                                isEdit && setActiveTab(1);
                                isEdit && setIsEdit(false);
                                isEdit && setIsConfig(true);
                            }}
                        >
                            Cấu hình
                        </div>
                    </div>
                </div>
                {activeTab === 0 ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-[10px] p-[20px]"
                    >
                        <div className="grid grid-cols-2 gap-[30px] w-full">
                            <div className="">
                                <input
                                    type="hidden"
                                    name="campaign_id"
                                    value={isEdit ? campaign?.campaign_id : ""}
                                    className="border-none outline-none text-[16px] text-[#000]"
                                    {...register("campaign_id")}
                                />
                                <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[20px]">
                                    <label className="text-[13px] text-[#999] mb-[5px]">
                                        Trạng thái
                                    </label>
                                    <select
                                        name="status"
                                        className="border-none outline-none text-[16px] text-[#000]"
                                        {...register("status")}
                                        defaultValue={
                                            isEdit ? campaign?.status.id : 0
                                        }
                                    >
                                        <option
                                            defaultValue={
                                                isEdit ? campaign?.status.id : 0
                                            }
                                            value={0}
                                        >
                                            Nháp
                                        </option>
                                        <option
                                            defaultValue={
                                                isEdit ? campaign?.status.id : 1
                                            }
                                            value={1}
                                        >
                                            Hoạt động
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[20px]">
                                    <label className="text-[13px] text-[#999] mb-[5px]">
                                        Thời gian bắt đầu
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        defaultValue={
                                            isEdit
                                                ? campaign?.start_date.split(
                                                      " "
                                                  )[0]
                                                : watch("start_date")
                                        }
                                        onChange={(e) =>
                                            setValue(
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                        className="border-none outline-none text-[16px] text-[#000]"
                                        {...register("start_date")}
                                    />
                                    <p className="error">
                                        {errors.start_date?.message}
                                    </p>
                                </div>
                                <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[20px]">
                                    <label className="text-[13px] text-[#999] mb-[5px]">
                                        Địa chỉ trang nhận thưởng
                                    </label>
                                    <input
                                        type="text"
                                        name="reward_url"
                                        defaultValue={
                                            isEdit
                                                ? campaign?.reward_url
                                                : watch("reward_url")
                                        }
                                        onChange={(e) =>
                                            setValue(
                                                "reward_url",
                                                e.target.value
                                            )
                                        }
                                        className="border-none outline-none text-[16px] text-[#000]"
                                        {...register("reward_url")}
                                    />
                                    <p className="error">
                                        {errors.reward_url?.message}
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[20px]">
                                    <label className="text-[13px] text-[#999] mb-[5px]">
                                        Tên chiến dịch
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="border-none outline-none text-[16px] text-[#000]"
                                        defaultValue={
                                            isEdit
                                                ? campaign?.name
                                                : watch("name")
                                        }
                                        onChange={(e) =>
                                            setValue("name", e.target.value)
                                        }
                                        {...register("name")}
                                    />
                                    <p className="error">
                                        {errors.name?.message}
                                    </p>
                                </div>
                                <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[20px]">
                                    <label className="text-[13px] text-[#999] mb-[5px]">
                                        Thời gian kết thúc
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        defaultValue={
                                            isEdit
                                                ? campaign?.end_date.split(
                                                      " "
                                                  )[0]
                                                : watch("end_date")
                                        }
                                        onChange={(e) =>
                                            setValue("end_date", e.target.value)
                                        }
                                        className="border-none outline-none text-[16px] text-[#000]"
                                        {...register("end_date")}
                                    />
                                    <p className="error">
                                        {errors.end_date?.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-[5px] mt-[20px]">
                            {isEdit ? (
                                <button
                                    type="submit"
                                    className="bg-main py-[10px] w-[90px] rounded-md text-[#fff]"
                                >
                                    Chỉnh sửa
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-main py-[10px] w-[90px] rounded-md text-[#fff]"
                                >
                                    Thêm
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-[#999] py-[10px] w-[90px] rounded-md text-[#fff]"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex fixed w-[58%] h-[80px] bg-[#fff] justify-end p-6">
                            <button
                                onClick={addFormConfiguration}
                                className="px-[15px] py-[10px] fixed bg-main border rounded-md text-[#fff] flex jc"
                            >
                                Thêm
                            </button>
                        </div>
                        <div className="w-full pt-[80px] px-[10px] overflow-y-scroll h-[300px]">
                            {/* campaignConfig */}
                            {campaignConfig.map((item, index) => (
                                <div key={index} className="flex px-10">
                                    <div className="w-[95%] grid grid-cols-3 gap-[40px] mb-[10px]">
                                        <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[10px]">
                                            <label
                                                htmlFor={`type`}
                                                className="text-[13px] text-[#999] mb-[5px]"
                                            >
                                                Mệnh giá
                                            </label>
                                            <input
                                                className="border-none outline-none text-[16px] text-[#000]"
                                                type="text"
                                                name={`config.type`}
                                                onChange={(e) =>
                                                    setValue(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                                defaultValue={item?.type || ""}
                                                {...register(
                                                    `config.${index}.type`
                                                )}
                                            />
                                            {errors.config &&
                                                errors.config[index]?.type && (
                                                    <p className="error">
                                                        {
                                                            errors.config[index]
                                                                .type.message
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[10px]">
                                            <label
                                                htmlFor={`value`}
                                                className="text-[13px] text-[#999] mb-[5px]"
                                            >
                                                Số lượng in mã QR
                                            </label>
                                            <input
                                                className="border-none outline-none text-[16px] text-[#000]"
                                                type="text"
                                                name={`config.value`}
                                                onChange={(e) =>
                                                    setValue(
                                                        "value",
                                                        e.target.value
                                                    )
                                                }
                                                defaultValue={item?.value || ""}
                                                {...register(
                                                    `config.${index}.value`
                                                )}
                                            />
                                            {errors.config &&
                                                errors.config[index]?.value && (
                                                    <p className="error">
                                                        {
                                                            errors.config[index]
                                                                .value.message
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex flex-col border-b-[1px] border-[#999] pb-[8px] mb-[10px]">
                                            <label
                                                htmlFor={`.quota`}
                                                className="text-[13px] text-[#999] mb-[5px]"
                                            >
                                                Hạn ngạch nhận thưởng
                                            </label>
                                            <input
                                                className="border-none outline-none text-[16px] text-[#000]"
                                                type="text"
                                                name={`config.quota`}
                                                onChange={(e) =>
                                                    setValue(
                                                        "quota",
                                                        e.target.value
                                                    )
                                                }
                                                defaultValue={item?.quota || ""}
                                                {...register(
                                                    `config.${index}.quota`
                                                )}
                                            />
                                            {errors.config &&
                                                errors.config[index]?.quota && (
                                                    <p className="error">
                                                        {
                                                            errors.config[index]
                                                                .quota.message
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                    <button
                                        className="p-5"
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <icons.CiCircleRemove className="text-[#000] text-[30px] font-bold cursor-pointer" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center pb-[20px] justify-center gap-[5px] mt-[20px]">
                            <button
                                type="submit"
                                className="bg-main py-[10px] w-[90px] rounded-md text-[#fff]"
                            >
                                Lưu
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-[#999] py-[10px] w-[90px] rounded-md text-[#fff]"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MyModal;
