import React from "react";
import { navigations } from "../utils/constant";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <ul className="flex flex-col">
            {navigations.map((item) => (
                <li key={item.id}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-[10px] px-[10px] py-[15px] rounded-[3px] cursor-pointer ${
                                isActive
                                    ? `bg-main hover:opacity-90`
                                    : `hover:bg-[#0000004d]`
                            }`
                        }
                    >
                        {item.icon}
                        <p className="text-[14px] font-semibold">{item.text}</p>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Sidebar;
