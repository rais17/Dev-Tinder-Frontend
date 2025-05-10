import React from 'react'
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { useReviewReceivedRequestMutation } from '../services/api/requestApi';
import { useDispatch } from 'react-redux';
import { showAlert } from '../store/alertSlice';

const RequestCard = ({ item: { fromUserId, _id: connectionId } }) => {

    const [reviewReceivedRequest, { isLoading, isError }] = useReviewReceivedRequestMutation();
    const dispatch = useDispatch();

    const {
        _id: userId,
        firstName,
        lastName,
        photoUrl,
        skills,
        about,
    } = fromUserId

    async function handleRequest(status) {
        try {
            const response = await reviewReceivedRequest({ status, connectionId }).unwrap();
            dispatch(showAlert({ message: status === 'accepted' ? 'Accepted' : 'Rejected', type: 'success' }));
        } catch (err) {
            console.error("Something Went Wrong | Request", err?.data?.message || err?.error);
            dispatch(showAlert({ message: "Something Went Wrong | Request", type: "error" }));
        }
    }

    return (
        <li className="list-row w-3xl bg-base-300">
            <div><img className="size-10 rounded-box object-cover" loading='lazy' src={photoUrl} /></div>
            <div>
                <div>{firstName + " " + lastName}</div>
                <div className={`flex flex-col gap-2`}>
                    {Array.isArray(skills) && skills.length > 0 && <div className={`text-xs uppercase font-semibold opacity-60 ${!skills && 'hidden'}`}>{skills.join(" ,")}</div>}
                    {about &&
                        <p className="list-col-wrap text-xs">
                            {about}
                        </p>
                    }
                </div>
            </div>
            
            <div className='flex items-center justify-center gap-8'>
                <FcDislike onClick={() => handleRequest('rejected')} className='cursor-pointer' size={24} />
                <FcLike onClick={() => handleRequest('accepted')} className='cursor-pointer' size={24} />
            </div>
        </li>
    )
}

export default RequestCard