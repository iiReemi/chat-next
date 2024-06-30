import { resizeImageToBlob } from "@/functions/resizeImageToBlob";
import { CameraInterface } from "@/interfaces";
import { uploadImage } from "@/services/uploadImage";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "./ui/button";

export default function Upload({ chatId, sendImage }: CameraInterface) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = () => {
    if (inputRef.current) {
      inputRef.current.accept = "image/*";
      inputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target?.files;
    if (files && files[0]) {
      const file = files[0];
      try {
        const resizedBlobImage = await resizeImageToBlob(file, 800, 600, 0.8);
        const downloadURL = await uploadImage(resizedBlobImage, uuid(), chatId);

        sendImage(downloadURL);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handle}
        variant={"link"}
        className="rounded-full w-10 h-10 flex items-center justify-center text-white"
      >
        <span>
          <Plus size={18} />
        </span>
      </Button>
      <input
        onChange={(e) => handleFileChange(e)}
        ref={inputRef}
        type="file"
        className="hidden"
        id="album"
        name="album"
      />
    </>
  );
}
