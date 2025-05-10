import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";


const InputField = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    name, 
    isLoading,
    className=``
}) => {

    const [isPasswordVisibile, setIsPasswordVisible] = useState(false);

    function toggleVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const toggleClassName = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-50'

    return (
        <fieldset className={`className="w-1/2" ${className}`}>
            <legend className="fieldset-legend pt-0">{label}</legend>
            <div className='relative'>
                <input
                    name={name}
                    type={type === 'password' ? isPasswordVisibile ? "text" : "password" : type}
                    value={value} onChange={onChange} className="input input-primary w-full"
                    placeholder={placeholder}
                    disabled={isLoading}
                />
                {type === 'password' ? isPasswordVisibile ?
                    <FaRegEye onClick={toggleVisibility} className={toggleClassName} /> :
                    <FaRegEyeSlash onClick={toggleVisibility} className={toggleClassName} /> : null}
            </div>
        </fieldset>
    )
}

export default InputField