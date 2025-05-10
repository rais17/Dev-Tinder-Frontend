import React from 'react'

const Dropdown = ({
    name,
    label,
    placeholder,
    option,
    options,
    onSelect,
    isLoading,
    className=``
}) => {

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const selectOption = (option) => {
        onSelect(option, name);
        setIsOpen(false);
    };

    return (
        <div className={`${className}`}>
            <label className="fieldset-legend pt-0">{label}</label>
            <div className="relative">
                <button
                    disabled={isLoading}
                    onClick={toggleDropdown}
                    className="w-full input input-primary flex justify-between items-center"
                >
                    <span className={option ? 'text-white' : 'text-gray-400'}>
                        {option || placeholder}
                    </span>
                    <span>▼</span>
                </button>
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-gray-900 rounded-lg shadow-lg mt-1 z-10">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => selectOption(option)}
                                className="p-2 text-white hover:bg-gray-700 cursor-pointer"
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown