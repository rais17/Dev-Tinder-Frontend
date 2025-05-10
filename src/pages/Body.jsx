import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import GlobalAlert from '../components/GlobalAlert'
import { useGetCurrentUserProfileQuery } from '../services/api/profileApi'

const Body = () => {

  const { data, isSuccess, isError } = useGetCurrentUserProfileQuery();
  const navigate = useNavigate();

  if (!data && !isSuccess && isError)
    navigate('/login')

  return (
      <div>
          <Navbar />
          <Outlet />
      </div>
  )
}

export default Body