import type { ImgHTMLAttributes } from 'react';

/**
 * Prefer original-resolution EUNIJOPA photographs.
 * Legacy low-resolution images remain a temporary fallback until assets are installed.
 */
type EunijopaPhotoProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallback: string;
};
export function EunijopaPhoto({ fallback, src, ...props }: EunijopaPhotoProps) {
  return (
    <img
      {...props}
      src={src}
      onError={(event) => {
        const image = event.currentTarget;
        if (image.getAttribute('src') !== fallback) {
          image.src = fallback;
        }
      }}
    />
  );
}
