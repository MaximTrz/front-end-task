import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loadProfile } from '../store/slices/profile.slice';

const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fullname = useSelector((state: RootState) => state.profileSlice.fullname);
  const email = useSelector((state: RootState) => state.profileSlice.email);
  const requestStatus = useSelector((state: RootState) => state.profileSlice.requestStatus);
  const error = useSelector((state: RootState) => state.profileSlice.error);

  const getProfile = (token: string) => {
    dispatch(loadProfile(token));
  };

  return {
    getProfile,
    fullname,
    email,
    requestStatus,
    error,
  };
};

export default useProfile;
