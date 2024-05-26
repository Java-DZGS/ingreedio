import { useEffect, useRef } from 'react';

const useEffectSingular = (func: () => void): void => {
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    if (!isUnmountedRef.current) {
      func();
    }

    return () => {
      isUnmountedRef.current = true;
    };
  }, []);
};

export default useEffectSingular;
