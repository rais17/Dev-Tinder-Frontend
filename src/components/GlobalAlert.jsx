import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from '../store/alertSlice';

const GlobalAlert = () => {
  const alert = useSelector(store => store.alert);
  const dispatch = useDispatch();


  useEffect(() => {
    let timerId;
    timerId = setTimeout(() => dispatch(dismissAlert()), 5000);

    return () => {
      clearTimeout(timerId);
    }
  }, [alert]);

  let alertType;
  switch (alert?.type) {
    case 'success':
      alertType = 'alert-success';
      break;
    case 'error':
      alertType = 'alert-error'
      break;
    default:
      alertType = 'alert-info'
   }

  return alert ? (
    <div role="alert" className={`alert ${alertType} alert-soft fixed top-0 right-1 z-50`}>
      <span>{alert?.message}</span>
      </div>
  ) : null
}

export default GlobalAlert