import _ from 'lodash';
import { DragEvent, useCallback, useState } from 'react';

const useDragOver = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const releaseDragOver = useCallback(
    _.debounce(() => {
      setIsDragOver(false);
    }, 100),
    [],
  );

  const onDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
      releaseDragOver();
    },
    [releaseDragOver],
  );

  return [isDragOver, setIsDragOver, onDragOver] as const;
};

export default useDragOver;
