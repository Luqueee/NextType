"use client";

import { validateInput } from "@/utils/validateWord";
import { useEffect, useRef } from "react";

const useSongsKeyboard = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize the AudioContext and connect the audio element
    if (!audioContextRef.current && audioRef.current) {
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(audioContext.destination);
      audioContextRef.current = audioContext;
    }
    const resumeAudioContext = () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener("click", resumeAudioContext);
    window.addEventListener("keydown", resumeAudioContext);

    return () => {
      window.removeEventListener("click", resumeAudioContext);
      window.removeEventListener("keydown", resumeAudioContext);
    };
  }, []);

  const playKeySound = (key: string) => {
    //console.log(key, audioRef.current);
    const pitch = calculatePitch(key);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = pitch;
      audioRef.current.play();
    }
  };

  const calculatePitch = (key: string): number => {
    // Cambia ligeramente el pitch según la tecla
    const charCode = key.charCodeAt(0);
    return 1 + (charCode % 10) * 0.02; // Genera valores entre 1 y 1.5
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (validateInput(event.key)) playKeySound(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    audioRef,
  };
};

export default useSongsKeyboard;
