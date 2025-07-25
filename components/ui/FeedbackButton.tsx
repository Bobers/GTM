'use client';

import { MessageSquare } from 'lucide-react';

export default function FeedbackButton() {
  const handleFeedbackClick = () => {
    // Replace with your actual Tally form URL
    const tallyFormUrl = 'https://tally.so/r/YOUR_FORM_ID';
    window.open(tallyFormUrl, '_blank', 'width=600,height=700');
  };

  return (
    <button
      onClick={handleFeedbackClick}
      className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg 
        shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105
        flex items-center gap-2 group"
      aria-label="Send feedback"
    >
      <MessageSquare className="w-4 h-4" />
      <span className="hidden group-hover:inline-block">Feedback</span>
    </button>
  );
}