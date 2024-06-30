import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export default function StopRecording({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant={"link"}
      className="rounded-full w-10 h-10 flex items-center justify-center text-white bg-red-600"
    >
      <span>
        <Trash size={18} />
      </span>
    </Button>
  );
}
