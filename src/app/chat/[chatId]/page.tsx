"use client";

import ChatTools from "@/components/ChatTools";
import ImagePreview from "@/components/ImagePreview";
import Message from "@/components/Message";
import UserAction from "@/components/UserAction";
import useSocket from "@/hooks/useSocket";
import {
  MessagesInterface,
  NewParticipant,
  UserActionInterface,
} from "@/interfaces";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type ParamsType = {
  params: {
    chatId: string;
  };
};

export default function Page({ params }: ParamsType) {
  const [messages, setMessages] = useState<MessagesInterface[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socketInstance } = useSocket();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Não informado";

  const [userAction, setUserAction] = useState<UserActionInterface>();

  useEffect(() => {
    const audio = new Audio("/messageTone.mp3");

    function onMessage(newMessage: {
      id: string;
      message: string;
      sender: string;
      date: string;
      room: string;
      type: "text" | "audio" | "media";
    }) {
      audio.play();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...newMessage,
        },
      ]);
    }

    function onAction(newAction: UserActionInterface) {
      setUserAction(newAction);
    }

    function onNewParticipant(participant: NewParticipant) {
      if (participant !== undefined) {
        toast(`${participant} entrou no chat!`, { position: "top-center" });
      }
    }

    function onReconnectAttempt(attempt: number) {
      toast(`${attempt}: Tentando reestabelecer conexão...`, {
        position: "top-center",
      });
    }

    socketInstance.emit("join", params.chatId);
    socketInstance.on("message", onMessage);
    socketInstance.on("user-action", onAction);
    socketInstance.on("new-participant", onNewParticipant);
    socketInstance.on("reconnect_attempt", onReconnectAttempt);

    return () => {
      socketInstance.emit("leave-rooms");
      socketInstance.off("message", onMessage);
      socketInstance.off("user-action", onAction);
      socketInstance.off("new-participant", onNewParticipant);
      socketInstance.on("reconnect_attempt", onReconnectAttempt);
    };
  }, [name, params.chatId, socketInstance]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [userAction]);

  return (
    <div className="flex flex-col w-full h-screen bg-stone-100">
      <div className="flex flex-col h-full w-full justify-between">
        <div className="flex flex-col overflow-auto p-2 gap-1 flex-grow">
          {messages.map((message, index) => (
            <Message
              key={index}
              date={message.date}
              id={message.id}
              message={message.message}
              room={message.room}
              sender={message.sender}
              type={message.type}
              isOwner={message?.isOwner}
            />
          ))}
          <div ref={messagesEndRef} />
          {userAction && userAction?.name && (
            <UserAction name={userAction?.name} type={userAction?.type} />
          )}
        </div>

        <ChatTools
          chatId={params.chatId}
          name={name}
          setMessages={setMessages}
          socketInstance={socketInstance}
        />
      </div>
      <ImagePreview />
    </div>
  );
}
