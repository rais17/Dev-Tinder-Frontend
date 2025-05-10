import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Textarea from '../components/Textarea';
import { useSignupMutation } from '../services/api/authApi';
import { useDispatch } from 'react-redux';
import {showAlert} from "../store/alertSlice"

const SignUp = () => {

  const [signup, {data, isLoading, isError, isSuccess, error }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", 
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    // TODO: VALIDATE DATA
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  async function handleSubmit() {
    try {
      if (!formData.password === formData.confirmPassword) {
        dispatch(showAlert({ message: 'Password Not Match', type: "error" }))
        return;
      }

      const authData = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(showAlert({ message: "Successfully Signup", type: "success" }));
      navigate('/login');

    } catch (err) {
      console.error("Something Went Wrong While Signup", err);
      dispatch(showAlert({ message: err?.data?.message || err?.error, type: "error" }));
    }
  }

  function handleSelect(option, type) {
    setFormData((prevState) => ({
      ...prevState,
      [type]: option
    }))
  }

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="card w-96 bg-base-300 card-sm shadow-sm">
        <div className="card-body gap-3">
          <h2 className="card-title">Sign Up</h2>

          <div className='flex flex-col gap-4'>
            <div className='flex gap-3.5'>
              <InputField
                type="text"
                name="firstName"
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                isLoading={isLoading}
              />
              <InputField
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                isLoading={isLoading}
              />
            </div>

            <InputField
              type="email"
              name="email"
              label="Email"
              placeholder="john@xyz.com"
              value={formData.email}
              onChange={handleChange}
              isLoading={isLoading}
            />

            <div className='flex gap-3.5'>
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="john@123"
                value={formData.password}
                onChange={handleChange}
                isLoading={isLoading}
              />

              <InputField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="john@123"
                value={formData.confirmPassword}
                onChange={handleChange}
                isLoading={isLoading}
              />
            </div>
          </div>

          <Button
            className="w-1/2 flex place-items-center place-self-center"
            variant="btn-primary"
            text="Sign Up"
            submit={handleSubmit}
            isLoading={isLoading}
          />

          <div className="text-gray-300 flex justify-center items-center gap-1 mt-2">
            Already Have Account ?
            <Link to='/login' className="text-gray-100 cursor-pointer">Log In</Link></div>
        </div>
      </div>
    </div>
  )
}

export default SignUp