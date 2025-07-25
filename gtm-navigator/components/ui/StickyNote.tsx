'use client';

interface StickyNoteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function StickyNote({ value, onChange, placeholder, className = '' }: StickyNoteProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        bg-yellow-200 border-2 border-yellow-300 rounded-md p-3
        text-gray-800 resize-none h-24 w-full
        focus:outline-none focus:border-yellow-400
        hover:shadow-md transition-shadow
        ${className}
      `}
    />
  );
}