import { useState, useCallback, useEffect } from 'react';
import LazySkeleton from '../LazySkeleton';

interface SkeletonizedImageProps {
  width: number;
  height: number;
  src: string;
  alt?: string;
}

const SkeletonizedImage = ({ width, height, src, alt }: SkeletonizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoadImage = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <div style={{ position: 'absolute', zIndex: '-1', width: `${width}px`, height: `${height}px` }}>
        {!isLoaded && <LazySkeleton width={width} height={height} />}
      </div>
      <img src={src} alt={alt} onLoad={onLoadImage} />
    </div>
  );
};

export default SkeletonizedImage;
