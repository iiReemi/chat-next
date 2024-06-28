"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [room, setRoom] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Limpeza ao desmontar o componente para evitar event listeners duplicados
    return () => {
      socket.off('leave-rooms');
      socket.off('join');
    };
  }, []);

  function enterRoom() {
    if (room !== "") {
      socket.emit('leave-rooms');
      socket.emit('join', room);
      router.push(`/chat/${room}`);
    } else {
      alert("Você precisa informar a sala para entrar!!");
    }
  }

  return (
    <div className="bg-zinc-200 h-screen flex justify-center items-center">
      {/* BOX */}
      <div className="flex flex-col items-center border-zinc-300 border-4 rounded-md p-12 gap-4">
        <Label className="font-bold">Informe a sala:</Label>
        <Input
          className="border-zinc-300"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <Button className="w-full" onClick={enterRoom}>
          Entrar
        </Button>
      </div>
    </div>
  );
}
