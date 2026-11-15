import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Happy Birthday Rabbit! 💖",
  "November 15 is your day to shine! ✨",
  "Wishing you endless laughs and sweet cake! 🎂",
  "You make the whole world so much brighter! 🌟",
  "Have the most wonderful celebration ever! 🎉"
];

export default function TypewriterText() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = MESSAGES[currentIdx];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIdx]);

  return (
    <div className="min-h-[44px] flex items-center justify-center text-center font-display text-xl sm:text-2xl text-[#C4515C] font-semibold tracking-wide px-4">
      <span>{displayText}</span>
      <span className="w-0.5 h-6 bg-[#C4515C] ml-1 animate-pulse inline-block" />
    </div>
  );
}
