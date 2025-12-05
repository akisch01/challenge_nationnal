"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
}

export function Typewriter({ text, speed = 10 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <p>{displayedText}</p>;
}
