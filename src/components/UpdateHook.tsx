import { useState, useCallback } from 'react';

function UpdateHook() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
}

export default UpdateHook;