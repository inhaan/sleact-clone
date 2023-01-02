import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

interface LazySkeletonProps {
  refresher?: string;
  width: number;
  height: number;
  time?: number;
}

const LazySkeleton = ({ refresher, width, height, time }: LazySkeletonProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), time ?? 100);
    return () => clearTimeout(timer);
  }, [refresher, time]);

  return <>{show && <Skeleton width={width} height={height} />}</>;
};

export default LazySkeleton;
