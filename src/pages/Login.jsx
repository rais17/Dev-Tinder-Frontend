import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../store/alertSlice";
import { useLoginMutation } from "../services/api/authApi";
import {Link} from "react-router-dom"

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    
    if (isLoading) return null;

    async function handleSubmit() {
        try {
            const data = await login({ email: emailId, password: password }).unwrap();
            dispatch(showAlert({message: data.message, type: 'success'}))
            return navigate("/");
        } catch (err) {
            console.error(err?.data?.message || err?.error);
            dispatch(showAlert({ message: err?.data?.message || err?.error || "Something Went Wrong | Login", type: 'error'}))
        }
    }

    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="card w-96 bg-base-300 card-sm shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>

                    <InputField
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="john@xyz.com"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        isLoading={isLoading}
                    />

                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="john@123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isLoading={isLoading}
                    />
                    <Button
                        className="w-1/2 flex place-items-center place-self-center"
                        variant="btn-primary"
                        text="Login"
                        submit={handleSubmit}
                        isLoading={isLoading}
                    />

                    <div className="text-gray-300 flex justify-center items-center gap-1 mt-2">
                        New to DevTinder ?
                        <Link to='/signup' className="text-gray-100 cursor-pointer">Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
