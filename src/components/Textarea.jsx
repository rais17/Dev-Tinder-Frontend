import React from 'react'

const Textarea = ({ name, placeholder, value, onChange, className, isLoading, ...props }) => {
  return (
    <textarea
      disabled={isLoading}
      name={name}
      className={`textarea textarea-primary w-full ${className || ''}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    ></textarea>
  )
}

export default Textarea