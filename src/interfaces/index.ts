import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface MessagesInterface {
  id: string;
  message: string;
  sender: string;
  date: string;
  room: string;
  type: "text" | "audio" | "media";
  isOwner?: boolean;
}

export interface ChatToolsInterface {
  setMessages: Dispatch<SetStateAction<MessagesInterface[]>>;
  name: string;
  socketInstance: Socket;
  chatId: string;
}

export interface SendInterface {
  sendMessage: (event: React.FormEvent) => void;
}

export interface VoiceRecorderInterface {
  setIsRecording: Dispatch<SetStateAction<boolean>>;
  isRecording: boolean;
  sendAudio: (url: string) => void;
  cancel: boolean;
  chatId: string;
}

export interface AudioPlayerProps {
  audioUrl: string;
  isOwner?: boolean;
}

export interface UserActionInterface {
  room: string;
  name: string;
  type: "text" | "audio";
}

export interface NewParticipant extends UserActionInterface {}

export interface CameraInterface {
  chatId: string;
  sendImage: (url: string) => void;
}

export interface AlbumInterface extends CameraInterface {}

export interface ImageEstructureInterface {
  url?: string;
  date?: string;
  sender?: string;
}
