import { memo, useState } from 'react';

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23d4cfb8" width="400" height="300"/%3E%3Ctext fill="%234a2c1a" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EИзображение%3C/text%3E%3C/svg%3E';

const Image = memo(({ src, alt, fallback = PLACEHOLDER, className = '', ...props }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      onLoad={() => setLoaded(true)}
      className={`${className} ${!loaded && !error ? 'animate-pulse bg-beige-dark' : ''}`}
      {...props}
    />
  );
});

Image.displayName = 'Image';
export default Image;
