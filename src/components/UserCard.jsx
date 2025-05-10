import React from 'react'
import { useShowInterestMutation } from '../services/api/requestApi';
import { showAlert } from '../store/alertSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ item, isLoggedInUser = false }) => {
    const { firstName, lastName, photoUrl, about, skills, _id: toUserId } = item;
    const [showInterest] = useShowInterestMutation();
    const dispatch = useDispatch();

    async function handleConnectionRequest(status) {
        try {
            const response = await showInterest({status, toUserId});
            dispatch(showAlert({ message: `Connection Send`, type: 'success' }));
        } catch (err) {
            console.error("Something Went Wrong While Sending Connection");
            dispatch(showAlert({ message: err?.data?.message || err?.error, type: "error" }));
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    className='w-full h-[300px] object-cover'
                    src={photoUrl}
                    loading='eager'
                    alt="Shoes" />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p className='text-gray-400'>{about}</p>
                {
                    skills && skills.length > 0 &&
                    <div className='flex flex-col gap-2'>
                        <p className='text-gray-300 text-[12px]'>Skills</p>
                        <div className='gap-2 flex flex-wrap'>
                            {skills.map(skill => <button key={skill} className="btn btn-soft btn-info max-w-fit h-[30px]">{skill}</button>)}
                        </div>
                    </div>
                }
                {
                    !isLoggedInUser &&
                    <div className="card-actions justify-center items-center gap-4 mt-4">
                        <button onClick={() => handleConnectionRequest('interested')} className="btn btn-primary w-24">Interested</button>
                        <button onClick={() => handleConnectionRequest('ignored')} className="btn btn-primary w-24">Ignore</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserCard