import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export const uploadImage = async (
  file: Blob,
  imageId: string,
  chatId: string
) => {
  const storageRef = ref(
    storage,
    `chats/${chatId}/images/${Date.now()}_${imageId}`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function (if needed)
      },
      (error) => {
        // Error function
        reject(error);
      },
      () => {
        // Complete function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
