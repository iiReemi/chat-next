"use client";

import { ImageEstructureInterface } from "@/interfaces";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ImagePreviewContextType {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  imageEstructure: ImageEstructureInterface;
  setImageEstructure: Dispatch<SetStateAction<ImageEstructureInterface>>;
}

interface MyComponentProps {
  children: ReactNode;
}

export const ImagePreviewContext = createContext<
  ImagePreviewContextType | undefined
>(undefined);

export const ImagePreviewProvider: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [imageEstructure, setImageEstructure] =
    useState<ImageEstructureInterface>({
      url: "",
      sender: "",
      date: "",
    });

  return (
    <ImagePreviewContext.Provider
      value={{
        isShow,
        setIsShow,
        imageEstructure,
        setImageEstructure,
      }}
    >
      {children}
    </ImagePreviewContext.Provider>
  );
};

export function useImagePreview() {
  const context = useContext(ImagePreviewContext);
  return context;
}
