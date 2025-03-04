import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchInfo } from '../store/slices/base.slice';

const useStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const aboutUs = useSelector((state: RootState) => state.baseSlice.aboutUs);

  const fetchAboutUs = () => {
    dispatch(fetchInfo());
  };

  return {
    aboutUs,
    fetchAboutUs,
  };
};

export default useStore;
