import { AudioPlayerProps } from "@/interfaces";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export default function AudioPlayer({ audioUrl, isOwner }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeSpeed = () => {
    switch (playbackRate) {
      case 1:
        setPlaybackRate(1.5);
        break;

      case 1.5:
        setPlaybackRate(2);
        break;

      case 2:
        setPlaybackRate(1);
        break;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="flex items-center space-x-4">
      <Button
        onClick={togglePlayPause}
        type="button"
        variant={"link"}
        className={`rounded-full w-10 h-10 flex items-center justify-center ${
          isOwner ? "text-white" : "text-stone-800"
        }`}
      >
        <span>{isPlaying ? <Pause size={16} /> : <Play size={16} />}</span>
      </Button>
      <button
        onClick={changeSpeed}
        className={`rounded-full w-6 h-6 flex items-center justify-centeroutline-none`}
      >
        <span
          className={` ${isOwner ? "text-white" : "text-stone-800"} text-sm`}
        >
          {playbackRate}x
        </span>
      </button>
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
