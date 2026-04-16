import React, { useState, useRef, useEffect } from 'react';
import { SYSTEM_PROMPT } from '../ragKnowledge';
import { useSettings } from '../SettingsContext';

const SUGGESTED_QUESTIONS = [
  "What's his visa/work status?",
  "Tell me about his education",
  "What certifications does he hold?",
  "Show me his top projects",
  "What cloud platforms?",
  "How to contact him?",
];

/* ── Typing animation ── */
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0', height: 18 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#0078d4',
          animation: `chatDot 1.3s ease-in-out ${i * 0.16}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Single message bubble ── */
function Message({ msg }) {
  const isUser = msg.role === 'user';

  const parseContent = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm,
        '<div style="display:flex;gap:6px;margin:2px 0;align-items:flex-start">' +
        '<span style="color:#0078d4;flex-shrink:0;margin-top:2px;font-size:11px">▸</span>' +
        '<span>$1</span></div>')
      .replace(/^(\d+)\. (.+)$/gm,
        '<div style="display:flex;gap:6px;margin:2px 0;align-items:flex-start">' +
        '<span style="color:#0078d4;flex-shrink:0;min-width:16px;font-size:11px">$1.</span>' +
        '<span>$2</span></div>');

  return (
    <div style={{
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      gap: 8, marginBottom: 12, alignItems: 'flex-end',
      animation: 'msgIn 0.18s ease forwards',
    }}>
      {/* Avatar */}
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
        background: isUser ? '#0078d4' : '#f0f6ff',
        border: isUser ? 'none' : '1.5px solid #c7e0f4',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isUser ? 9 : 13, fontWeight: 700,
        color: isUser ? '#fff' : '#0078d4',
      }}>
        {isUser ? 'You' : '⚡'}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: '76%',
        background: isUser ? '#0078d4' : '#fff',
        color: isUser ? '#fff' : '#1f2937',
        border: isUser ? 'none' : '1px solid #e5e7eb',
        borderRadius: isUser ? '14px 3px 14px 14px' : '3px 14px 14px 14px',
        padding: '9px 13px',
        fontSize: 12.5,
        lineHeight: 1.65,
        boxShadow: isUser ? '0 2px 8px rgba(0,120,212,0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        {msg.typing
          ? <TypingDots />
          : <div style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: parseContent(msg.content) }} />
        }
        {msg.error && (
          <div style={{ color: '#ef4444', fontSize: 10.5, marginTop: 5, display: 'flex', gap: 3, alignItems: 'center' }}>
            ⚠ {msg.error}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Chatbot ── */
export default function Chatbot() {
  const { aiModel, showSuggestions } = useSettings();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hi! I'm Maneeshwar's AI assistant 👋\n\nAsk me anything about his skills, projects, education, or work authorization!",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = process.env.REACT_APP_CLAUDE_API_KEY || '';

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    if (!API_KEY) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ API key not configured. Add `REACT_APP_CLAUDE_API_KEY` in `.env` and restart.',
      }]);
      return;
    }
    setInput('');
    const history = [...messages, { role: 'user', content: userText }];
    setMessages(history);
    setLoading(true);
    setMessages(prev => [...prev, { role: 'assistant', content: '', typing: true }]);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: aiModel || 'claude-opus-4-5',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || `HTTP ${res.status}`); }
      const data = await res.json();
      const reply = data.content[0]?.text || 'No response.';
      setMessages(prev => [...prev.filter(m => !m.typing), { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev.filter(m => !m.typing), {
        role: 'assistant', content: 'Sorry, something went wrong.', error: err.message,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const canSend = !loading && !!input.trim() && !!API_KEY;

  return (
    <>
      <style>{`
        @keyframes chatDot { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-5px);opacity:1} }
        @keyframes msgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes windowIn { from{opacity:0;transform:translateY(14px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fabPop { 0%{transform:scale(1)} 40%{transform:scale(1.12)} 100%{transform:scale(1)} }
        .chat-fab { transition: box-shadow 0.2s, transform 0.2s !important; }
        .chat-fab:hover { transform: scale(1.07) !important; box-shadow: 0 8px 24px rgba(0,120,212,0.5) !important; }
        .chat-send:hover:not(:disabled) { background: #005fa3 !important; }
        .chat-send { transition: background 0.15s, transform 0.15s !important; }
        .chat-send:hover:not(:disabled) { transform: scale(1.05) !important; }
        .chat-chip:hover { background: #dbeafe !important; border-color: #93c5fd !important; color: #1d4ed8 !important; transform: translateY(-1px); }
        .chat-chip { transition: all 0.14s !important; }
        .chat-msgs::-webkit-scrollbar { width: 3px; }
        .chat-msgs::-webkit-scrollbar-track { background: transparent; }
        .chat-msgs::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
      `}</style>

      {/* ── FAB ── */}
      <div
        className="chat-fab"
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#005a9e' : '#0078d4',
          boxShadow: '0 4px 16px rgba(0,120,212,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{
          fontSize: open ? 26 : 22, color: '#fff', lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.25s, font-size 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {open ? '×' : '💬'}
        </span>
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 86, right: 24, zIndex: 999,
          width: 348, height: 520,
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #e5e7eb',
          boxShadow: '0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'windowIn 0.22s cubic-bezier(0.34,1.4,0.64,1) forwards',
        }}>

          {/* ── Header ── */}
          <div style={{
            background: 'linear-gradient(135deg, #0078d4 0%, #006cbf 100%)',
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            flexShrink: 0,
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                border: '1.5px solid rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
              }}>⚡</div>
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 9, height: 9, borderRadius: '50%',
                background: loading ? '#fbbf24' : '#22c55e',
                border: '2px solid #0078d4',
              }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 0.1 }}>
                Portfolio AI Assistant
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10.5, marginTop: 1 }}>
                {loading ? '● Thinking...' : '● Online · Powered by Claude'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {!API_KEY && (
                <span style={{
                  fontSize: 9, background: 'rgba(251,191,36,0.25)', color: '#fef08a',
                  border: '1px solid rgba(251,191,36,0.35)', borderRadius: 3, padding: '2px 6px', fontWeight: 700,
                }}>NO KEY</span>
              )}
              <button
                onClick={() => setMessages([{ role: 'assistant', content: "Hi! I'm Maneeshwar's AI assistant 👋\n\nAsk me anything about his skills, projects, education, or work authorization!" }])}
                title="Clear chat"
                style={{
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 5, padding: '3px 8px', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.85)', fontSize: 10.5, fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              >↺ Clear</button>
            </div>
          </div>

          {/* ── API Key Warning ── */}
          {!API_KEY && (
            <div style={{
              background: '#fffbeb', borderBottom: '1px solid #fde68a',
              padding: '8px 14px', flexShrink: 0,
            }}>
              <div style={{ fontSize: 11, color: '#92400e', fontWeight: 600, marginBottom: 2 }}>⚠ API Key Required</div>
              <div style={{ fontSize: 10.5, color: '#78350f' }}>
                Set <code style={{ background: '#fef3c7', padding: '1px 4px', borderRadius: 3, fontSize: 10 }}>REACT_APP_CLAUDE_API_KEY</code> in <code style={{ background: '#fef3c7', padding: '1px 4px', borderRadius: 3, fontSize: 10 }}>.env</code> and restart.
              </div>
            </div>
          )}

          {/* ── Messages ── */}
          <div className="chat-msgs" style={{
            flex: 1, overflowY: 'auto',
            padding: '14px 13px 8px',
            background: '#f9fafb',
          }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick suggestions ── */}
          {showSuggestions && messages.length <= 1 && (
            <div style={{
              padding: '7px 12px 6px',
              borderTop: '1px solid #f3f4f6',
              background: '#fff',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: 9.5, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                Try asking
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    className="chat-chip"
                    onClick={() => send(q)}
                    style={{
                      fontSize: 10.5, color: '#2563eb',
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: 20, padding: '3px 9px',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >{q}</button>
                ))}
              </div>
            </div>
          )}

          {/* ── Input bar ── */}
          <div style={{
            padding: '9px 11px 10px',
            borderTop: '1px solid #e5e7eb',
            background: '#fff',
            display: 'flex', gap: 7, alignItems: 'flex-end',
            flexShrink: 0,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={API_KEY ? 'Ask about skills, education, visa...' : 'API key not set'}
              disabled={loading || !API_KEY}
              rows={1}
              style={{
                flex: 1, padding: '8px 11px',
                fontSize: 12.5, lineHeight: 1.5,
                border: '1.5px solid #e5e7eb', borderRadius: 10,
                outline: 'none', resize: 'none',
                fontFamily: 'inherit', maxHeight: 72, overflowY: 'auto',
                color: '#111827',
                background: loading ? '#f9fafb' : '#fff',
                transition: 'border 0.15s',
              }}
              onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 72) + 'px'; }}
              onFocus={e => e.target.style.borderColor = '#0078d4'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              className="chat-send"
              onClick={() => send()}
              disabled={!canSend}
              style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: canSend ? '#0078d4' : '#e5e7eb',
                border: 'none',
                cursor: canSend ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15,
                boxShadow: canSend ? '0 2px 8px rgba(0,120,212,0.3)' : 'none',
              }}
            >
              <span style={{ color: canSend ? '#fff' : '#9ca3af', lineHeight: 1 }}>↑</span>
            </button>
          </div>

          {/* ── Branding strip ── */}
          <div style={{
            padding: '4px 12px 6px',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            borderTop: '1px solid #f3f4f6', flexShrink: 0,
          }}>
            <span style={{ fontSize: 9.5, color: '#d1d5db' }}>Powered by</span>
            <span style={{ fontSize: 9.5, color: '#9ca3af', fontWeight: 600 }}>Claude AI</span>
          </div>
        </div>
      )}
    </>
  );
}
