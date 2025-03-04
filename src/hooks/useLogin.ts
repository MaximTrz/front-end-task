import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginUser } from '../store/slices/login.slice';

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.loginSlice.auth);
  const token = useSelector((state: RootState) => state.loginSlice.token);
  const requestStatus = useSelector((state: RootState) => state.loginSlice.requestStatus);
  const error = useSelector((state: RootState) => state.loginSlice.error);

  const login = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  return {
    login,
    auth,
    token,
    requestStatus,
    error,
  };
};

export default useLogin;
