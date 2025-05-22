import React from 'react'

const ChatItemTextArea = ({
    className,
    placeholder,
    onChange,
    ref,
    ...props
}) => {
    return (
        <div className='w-full'>
            <textarea
                ref={ref}
                className={`
                    textarea 
                    textarea-primary 
                    w-full 
                    focus:outline-none 
                    focus:border-primary 
                    focus:ring-0 
                    resize-none
                    min-h-auto
                    ${className || ''}`
                }
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            ></textarea>
        </div>
    )
}

export default ChatItemTextArea