import { ChangeEvent, useCallback, useState } from 'react';

const useInput = (initialState: string) => {
  const [value, setValue] = useState(initialState);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, onChangeInput, setValue] as const;
};

export default useInput;
