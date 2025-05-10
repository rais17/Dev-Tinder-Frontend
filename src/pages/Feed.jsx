import React from 'react'
import UserCard from '../components/UserCard'
import { useGetUserFeedQuery } from '../services/api/userApi';

const Feed = () => {

  const { data, isLoading, isError, error } = useGetUserFeedQuery();
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error is in Feed Page...</div>

  return (
    <div className='flex justify-center items-center h-[calc(100vh-64px)]'>
      {
        data && data.response && data.response.length > 0 ?
          < UserCard item={data.response[0]} /> :
          null
      }
    </div>
  )
}

export default Feed