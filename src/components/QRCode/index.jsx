import React, { useEffect, useState } from 'react';
import { PiMedal } from 'react-icons/pi';
import { BsFillFileEarmarkRuledFill } from 'react-icons/bs';
import './qrcode.scss';
import { createCodeApi } from '../../services/codeService';
import BonusCode from './BonusCode';
import Regulations from './Regulations';

const Qrcode = () => {

    const [tabActive, setTabActive] = useState('TabBonusCode')

    const onChangeTab = (tab) => {
        setTabActive(tab)
    }
    return (
        <div className='back-img '>
            <div className="relative top-[13%] left-1/2 -translate-x-1/2 w-[700px]">
                <div className="text-left flex items-center">
                    <button
                        className={`tabs w-[180px] ${tabActive === 'TabBonusCode' ? 'active-tabs' : ''}`}
                        onClick={() => onChangeTab('TabBonusCode')}
                    >
                        <div className="nav-list font-medium h-[50px] flex gap-1 items-center w-full justify-center">
                            <PiMedal className="mt-[1px] text-[18px]" />
                            NHẬN THƯỞNG
                        </div>
                    </button>
                    <button
                        className={`w-[180px] tabs ${tabActive === 'TabRegulations' ? 'active-tabs' : ''}`}
                        onClick={() => onChangeTab('TabRegulations')}
                    >
                        <div className="nav-list h-[50px] font-medium flex gap-1 items-center text-center w-full justify-center">
                            <BsFillFileEarmarkRuledFill className="mt-1 text-[18px]" />
                            THỂ LỆ
                        </div>
                    </button>
                </div>
                <div className="content-tabs ">
                    <div className="content active-content">
                        {tabActive === 'TabBonusCode' ? (
                            <BonusCode changeTab={onChangeTab} />
                        ) : (
                            <Regulations changeTab={onChangeTab} />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Qrcode;
