import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react'; // Импортируем useCallback
import { RootState, AppDispatch } from '../store';
import { loginUser, logoutUser } from '../store/slices/login.slice';

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.loginSlice.auth);
  const token = useSelector((state: RootState) => state.loginSlice.token);
  const requestStatus = useSelector((state: RootState) => state.loginSlice.requestStatus);
  const error = useSelector((state: RootState) => state.loginSlice.error);

  const login = useCallback(
    (email: string, password: string) => {
      dispatch(loginUser({ email, password }));
    },
    [], 
  );

  const logout = useCallback(() => {
    if (token) {
      dispatch(logoutUser(token));
    }
  }, [token]); 

  return {
    login,
    logout,
    auth,
    token,
    requestStatus,
    error,
  };
};

export default useLogin;