import React, { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const MultipleInputField = ({
    name,
    label,
    placeholder,
    onClick,
    options
}) => {

    const [optionValue, setOptionValue] = useState('');
    const [multipleOptionValue, setMultipleOptionValue] = useState(options || []);

    function handleAddClick() {
        if (multipleOptionValue.includes(optionValue)) return;
        if(!optionValue) return
        setMultipleOptionValue((prevState) => ([
            ...prevState,
            optionValue
        ]))
        setOptionValue("");
    }

    function handleDelete(value) {
        const result = multipleOptionValue.filter((optionValue) => optionValue !== value);
        setMultipleOptionValue(result)
    }

    useEffect(() => {
        onClick?.(multipleOptionValue, name)
    }, [multipleOptionValue]);

    const addButtonClass = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-50'

    return (
        <fieldset className="fieldset py-0">
            <div>
                <legend className="fieldset-legend pt-0">{label}</legend>
                <div className='relative'>
                    <input
                        name={name}
                        type="text"
                        value={optionValue}
                        onChange={(e) => setOptionValue(e.target.value)}
                        className="input input-primary w-full"
                        placeholder={placeholder}
                    />
                    <IoIosAdd size={20} onClick={handleAddClick} className={addButtonClass} />
                </div>
            </div>

            {
                multipleOptionValue &&
                multipleOptionValue.length > 0 &&
                <div className='gap-2 flex flex-wrap mt-3'>
                    {

                        multipleOptionValue
                            .map(skill =>
                                <button className="btn btn-soft btn-info h-[30px] max-w-fit relative gap-2 flex">
                                    {skill}
                                    <RxCross2
                                        onClick={() => handleDelete(skill)}
                                        className=""
                                    />
                                </button>)
                    }
                </div>
            }

        </fieldset>
    )
}

export default MultipleInputField