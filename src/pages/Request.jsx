import React from 'react'
import { useGetUserReceivedRequestQuery } from '../services/api/userApi'
import RequestCard from '../components/RequestCard';

const Request = () => {
    const { data, isLoading, isError } = useGetUserReceivedRequestQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>

    const requests = data?.response;

    console.log("DEBUG___requests", requests);
    return (
        <ul className='list bg-base-100 rounded-box shadow-md w-full h-[calc(100dvh-64px)]'>
            <li className="p-4 pb-2 text-lg opacity-60 tracking-wide text-center">{
                requests &&
                    Array.isArray(requests) &&
                    requests.length ? 'Your Request' : "You Have No Request Found"}
            </li>

            <div className='flex flex-col justify-between items-center gap-1.5'>
                {requests?.map((request) => <RequestCard key={request._id} item={request} />)}
            </div>
        </ul>
    )
}

export default Request