import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';

const useLoginAutomatically = (): void => {
  const dispatch = useDispatch();
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    if (!isUnmountedRef.current && accessToken && username) {
      dispatch(actions.logUser(accessToken, username));
    }
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
};

export default useLoginAutomatically;
