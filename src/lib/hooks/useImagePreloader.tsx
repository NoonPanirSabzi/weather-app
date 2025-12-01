import { useState, useEffect } from "react";

/**
 * A custom hook to preload a list of images.
 * only runs on initial load.
 * @param srcList An array of image source URLs to preload.
 * @returns A boolean indicating whether all images have been successfully loaded.
 */
const useImagePreloader = (srcList: string[]): boolean => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadImages = async () => {
      // If the source list is empty, we can consider the "loading" complete.
      if (!srcList || srcList.length === 0) {
        setImagesLoaded(true);
        return;
      }

      // Create an array of promises, one for each image.
      const promises = srcList.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = src;

          // When the image successfully loads, resolve the promise.
          img.onload = () => resolve();

          // If the image fails to load, reject the promise.
          img.onerror = () =>
            reject(new Error(`Failed to load image at: ${src}`));
        });
      });

      try {
        // Wait for all image loading promises to resolve.
        await Promise.all(promises);

        // If the component hasn't been unmounted, update the state.
        if (!isCancelled) {
          setImagesLoaded(true);
        }
      } catch (error) {
        // If any image fails, log the error.
        console.error("One or more images failed to preload:", error);

        // We still set loaded to true to unblock rendering,
        // even with a broken image icon. Or you could set a specific error state.
        if (!isCancelled) {
          setImagesLoaded(true);
        }
      }
    };

    preloadImages();

    // Cleanup function: If the component unmounts before images are loaded,
    // this will prevent setting state on an unmounted component.
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return imagesLoaded;
};

export default useImagePreloader;
