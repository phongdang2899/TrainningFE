import React from 'react'

const Input = (props) => {
    const { data, setData, label, placeholder } = props;
    return (
        <div className=''>
            <div>{label}</div>
            <input
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="h-[50px] mt-2 w-full outline-none border-[#A8A8A8] rounded-[5px] border-[1px] px-2"
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input