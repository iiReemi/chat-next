import { VoiceRecorderInterface } from "@/interfaces";
import { uploadAudio } from "@/services/uploadAudio";
import { CheckCheck, Mic } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "./ui/button";

export default function VoiceRecorder({
  isRecording,
  setIsRecording,
  sendAudio,
  cancel,
  chatId,
}: VoiceRecorderInterface) {
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  let isSaving = useRef(false);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaStream.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        if (isSaving.current && chunks.current.length > 0) {
          const blob = new Blob(chunks.current, { type: "audio/webm" });
          try {
            const downloadURL = await uploadAudio(blob, uuid(), chatId);
            sendAudio(downloadURL);
          } catch (error) {
            alert("Erro ao fazer upload do áudio.");
          }
        }
        chunks.current = [];
        isSaving.current = false;
      };

      recorder.start();
      setIsRecording(true);
      isSaving.current = false;
    } catch (error) {
      alert("Erro ao acessar microfone.");
    }
  }

  const stopRecording = useCallback(
    (save: boolean) => {
      isSaving.current = save;
      mediaRecorder.current?.stop();
      mediaStream.current?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    },
    [setIsRecording]
  );

  useEffect(() => {
    stopRecording(false);
  }, [cancel, stopRecording]);

  return (
    <>
      {!isRecording && (
        <Button
          onClick={startRecording}
          type="button"
          variant={"link"}
          className="rounded-full w-10 h-10 flex items-center justify-center text-white"
        >
          <span>
            <Mic size={18} />
          </span>
        </Button>
      )}
      {isRecording && (
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => stopRecording(true)}
            type="button"
            variant={"link"}
            className="rounded-full w-10 h-10 flex items-center justify-center text-white bg-green-700"
          >
            <span>
              <CheckCheck size={18} />
            </span>
          </Button>
        </div>
      )}
    </>
  );
}
