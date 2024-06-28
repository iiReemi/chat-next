"use client";

import { socket } from "../../../socket.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Camera,
  Mic,
  MicVocal,
  Plus,
  Send,
  SendHorizontal,
  User,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

moment.locale();

type ParamsType = {
  params: {
    chatId: string;
  };
};

type Messages = {
  message: string;
  sender: string;
  date: string;
  isMy?: boolean;
};

export default function Page({ params }: ParamsType) {
  const [username, setUsername] = useState("anônimo");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();

    if (text.trim() !== "") {
      socket.emit("message", {
        message: text,
        sender: username,
        date: moment().format("LT"),
        room: params.chatId,
      });
      setText("");
    }
  }

  function handleAudio() {}

  useEffect(() => {
    function onMessage(newMessage: {
      message: string;
      sender: string;
      date: string;
    }) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...newMessage,
          isMy: newMessage.sender === username,
        },
      ]);
    }

    socket.emit("join", params.chatId);
    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
      socket.emit("leave-rooms");
    };
  }, [params.chatId, username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8 h-screen overflow-hidden">
      <div className="shadow-2xl rounded-xl w-full max-w-4xl flex flex-col h-full">
        <div className="bg-stone-800 flex flex-row gap-2 items-center justify-around p-4 rounded-t-lg">
          <div className="flex flex-row gap-2">
            <User color="white" size={32} />
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border-none bg-stone-600 rounded-2xl text-white w-3/4"
              placeholder="Digite seu nome"
            />
          </div>
          <Label className="text-white">{params.chatId}</Label>
        </div>

        <div className="bg-stone-50 p-4 flex flex-col gap-2 justify-between rounded-b-lg h-full overflow-hidden">
          <div className="flex flex-col gap-2 overflow-auto h-full mb-2">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex justify-${item.isMy ? "end" : "start"}`}
              >
                <div
                  className={`flex flex-col p-2 items-start justify-start rounded-xl w-fit gap-1 max-w-2xl shadow-md
                    ${
                      item.isMy
                        ? "bg-stone-800 text-white rounded-br-none"
                        : "bg-white rounded-bl-none"
                    }
                  `}
                >
                  <Label className="text-xs">{item.message}</Label>
                  <Label className="text-xs italic text-stone-400">
                    {item.sender} - {item.date}
                  </Label>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 bg-stone-800 rounded-b-lg h-14 px-6"
        >
          <Button
            type="button"
            variant={"ghost"}
            className="rounded-full w-10 h-10 flex items-center justify-center text-white"
          >
            <span>
              <Plus size={18} />
            </span>
          </Button>
          <Input
            className="flex-grow border-none bg-stone-600 rounded-2xl text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="button"
            variant={"ghost"}
            className="rounded-full w-10 h-10 flex items-center justify-center text-white"
          >
            <span>
              <Camera size={18} />
            </span>
          </Button>
          <Button
            onClick={text === "" ? handleAudio : sendMessage}
            type="button"
            variant={"ghost"}
            className="rounded-full w-10 h-10 flex items-center justify-center text-white"
          >
            <span>
              {text === "" ? <Mic size={18} /> : <SendHorizontal size={18} />}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
