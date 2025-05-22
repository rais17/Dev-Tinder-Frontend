import React from 'react'
import { useGetUsersConnectionsQuery } from '../services/api/userApi'
import FriendsCard from '../components/FriendsCard';
import Loader from '../components/Loader';

const Friends = () => {

    const { data, isLoading, isError } = useGetUsersConnectionsQuery();
    if (isLoading) return <Loader />;
    if (isError) return <div>Error...</div>;

    const response = data?.response;

    return response && Array.isArray(response) && response.length ? (
        
        <ul className='list bg-base-100 rounded-box shadow-md w-full min-h-[calc(100dvh-64px)] pb-32'>
                    <li className="p-4 pb-2 text-lg opacity-60 tracking-wide text-center">
                        Your's Connections
                    </li>
        
                    <div className='flex flex-col justify-between items-center gap-1.5'>
                        {response.map((item) => <FriendsCard item={item} key={item._id} />)}
                    </div>
                </ul>

    ) : <div className='p-4 pb-2 text-lg opacity-60 tracking-wide text-center'>You Have No Connections Yet</div>
}

export default Friends