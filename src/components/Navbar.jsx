import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGetCurrentUserProfileQuery } from '../services/api/profileApi';
import { useLogoutMutation } from '../services/api/authApi';
import { showAlert } from '../store/alertSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {

    const { data, isSuccess, isLoading, isError, error } = useGetCurrentUserProfileQuery();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    if (isError)
        dispatch(showAlert({ message: error.data.message, type: "error" }));

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        < div className="navbar bg-base-300 shadow-sm px-10 z-auto" >
            <div onClick={() => navigate("/")} className="flex-1">
                <a className="btn btn-ghost text-xl">DevTinder</a>
            </div>
            {
                isSuccess && data && data.response ?
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div className='flex items-center gap-2'>
                                <h1>Welcome, {data.response.firstName}</h1>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    {
                                        data.response.photoUrl &&
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="User Image"
                                                src={data.response.photoUrl} />
                                        </div>
                                    }
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3.5 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/friends" className="justify-between">
                                        Friends
                                    </Link></li>
                                <li>
                                    <Link to="/requests" className="justify-between">
                                        Requests
                                    </Link>
                                </li>
                                <li><div onClick={handleLogout}>Logout</div></li>
                            </ul>
                        </div>
                    </div> : null

            }
        </div >
    )
}

export default Navbar

