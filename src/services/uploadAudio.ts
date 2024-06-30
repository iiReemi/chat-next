// functions/uploadAudio.ts
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export const uploadAudio = async (
  file: Blob,
  audioId: string,
  chatId: string
) => {
  const storageRef = ref(
    storage,
    `chats/${chatId}/audios/${Date.now()}_${audioId}`
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
