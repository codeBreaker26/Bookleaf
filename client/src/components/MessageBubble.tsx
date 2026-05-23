interface MessageBubbleProps {
  sender: 'admin' | 'author';
  content: string;
  timestamp: string;
  senderName: string;
}

export function MessageBubble({ sender, content, timestamp, senderName }: MessageBubbleProps) {
  const isAdmin = sender === 'admin';

  return (
    <div className={`flex gap-3 ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${isAdmin ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
        {senderName.charAt(0).toUpperCase()}
      </div>
      <div className={`flex flex-col gap-1 ${isAdmin ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-300">{senderName}</p>
          <p className="text-xs text-slate-500">{timestamp}</p>
        </div>
        <div
          className={`rounded-2xl px-4 py-3 max-w-xs text-sm leading-relaxed ${
            isAdmin
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
              : 'border border-slate-700 bg-slate-800 text-slate-100'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
