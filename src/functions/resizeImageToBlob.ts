import pica from "pica";

export const resizeImageToBlob = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const tempCanvas = document.createElement("canvas");
        const picaInstance = pica();

        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempCanvas.getContext("2d")?.drawImage(img, 0, 0);

        canvas.width = width;
        canvas.height = height;

        try {
          await picaInstance.resize(tempCanvas, canvas, {
            quality: 3,
          });

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Blob conversion failed"));
              }
            },
            "image/jpeg",
            quality
          );
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = (error) => {
        reject(error);
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
