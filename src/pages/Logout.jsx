import { useEffect } from 'react'
import { AlertMessage } from '../components/message'
import { useDispatch } from 'react-redux'
import { xClearAll } from '../redux/features/user/userSlice';
import { toast } from 'react-toastify';

const Logout = () => {
  const dispatch = useDispatch();
  const SUCCESSMESSAGE = "You have successfully logout your account.";

  useEffect(()=>{
    toast.success(SUCCESSMESSAGE);
    dispatch(xClearAll());
  },[])

  return (
    <AlertMessage></AlertMessage>
  )
}

export default Logout