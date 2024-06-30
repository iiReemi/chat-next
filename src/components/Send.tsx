import { SendInterface } from "@/interfaces";
import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";

export default function Send({ sendMessage }: SendInterface) {
  return (
    <Button
      onClick={sendMessage}
      type="submit"
      variant={"link"}
      className="rounded-full w-10 h-10 flex items-center justify-center text-white bg-stone-600"
    >
      <span>
        <SendHorizontal size={18} />
      </span>
    </Button>
  );
}
