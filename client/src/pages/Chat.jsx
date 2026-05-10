import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useChatStore from '../store/chatStore';

// ── Severity / urgency colour helpers ─────────────────────
const severityConfig = {
  mild:     { label: 'MILD',     color: 'text-green-400',  border: 'border-green-800',  bg: 'bg-green-950/50' },
  moderate: { label: 'MODERATE', color: 'text-yellow-400', border: 'border-yellow-800', bg: 'bg-yellow-950/50' },
  severe:   { label: 'SEVERE',   color: 'text-red-400',    border: 'border-red-900',    bg: 'bg-red-950/50'   },
};

const urgencyConfig = {
  routine:   { label: 'ROUTINE CHECK',    color: 'text-green-400'  },
  soon:      { label: 'SEE DOCTOR SOON',  color: 'text-yellow-400' },
  urgent:    { label: 'URGENT CARE',      color: 'text-orange-400' },
  emergency: { label: '🚨 GO TO ER NOW', color: 'text-red-400'    },
};

// ── Typing indicator ──────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent"
          style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

// ── Single message bubble ─────────────────────────────────
function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full border border-accent bg-accent-glow flex items-center justify-center shrink-0 mb-0.5">
          <span className="text-accent text-xs font-mono font-bold">AI</span>
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed font-body font-light
          ${isUser
            ? 'bg-surface2 border border-[#2A2A2A] text-ink rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl'
            : 'border border-[#1A1A1A] bg-[#0A0A0A] text-ink-muted rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
          }`}
      >
        {content}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full border border-[#2A2A2A] bg-surface2 flex items-center justify-center shrink-0 mb-0.5">
          <span className="text-ink-muted text-xs font-mono">YOU</span>
        </div>
      )}
    </div>
  );
}

// ── Diagnosis result card ─────────────────────────────────
function DiagnosisCard({ diagnosis, onReset }) {
  const [expanded, setExpanded] = useState(true);
  const sev = severityConfig[diagnosis.severity] || severityConfig.moderate;
  const urg = urgencyConfig[diagnosis.consultDoctorUrgency] || urgencyConfig.routine;

  return (
    <div className="border-t-2 border-t-accent border-l border-r border-b border-[#222222] bg-surface mt-2 animate-slide-up">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] hover:bg-surface2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="section-label mb-0">/ DIAGNOSIS COMPLETE</span>
          <span className={`badge ${sev.bg} ${sev.border} ${sev.color}`}>{sev.label}</span>
        </div>
        <span className="text-ink-faint font-mono text-xs">{expanded ? '▲ COLLAPSE' : '▼ EXPAND'}</span>
      </button>

      {expanded && (
        <div>
          {/* Summary block */}
          <div className="px-6 py-5 border-b border-[#1A1A1A]">
            <p className="font-body font-light text-sm text-ink-muted leading-relaxed italic">
              "{diagnosis.summary}"
            </p>
          </div>

          {/* Main result */}
          <div className="grid grid-cols-2 border-b border-[#1A1A1A]">
            <div className="px-6 py-5 border-r border-[#1A1A1A]">
              <span className="section-label">/ LIKELY CONDITION</span>
              <h3 className="font-display text-2xl uppercase text-ink leading-none">
                {diagnosis.result}
              </h3>
            </div>
            <div className="px-6 py-5">
              <span className="section-label">/ CONFIDENCE</span>
              <div className="flex items-end gap-2">
                <span className="font-mono text-4xl text-accent leading-none">{diagnosis.confidence}%</span>
              </div>
              <div className="h-px bg-[#1A1A1A] mt-2">
                <div
                  className="h-px bg-accent transition-all duration-1000"
                  style={{ width: `${diagnosis.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 py-5 border-b border-[#1A1A1A]">
            <span className="section-label">/ CLINICAL OVERVIEW</span>
            <p className="font-body font-light text-sm text-ink-muted leading-relaxed">
              {diagnosis.description}
            </p>
          </div>

          {/* Recommendations */}
          <div className="px-6 py-5 border-b border-[#1A1A1A]">
            <span className="section-label">/ RECOMMENDED ACTIONS</span>
            <div className="flex flex-col gap-0">
              {diagnosis.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 py-3 border-b border-[#0F0F0F] last:border-0">
                  <span className="font-mono text-xs text-ink-faint w-5 shrink-0 pt-0.5">0{i + 1}</span>
                  <p className="font-body font-light text-sm text-ink-muted">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency + Actions */}
          <div className="px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className={`font-mono text-xs font-bold ${urg.color}`}>{urg.label}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={onReset} className="btn-secondary text-xs py-2 px-6">
                ← NEW CONSULTATION
              </button>
              <Link to="/ngos" className="btn-primary text-xs py-2 px-6">
                FIND HEALTHCARE →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Welcome screen ────────────────────────────────────────
const EXAMPLE_PROMPTS = [
  'I have a cough for 3 days with mild fever',
  'Severe headache and sensitivity to light',
  'I feel very tired and thirsty all the time',
  'My chest feels tight and I have trouble breathing',
];

function WelcomeScreen({ onPrompt }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-full border border-accent bg-accent-glow flex items-center justify-center mb-6">
        <span className="text-accent text-2xl font-display">AI</span>
      </div>
      <span className="section-label">/ COMCARE CLINICAL AI</span>
      <h2 className="font-display text-3xl uppercase text-ink mb-3 leading-none">
        TELL ME YOUR SYMPTOMS
      </h2>
      <p className="font-body font-light text-sm text-ink-muted max-w-sm mb-10">
        Describe how you're feeling in plain language. I'll ask a few questions, then give you a detailed health assessment.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {EXAMPLE_PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => onPrompt(p)}
            className="text-left px-4 py-3 border border-[#222222] bg-surface2 hover:border-accent hover:bg-accent-glow text-ink-muted hover:text-ink font-body text-xs leading-relaxed transition-all duration-200 rounded-none"
          >
            <span className="text-accent font-mono mr-2">→</span>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Chat Page ────────────────────────────────────────
export default function Chat() {
  const { messages, isLoading, isComplete, diagnosis, error, startChat, sendMessage, resetChat, clearError } = useChatStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const hasStarted = messages.length > 0;

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading || isComplete) return;
    setInput('');

    if (!hasStarted) {
      await startChat(text);
    } else {
      await sendMessage(text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePrompt = (text) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-0 flex flex-col" style={{ height: '100dvh' }}>

      {/* ── Header ── */}
      <div className="py-6 border-b border-[#1A1A1A] flex items-center justify-between shrink-0">
        <div>
          <span className="section-label mb-1">/ AI CLINICAL CONSULTATION</span>
          <h1 className="font-display text-2xl uppercase text-ink leading-none">DR. AI</h1>
        </div>
        <div className="flex items-center gap-3">
          {hasStarted && !isComplete && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-ink-faint">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              ACTIVE SESSION
            </span>
          )}
          {isComplete && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              COMPLETE
            </span>
          )}
          {hasStarted && (
            <button onClick={resetChat} className="btn-ghost text-xs">
              RESET
            </button>
          )}
        </div>
      </div>

      {/* ── Message Area ── */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col min-h-0">
        {!hasStarted ? (
          <WelcomeScreen onPrompt={handlePrompt} />
        ) : (
          <div className="flex flex-col gap-4 px-1">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-end gap-3">
                <div className="w-8 h-8 rounded-full border border-accent bg-accent-glow flex items-center justify-center shrink-0">
                  <span className="text-accent text-xs font-mono font-bold">AI</span>
                </div>
                <div className="border border-[#1A1A1A] bg-[#0A0A0A] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Diagnosis Card ── */}
      {isComplete && diagnosis && (
        <div className="shrink-0">
          <DiagnosisCard diagnosis={diagnosis} onReset={resetChat} />
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="shrink-0 mx-1 mb-2 px-4 py-3 border border-red-900 bg-red-950/30 flex items-center justify-between gap-3">
          <p className="font-body text-xs text-red-400">{error}</p>
          <button onClick={clearError} className="text-red-400 hover:text-red-300 text-xs font-mono">
            DISMISS
          </button>
        </div>
      )}

      {/* ── Input Bar ── */}
      {!isComplete && (
        <div className="shrink-0 border-t border-[#1A1A1A] py-4 flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={
              !hasStarted
                ? 'Describe your symptoms in plain language...'
                : 'Type your response...'
            }
            rows={1}
            style={{ resize: 'none', minHeight: '44px', maxHeight: '120px', overflowY: 'auto', height: 'auto' }}
            className="flex-1 bg-surface2 border border-[#2A2A2A] focus:border-accent text-ink placeholder-ink-faint font-body text-sm px-4 py-3 outline-none transition-colors duration-200 leading-relaxed"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn-primary px-6 py-3 shrink-0 self-end"
          >
            {isLoading ? (
              <span className="font-mono text-xs animate-pulse">THINKING</span>
            ) : (
              <span className="font-mono text-xs">SEND →</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
