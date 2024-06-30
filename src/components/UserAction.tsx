"use client";

import { useEffect, useState } from "react";
import { Label } from "./ui/label";

export default function UserAction({
  name,
  type,
}: {
  name: string;
  type: string;
}) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    switch (type) {
      case "text":
        setText("digitando...");
        break;
      case "audio":
        setText("gravando áudio...");
        break;
      default:
        setText("");
    }
  }, [type]);

  return (
    <Label className="italic text-stone-400 text-sm text-center">
      {name} está {text}
    </Label>
  );
}
