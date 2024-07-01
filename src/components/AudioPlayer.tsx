import { AudioPlayerProps } from "@/interfaces";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export default function AudioPlayer({ audioUrl, isOwner }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const ffmpeg = useRef<FFmpeg>(new FFmpeg());

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpegLoaded) {
        await ffmpeg.current.load();
        setFfmpegLoaded(true);
      }
    };

    loadFFmpeg();
  }, [ffmpegLoaded]);

  useEffect(() => {
    const fetchAndConvertAudio = async () => {
      if (!ffmpegLoaded) return;

      try {
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Write the file to FFmpeg's filesystem
        await ffmpeg.current.writeFile("input", uint8Array);

        // Run the FFmpeg command to convert the file to MP3
        await ffmpeg.current.exec(["-i", "input", "output.mp3"]);

        // Read the result
        const data = await ffmpeg.current.readFile("output.mp3");

        // Create a Blob from the output
        const mp3Blob = new Blob([data], { type: "audio/mpeg" });
        // Create a URL for the Blob
        const url = URL.createObjectURL(mp3Blob);
        setBlobUrl(url);
      } catch (error) {
        console.log("Error fetching or converting audio:", error);
      }
    };

    fetchAndConvertAudio();

    // Cleanup URL when component unmounts
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [audioUrl, ffmpegLoaded]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
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

  const handleError = (e: any) => {
    console.error("Audio error:", e);
  };

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
        className={`rounded-full w-6 h-6 flex items-center justify-center outline-none`}
      >
        <span
          className={` ${isOwner ? "text-white" : "text-stone-800"} text-sm`}
        >
          {playbackRate}x
        </span>
      </button>
      <audio
        ref={audioRef}
        src={blobUrl}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={handleError}
      />
    </div>
  );
}
