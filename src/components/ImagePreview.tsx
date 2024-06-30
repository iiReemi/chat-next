"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { useImagePreview } from "@/contexts/imagePreviewContext";
import Image from "next/image";

export default function ImagePreview() {
  const imgCtx = useImagePreview();

  const onOpenSwitch = () => {
    imgCtx?.setIsShow(!imgCtx?.isShow);
  };

  return (
    <Dialog open={imgCtx?.isShow} onOpenChange={onOpenSwitch}>
      <DialogContent className="bg-stone-100">
        <DialogHeader>
          <DialogDescription>
            Enviado por {imgCtx?.imageEstructure.sender} ás{" "}
            {imgCtx?.imageEstructure.date}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-full shadow-lg ">
          {imgCtx?.imageEstructure && (
            <Image
              className="w-full h-full rounded-lg"
              src={imgCtx?.imageEstructure?.url || ""}
              alt="Foto"
              width={120}
              height={120}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
