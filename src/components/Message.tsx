import { useImagePreview } from "@/contexts/imagePreviewContext";
import { MessagesInterface } from "@/interfaces";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";

export default function Message(item: MessagesInterface) {
  const imagePreviewContext = useImagePreview();

  const openPreview = () => {
    if (imagePreviewContext && item.message && item.type === "media") {
      imagePreviewContext.setImageEstructure({
        url: item.message,
        date: item.date,
        sender: item.sender,
      });
      imagePreviewContext.setIsShow(true);
    }
  };

  return (
    <div
      key={item.id}
      className={`flex ${item.isOwner ? "justify-end" : "justify-start"}`}
    >
      <div
        onClick={openPreview}
        className={`flex flex-col p-2 items-start justify-start rounded-xl ${
          item.type === "text"
            ? "w-fit max-w-[24rem]"
            : item.type === "media" && "w-[12rem]"
        } gap-1 shadow-md
      ${
        item.isOwner
          ? "bg-stone-800 text-white rounded-br-none"
          : "bg-white rounded-bl-none"
      }
    `}
      >
        {item.type === "text" && (
          <Label className="text-xs">{item.message}</Label>
        )}
        {item.type === "audio" && (
          <div>
            {item.message && (
              <AudioPlayer audioUrl={item.message} isOwner={item.isOwner} />
            )}
          </div>
        )}
        {item.type === "media" && (
          <div className="w-full h-full">
            {item.message && (
              <Image
                className="w-full h-full"
                src={item.message}
                alt="Foto"
                width={120}
                height={120}
              />
            )}
          </div>
        )}
        <Label className="text-xs italic text-stone-400">
          {!item.isOwner && item.sender} {item.date}
        </Label>
      </div>
    </div>
  );
}
