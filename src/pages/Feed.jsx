import React from 'react'
import UserCard from '../components/UserCard'
import { useGetUserFeedQuery } from '../services/api/userApi';
import Loader from '../components/Loader';

const Feed = () => {

  const { data, isLoading, isError, error } = useGetUserFeedQuery();
  
  if (isLoading) return <Loader />
  if (isError) return <div>Error is in Feed Page...</div>

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-64px)]'>
      {
        data && data.response && data.response.length > 0 ?
          < UserCard item={data.response[0]} /> :
          <div className='p-4 pb-2 text-lg opacity-60 tracking-wide text-center'>No Post</div>
      }
    </div>
  )
}

export default Feed