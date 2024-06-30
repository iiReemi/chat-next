"use client";

import { ChatToolsInterface, MessagesInterface } from "@/interfaces";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Camera from "./Camera";
import RecordingAnimation from "./RecordingAnimation/RecordingAnimation";
import Send from "./Send";
import StopRecording from "./StopRecording";
import Upload from "./Upload";
import VoiceRecorder from "./VoiceRecorder";
import { Input } from "./ui/input";

export default function ChatTools({
  name,
  setMessages,
  socketInstance,
  chatId,
}: ChatToolsInterface) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [cancel, setCancel] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      if (text.trim() !== "") {
        const message: MessagesInterface = {
          id: uuid(),
          message: text,
          sender: name,
          date: moment().format("HH:mm"),
          room: chatId,
          type: "text",
        };
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...message,
            isOwner: true,
          },
        ]);

        socketInstance.emit("message", message);
        socketInstance.emit("user-action", {
          room: chatId,
          name: "",
          type: "text",
        });
        setText("");
      }
    },
    [text, name, chatId, setMessages, socketInstance]
  );

  const sendAudio = useCallback(
    (url: string) => {
      const message: MessagesInterface = {
        id: uuid(),
        message: url || "",
        sender: name,
        date: moment().format("HH:mm"),
        room: chatId,
        type: "audio",
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          isOwner: true,
        },
      ]);

      socketInstance.emit("message", message);
    },
    [name, chatId, setMessages, socketInstance]
  );

  const sendImage = useCallback(
    (url: string) => {
      const message: MessagesInterface = {
        id: uuid(),
        message: url || "",
        sender: name,
        date: moment().format("HH:mm"),
        room: chatId,
        type: "media",
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          isOwner: true,
        },
      ]);

      socketInstance.emit("message", message);
    },
    [name, chatId, setMessages, socketInstance]
  );

  const handleTyping = (value: string) => {
    setText(value);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socketInstance.emit("user-action", {
        room: chatId,
        name: value ? name : "",
        type: "text",
      });
    }, 100);
  };

  useEffect(() => {
    if (isRecording) {
      socketInstance.emit("user-action", {
        room: chatId,
        name: name,
        type: "audio",
      });
    } else {
      socketInstance.emit("user-action", {
        room: chatId,
        name: "",
        type: "audio",
      });
    }
  }, [chatId, isRecording, name, socketInstance]);

  return (
    <div className="flex items-center gap-2 bg-stone-800 h-14 px-6 w-full py-2 sticky bottom-0">
      {isRecording ? (
        <StopRecording onClick={() => setCancel(!cancel)} />
      ) : (
        <Upload chatId={chatId} sendImage={sendImage} />
      )}

      {isRecording ? (
        <RecordingAnimation />
      ) : (
        <Input
          ref={inputRef}
          type="text"
          id="text"
          name="text"
          className="flex-grow border-none bg-stone-600 rounded-2xl text-white text-lg"
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (inputRef.current) {
                inputRef.current.focus();
              }
              sendMessage();
            }
          }}
        />
      )}

      {!isRecording && <Camera chatId={chatId} sendImage={sendImage} />}

      {text === "" ? (
        <VoiceRecorder
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          sendAudio={sendAudio}
          cancel={cancel}
          chatId={chatId}
        />
      ) : (
        <Send sendMessage={sendMessage} />
      )}
    </div>
  );
}
