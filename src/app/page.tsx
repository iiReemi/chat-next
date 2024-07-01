"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSocket from "@/hooks/useSocket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const { socketInstance } = useSocket();
  const router = useRouter();

  useEffect(() => {
    return () => {
      socketInstance.off("leave-rooms");
      socketInstance.off("join");
    };
  }, [socketInstance]);

  function enterRoom(e: React.FormEvent) {
    e.preventDefault();
    if (room !== "" && username.trim() !== "") {
      socketInstance.emit("leave-rooms");
      socketInstance.emit("join");
      socketInstance.emit("new-participant", {
        room: room,
        name: username,
      });
      router.push(`/chat/${room}?name=${encodeURIComponent(username)}`);
    } else {
      alert("Você precisa informar a sala e o nome para entrar!!");
    }
  }

  return (
    <div className="bg-zinc-100 min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      <form
        className="flex flex-col items-center border-zinc-300 border-2 rounded-md p-12 gap-4 bg-zinc-100"
        onSubmit={enterRoom}
      >
        <Label className="font-bold">Informe a sala:</Label>
        <Input
          className="border-zinc-300 text-lg"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <Label className="font-bold">Como podemos te chamar?</Label>
        <Input
          className="border-zinc-300 text-lg"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}
